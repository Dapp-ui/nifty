const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const baseURI = 'ipfs://QmcF3nFoEsP17CtEn8Egm8Lkr9B44H9DTsKZA5RQMqBsrz/';

const numAirdrops = 11;

function outputMeta(result, i) {
  const attributes = Object.keys(result)
    .filter(
      (attributeKey) =>
        !!attributeKey &&
        !!result[attributeKey] &&
        attributeKey !== 'Tree Number'
    )
    .map((attributeKey) => {
      return {
        trait_type: attributeKey,
        value: result[attributeKey],
      };
    });

  const json = {
    image:
      i < numAirdrops ? `${baseURI}${i + 1}.png` : `${baseURI}unrevealed.gif`,
    name: `NFTree #${i + 1}`,
    description: 'Fight against climate change. 1 NFT = 1 real city tree',
    attributes: i < numAirdrops ? attributes : [],
  };

  fs.writeFileSync(`./unrevealedMeta/${i + 1}`, JSON.stringify(json));
}

fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);

    for (let i = 0; i < 60; i++) {
      const result = results[i];
      outputMeta(result, i);
    }
  });
