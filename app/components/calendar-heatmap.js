import Component from "@glimmer/component";
import { action } from "@ember/object";

import d3 from "d3";

export default class CalendarHeatmapComponent extends Component {
  @action
  generateYear(element) {
    const maxWeeks = 53; // to get either tail ends
    const margin = 1;
    const squareSize = 12;
    const width = Math.ceil(maxWeeks * squareSize);
    const height = Math.ceil(7 * squareSize + margin);

    const timeWeek = d3.utcSunday;
    const countDay = (d) => d.getUTCDay();

    //TODO: Add labels for weekday and year

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", width + margin * 2)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);
    const heatColor = d3
      .scaleLinear()
      .range(["white", "red"])
      .domain([2000, 3000]);

    svg
      .append("g")
      .selectAll("rect")
      .data(this.args.data, (d) => d.calories_passive + d.calories_active)
      .join("rect")
      .attr("width", squareSize - 2)
      .attr("height", squareSize - 2)
      .attr(
        "x",
        (d) =>
          timeWeek.count(d3.utcYear(new Date(d.dates)), new Date(d.dates)) *
            squareSize +
          10
      )
      .attr("y", (d) => countDay(new Date(d.dates)) * squareSize + 0.5)
      .attr("fill", (d) => heatColor(d.calories_active + d.calories_passive))
      .append("title")
      .text(
        (d) =>
          `${d.dates}: ${(d.calories_active + d.calories_passive).toFixed(2)}`
      );
  }
}
