import Nifty from '../Nifty';
import params from '../utils/params';
import walletConnector from './walletConnectorInstance';

const { network, contractAddress } = params;

// declare global nifty instance
const nifty = new Nifty(network, contractAddress, walletConnector);

export default nifty;
