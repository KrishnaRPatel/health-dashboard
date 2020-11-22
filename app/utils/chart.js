/*
 * Methods to assist with showing charts such as transforming data
 */

/**
 * Transform raw data to data object meant for easier chart consumption
 * Assumes dates are in order.
 * Example:
 * input: ([{dates: "2018-12-31", distance: 1.355}, {dates: "2019-01-01", distance: 1.569}],
 *  ['dates', 'distance'])
 * output: {dates: ["2018-12-31", "2019-01-01"], distance: [1.355, 1.569]}
 * @function
 *
 * @param {Array.<Object.<string, *>>} rawData - Array of key-value pairs. Example: `[{dates: "2018-12-31", distance: 1.355}, {dates: "2019-01-01", distance: 1.569}]`
 * @param {Array.<string>} keys - Array of key strings. Example: `['dates', 'distance']`
 * @returns {Object.<Array.<{string:values}>>} - Object where keys have all their values. Example: `{dates: ["2018-12-31", "2019-01-01"], distance: [1.355, 1.569]}`
 */
export const transformData = (rawData, keys, reverse = false) => {
  if (reverse) {
    rawData.reverse();
  }
  const transformedData = {};
  keys.forEach((key) => {
    transformedData[key] = Array.from(rawData, (item) => item[key]);
  });
  return transformedData;
};

/**
 * Transform transformed data to data object meant for direct chartist.js input
 * Assumes dates are in order.
 * Example:
 * input: ({dates: ["2018-12-31", "2019-01-01"], distance: [1.355, 1.569], workoutType: ['a', 'b']})
 * output: {labels: ["2018-12-31", "2019-01-01"], series: [[1.355, 1.569], ['a', 'b']]}
 * @function
 *
 * @param {Array.<Object.<string, *>>} transformedData - Object where keys have all their values (from transformData ex. `{dates: ["2018-12-31", "2019-01-01"], distance: [1.355, 1.569]}`)
 * @param {string} xAxis - key for array of labels for the x axis.
 * @param {Array.<string>} dataTypes - array of dataTypes in form of keys
 * @param {Number} [limit=transformedData[xAxis].length] - number of data points for graph
 * @param {Array.<string>} startDate - startDate for the graph
 * @returns {Object.<Array.<{string:values}>>} - Object where keys have all their values. Example: `{labels: ["2018-12-31", "2019-01-01"], series: [1.355, 1.569]}`
 */
export const shapeData = (
  transformedData,
  xAxis,
  dataTypes,
  limit,
  startDate
) => {
  if (!limit) {
    limit = transformedData[xAxis].length;
  }

  const leftIndex = startDate ? transformedData.dates.indexOf(startDate) : 0;

  if (leftIndex === -1) {
    console.error("could not find start date in transformed data");
    return { labels: [], series: [] };
  }

  const shapedData = {
    labels: transformedData[xAxis].slice(leftIndex, leftIndex + limit),
    series: [],
  };

  dataTypes.forEach((key) =>
    shapedData.series.push(
      transformedData[key].slice(leftIndex, leftIndex + limit)
    )
  );

  return shapedData;
};

export default { transformData, shapeData };
