import DS from "ember-data";
const { Model } = DS;

export default Model.extend({
  date: DS.attr("date"),
  type: DS.attr("string"),
  unit: DS.attr("string"),
  value: DS.attr("string"),
});
