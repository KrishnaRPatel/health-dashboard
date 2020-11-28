import {
  transformData,
  shapeData,
  formatDate,
} from "health-dashboard/utils/chart";
import { module, test } from "qunit";

module("Unit | Utility | chart", function () {
  const rawData = [
    { dates: "2018-12-31", distance: 1.355, workoutType: "a" },
    { dates: "2019-01-01", distance: 1.569, workoutType: "a" },
    { dates: "2019-01-02", distance: 2.576, workoutType: "c" },
    { dates: "2019-01-03", distance: 3.874, workoutType: "b" },
    { dates: "2019-01-04", distance: 4.77, workoutType: "b" },
    { dates: "2019-01-05", distance: 1.676, workoutType: "b" },
    { dates: "2019-01-06", distance: 1.409, workoutType: "b" },
    { dates: "2019-01-07", distance: 2.67, workoutType: "b" },
    { dates: "2019-01-08", distance: 1.497, workoutType: "a" },
    { dates: "2019-01-09", distance: 1.593, workoutType: "c" },
  ];
  const keys = ["dates", "distance", "workoutType"];

  test("transformData transforms raw data to chart readable content", function (assert) {
    const result = transformData(rawData, keys);
    assert.deepEqual(
      result,
      {
        dates: [
          "2018-12-31",
          "2019-01-01",
          "2019-01-02",
          "2019-01-03",
          "2019-01-04",
          "2019-01-05",
          "2019-01-06",
          "2019-01-07",
          "2019-01-08",
          "2019-01-09",
        ],
        distance: [
          1.355,
          1.569,
          2.576,
          3.874,
          4.77,
          1.676,
          1.409,
          2.67,
          1.497,
          1.593,
        ],
        workoutType: ["a", "a", "c", "b", "b", "b", "b", "b", "a", "c"],
      },
      "transformData transforms data correctly"
    );
  });

  test("shapeData shapes data to chart readable content", function (assert) {
    const transformedData = transformData(rawData, keys);
    assert.deepEqual(
      shapeData(transformedData, "dates", ["distance", "workoutType"]),
      {
        labels: [
          "2018-12-31",
          "2019-01-01",
          "2019-01-02",
          "2019-01-03",
          "2019-01-04",
          "2019-01-05",
          "2019-01-06",
          "2019-01-07",
          "2019-01-08",
          "2019-01-09",
        ],
        series: [
          [1.355, 1.569, 2.576, 3.874, 4.77, 1.676, 1.409, 2.67, 1.497, 1.593],
          ["a", "a", "c", "b", "b", "b", "b", "b", "a", "c"],
        ],
      },
      "shapeData transforms data correctly"
    );

    assert.deepEqual(
      transformData(rawData, keys),
      transformedData,
      "shapeData doesn't mutate original transformedData array"
    );

    assert.deepEqual(
      shapeData(transformedData, "dates", ["distance", "workoutType"], 3),
      {
        labels: ["2018-12-31", "2019-01-01", "2019-01-02"],
        series: [
          [1.355, 1.569, 2.576],
          ["a", "a", "c"],
        ],
      },
      "shapeData limits the number when its included at the start if date isn't specified"
    );

    assert.deepEqual(
      shapeData(
        transformedData,
        "dates",
        ["distance", "workoutType"],
        3,
        "2019-01-01"
      ),
      {
        labels: ["2019-01-01", "2019-01-02", "2019-01-03"],
        series: [
          [1.569, 2.576, 3.874],
          ["a", "c", "b"],
        ],
      },
      "shapeData limits the number when included starting at the date specified"
    );

    assert.deepEqual(
      shapeData(
        transformedData,
        "dates",
        ["distance", "workoutType"],
        null,
        "2019-01-04"
      ),
      {
        labels: [
          "2019-01-04",
          "2019-01-05",
          "2019-01-06",
          "2019-01-07",
          "2019-01-08",
          "2019-01-09",
        ],
        series: [
          [4.77, 1.676, 1.409, 2.67, 1.497, 1.593],
          ["b", "b", "b", "b", "a", "c"],
        ],
      },
      "shapeData returns all data after the date specified if limit is null"
    );

    assert.deepEqual(
      shapeData(
        transformedData,
        "dates",
        ["distance", "workoutType"],
        0,
        "2019-01-04"
      ),
      {
        labels: [
          "2019-01-04",
          "2019-01-05",
          "2019-01-06",
          "2019-01-07",
          "2019-01-08",
          "2019-01-09",
        ],
        series: [
          [4.77, 1.676, 1.409, 2.67, 1.497, 1.593],
          ["b", "b", "b", "b", "a", "c"],
        ],
      },
      "shapeData returns all data after the date specified if limit is 0"
    );

    assert.deepEqual(
      shapeData(
        transformedData,
        "dates",
        ["distance", "workoutType"],
        0,
        "2019-02-04"
      ),
      {
        labels: [],
        series: [],
      },
      "if start date is not in transformedData dates array, return empty array"
    );
  });

  test("formatDate changes date formatting on a datestring", function (assert) {
    assert.strictEqual(
      formatDate("2018-12-31"),
      "12/31/18",
      "transforms dates without included options"
    );
    assert.strictEqual(
      formatDate("2018-12-31", false),
      "12/31",
      "transforms dates with year option set to false"
    );
  });
});
