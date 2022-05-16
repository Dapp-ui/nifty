import Nifty from '../Nifty';
import params from '../utils/params';

const { network, contractAddress } = params;

// declare global nifty instance
const nifty = new Nifty(network, contractAddress);

export default nifty;
