const fs = require('fs');

const setParams = function (params) {
  // @ts-ignore
  window.niftyParams = params;
};

const args = process.argv.slice(2);

const configStr = fs.readFileSync(args[0], { encoding: 'utf-8' });

const script = `
<script>
(
  ${setParams.toString()}
)(
  ${configStr}
)
</script>
`;

console.log(script);
