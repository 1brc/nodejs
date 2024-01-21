import * as readline from 'node:readline';
import * as fs from 'node:fs';

const fileName = process.argv[2];
const stream = fs.createReadStream(fileName);
const lineStream = readline.createInterface(stream);

const aggregations = new Map();

for await (const line of lineStream) {
  const [stationName, temperatureStr] = line.split(';');

  // use integers for computation to avoid loosing precision
  const temperature = Math.floor(parseFloat(temperatureStr) * 10);

  const existing = aggregations.get(stationName);

  if (existing) {
    existing.min = Math.min(existing.min, temperature);
    existing.max = Math.max(existing.max, temperature);
    existing.sum += temperature;
    existing.count++;
  } else {
    aggregations.set(stationName, {
      min: temperature,
      max: temperature,
      sum: temperature,
      count: 1,
    });
  }
}

printCompiledResults(aggregations);

/**
 * @param {Map} aggregations
 *
 * @returns {void}
 */
function printCompiledResults(aggregations) {
  const sortedStations = Array.from(aggregations.keys()).sort();

  let result =
    '{' +
    sortedStations
      .map((station) => {
        const data = aggregations.get(station);
        return `${station}=${round(data.min / 10)}/${round(
          data.sum / 10 / data.count
        )}/${round(data.max / 10)}`;
      })
      .join(', ') +
    '}';

  console.log(result);
}

/**
 * @example
 * round(1.2345) // "1.2"
 * round(1.55) // "1.6"
 * round(1) // "1.0"
 *
 * @param {number} num
 *
 * @returns {string}
 */
function round(num) {
  const fixed = Math.round(10 * num) / 10;

  return fixed.toFixed(1);
}
