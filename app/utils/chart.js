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
export const transformData = (rawData, keys) => {
  const transformedData = {};
  keys.forEach((key) => {
    transformedData[key] = Array.from(rawData, (item) => item[key]);
  });
  return transformedData;
};

export default { transformData };
