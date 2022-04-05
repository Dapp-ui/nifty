const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const baseURI = 'ipfs://QmUvrv4WvR4hsCUCUonTcLSo81bUKtdQvnm4C4UqGF83bJ/';

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
    image: `${baseURI}${i + 1}.png`,
    name: `NFTree #${i + 1}`,
    description: 'Fight against climate change. 1 NFT = 1 real city tree',
    attributes,
  };

  fs.writeFileSync(`./revealedMeta/${i + 1}`, JSON.stringify(json));
}

fs.createReadStream('./jumbledData.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);

    for (let i = 0; i < 60; i++) {
      const result = results[i];
      outputMeta(result, i);
    }
  });
