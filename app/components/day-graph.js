import Component from "@glimmer/component";

export default class DayGraphComponent extends Component {
  get chartData() {
    return this.args.data;
  }

  get chartType() {
    return this.args.type;
  }
}
