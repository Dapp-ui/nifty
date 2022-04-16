const fs = require('fs');

const appendParamsElement = function (params) {
  function toDashed(camelCased) {
    return camelCased.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  }

  const dataAttributeElement = document.createElement('div');
  dataAttributeElement.id = 'niftyDataParams';

  Object.keys(params).forEach((key) => {
    dataAttributeElement.setAttribute(toDashed(key), params[key]);
  });

  document.body.appendChild(dataAttributeElement);
};

const args = process.argv.slice(2);

const configStr = fs.readFileSync(args[0], { encoding: 'utf-8' });

const script = `
<script>
(
  ${appendParamsElement.toString()}
)(
  ${configStr}
)
</script>
`;

console.log(script);
