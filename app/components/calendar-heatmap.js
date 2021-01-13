import Component from "@glimmer/component";
import { action } from "@ember/object";

import d3 from "d3";

export default class CalendarHeatmapComponent extends Component {
  @action
  generateYear(element) {
    const maxWeeks = 53; // to get either tail ends
    const margin = 1;
    const squareSize = 12;

    const years = d3.group(this.args.data, (d) =>
      new Date(d.dates).getUTCFullYear()
    );
    const width = Math.ceil(maxWeeks * squareSize + 48); //TODO: get rid of the manual adjustment
    const yearHeight = Math.ceil(7 * squareSize + margin);
    const containerHeight = Math.ceil(yearHeight * years.size + 40);

    const timeWeek = d3.utcSunday;
    const countDay = (d) => d.getUTCDay();
    const formatDay = (d) => {
      console.log(d);
      return ["", "Mon", "", "We", "", "Fri", ""][d];
    };

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", width + margin * 2)
      .attr("height", containerHeight + margin * 2)
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);
    const heatColor = d3
      .scaleLinear()
      .range(["white", "red"])
      .domain([2000, 3000]);

    const group = svg.append("g");

    const year = group
      .selectAll("g")
      .data(years)
      .join("g")
      .attr(
        "transform",
        (d, i) => `translate(50, ${yearHeight * i + i * squareSize * 1.5})`
      );

    year
      .append("text")
      .attr("x", -Math.ceil(yearHeight / 4))
      .attr("y", -35)
      .attr("text-anchor", "end")
      .attr("font-size", 16)
      .attr("font-weight", 550)
      .attr("transform", "rotate(270)")
      .text((d) => d[0]);

    year
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(d3.range(7))
      .join("text")
      .attr("x", -5)
      .attr("y", (d) => (d + 0.5) * squareSize)
      .attr("dy", "0.31em")
      .attr("font-size", 12)
      .text(formatDay);

    year
      .append("g")
      .selectAll("rect")
      .data((d) => d[1])
      .join("rect")
      .attr("width", squareSize - 2)
      .attr("height", squareSize - 2)
      .attr(
        "x",
        (d) =>
          timeWeek.count(d3.utcYear(new Date(d.dates)), new Date(d.dates)) *
          squareSize
      )
      .attr("y", (d) => countDay(new Date(d.dates)) * squareSize + 0.5)
      .attr("fill", (d) => heatColor(d.calories_active + d.calories_passive))
      .append("title")
      .text(
        (d) =>
          `${d.dates}: ${(d.calories_active + d.calories_passive).toFixed(
            2
          )} calories`
      );
  }
}
