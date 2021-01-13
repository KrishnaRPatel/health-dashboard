import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { shapeData } from "health-dashboard/utils/chart";
import { dateToISO } from "../utils/chart";

const MIN_DATE = {
  date: new Date("2020-01-01"),
  iso: "2020-01-01",
};

export default class EnergyGraphComponent extends Component {
  @tracked startDate = this.maxDate;
  @tracked days = 7;

  get draw() {
    return (data) => {
      if (data.type === "bar") {
        //bottom bar
        if (data.seriesIndex === 0) {
          data.element.animate({
            y2: {
              dur: 500,
              from: data.y1,
              to: data.y2,
            },
          });
        }

        //top bar
        if (data.seriesIndex === 1) {
          data.element.animate({
            y2: {
              begin: 500,
              dur: 500,
              from: data.y1,
              to: data.y2,
              easing: "easeOutQuart",
            },
          });
        }
      }
    };
  }

  get maxDate() {
    return this.args.data.dates[this.args.data.dates.length - 1];
  }

  get maxEnergy() {
    const totalEnergy = this.args.data["calories_active"].map(
      (datum, i) => datum + this.args.data["calories_passive"][i]
    );

    const maxTotal = Math.max(...totalEnergy);
    return [
      Math.ceil(Math.max(...totalEnergy) / 50) * 250,
      this.args.data.dates[totalEnergy.indexOf(maxTotal)],
    ];
  }

  get chartData() {
    return shapeData(
      this.args.data,
      "dates",
      ["calories_passive", "calories_active"],
      this.days,
      this.startDate
    );
  }

  get chartType() {
    if (this.args.type === "Week") {
      return "Daily Calories Burned";
    }
    return this.args.type;
  }

  chartOptions = {
    stackBars: true,
    low: 1200,
  };

  chartResOptions = [
    [
      "screen and (max-width: 376px)",
      {
        axisX: {
          labelInterpolationFnc: (val) => {
            return val.slice(3);
          },
          //showLabel: false,
        },
      },
    ],
  ];

  @action
  validateDate() {
    const date = new Date(this.startDate);

    if (date < MIN_DATE.date) {
      this.startDate = MIN_DATE.iso;
    }

    if (date > new Date(this.maxDate)) {
      this.startDate = this.maxDate;
    }
  }

  @action
  changeWeek(direction) {
    //TODO: Bind this to arrow keys as well
    const newDate = new Date(this.startDate);
    if (direction === "next") {
      newDate.setUTCDate(newDate.getDate() + 7); // add a week
    }
    if (direction === "previous") {
      newDate.setUTCDate(newDate.getDate() - 7); // subtract a week
    }
    this.startDate = dateToISO(newDate);
    this.validateDate();
  }
}
