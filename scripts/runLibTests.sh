
echo "Setting up Hardhat Network";

CURL_OUTPUT="";
HARDHAT_NODE_READY_TEXT="jsonrpc";

hardhat node & HARDHAT_NODE_PROCESS="$!"

while [[ "$CURL_OUTPUT" != *"$HARDHAT_NODE_READY_TEXT"* ]]
do
  sleep 0.3;
  CURL_OUTPUT=$(curl -s 127.0.0.1:8545);
done

echo "Hardhat network is up!";

env TS_NODE_PROJECT="tsconfig.testing.json" hardhat test test/lib/* --network localhost;
