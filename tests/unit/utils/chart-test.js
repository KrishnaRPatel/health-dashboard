import { transformData } from "health-dashboard/utils/chart";
import { module, test } from "qunit";

module("Unit | Utility | chart", function () {
  const rawData = [
    { dates: "2018-12-31", distance: 1.355 },
    { dates: "2019-01-01", distance: 1.569 },
  ];
  const keys = ["dates", "distance"];

  test("it transforms raw data to chart readable content", function (assert) {
    const result = transformData(rawData, keys);
    assert.deepEqual(
      result,
      { dates: ["2018-12-31", "2019-01-01"], distance: [1.355, 1.569] },
      "transformData transforms data correctly"
    );
  });
});
