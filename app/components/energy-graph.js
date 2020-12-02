import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { shapeData } from "health-dashboard/utils/chart";

const MIN_DATE = {
  date: new Date("2020-01-01"),
  iso: "2020-01-01",
};

export default class EnergyGraphComponent extends Component {
  @tracked startDate = this.maxDate;
  @tracked days = 7;

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
      this.days, //FIXME: change this to a set of three options
      this.startDate
    );
  }

  get chartType() {
    if (this.args.type === "Week") {
      return "Daily Calories Burned";
    }
    return this.args.type;
  }

  get chartOptions() {
    const options = {
      stackBars: true,
      low: 1200,
    };
    return options;
  }

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
}
