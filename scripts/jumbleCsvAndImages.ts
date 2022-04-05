const numAirdrops = 11;

const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];

fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const attributes = Object.keys(results[0]).filter(
      (attributeKey) => !!attributeKey && !!results[0][attributeKey]
    );

    const csvWriter = createCsvWriter({
      path: './jumbledData.csv',
      header: attributes.map((attribute) => ({
        id: attribute,
        title: attribute,
      })),
    });

    const nonRandomized = results.slice(0, numAirdrops);
    const randomized = results.slice(numAirdrops).sort(() => {
      return Math.random() - Math.random();
    });

    const records = [...nonRandomized, ...randomized];

    for (let i = 0; i < records.length; i++) {
      fs.copyFileSync(
        `./images/${records[i]['Tree Number']}.png`,
        `./revealedImages/${i + 1}.png`
      );
    }

    csvWriter
      .writeRecords(records) // returns a promise
      .then(() => {
        console.log('...Done');
      });
  });
