import WalletConnector from '../WalletConnector';
import params from '../utils/params';

const { network } = params;

export default new WalletConnector(network);
