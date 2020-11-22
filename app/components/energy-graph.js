import Component from "@glimmer/component";
import { shapeData } from "health-dashboard/utils/chart";

export default class EnergyGraphComponent extends Component {
  get chartData() {
    return shapeData(
      this.args.data,
      "dates",
      ["calories_passive", "calories_active"],
      7, //FIXME: change this to a set of three options
      "2020-01-01"
    );
  }

  get chartType() {
    if (this.args.type === "day") {
      return "day";
    }
    return this.args.type;
  }

  get chartOptions() {
    const options = {
      stackBars: true,
    };
    return options;
  }
}
