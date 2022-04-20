const fs = require('fs');

const count = 10000;
const imageUrl =
  'ipfs://bafkreibmigyvemaylnl2eyzv7z5qfx4nvqwexs2simhk5i5nbbcd2pbhtu';
const folderName = 'smokersUnrevealed';

for (let i = 1; i <= count; i++) {
  fs.writeFileSync(
    `generated/${folderName}/${i}`,
    JSON.stringify({ image: imageUrl, name: `#${i}` })
  );
}
