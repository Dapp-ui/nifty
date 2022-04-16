import { getContext } from 'svelte';
import errorMessage from '../svelte/stores/errorMessage';

const defaultError = {
  humanReadableError: 'Something went wrong, please try again later',
  fullError: '',
};

const parseErrorIntoHumanReadable = (e): typeof defaultError => {
  switch (e.message) {
    default:
      return {
        ...defaultError,
        fullError: e.message,
      };
  }
};

const handleWalletConnectionError = (e: Error) => {
  const { close } = getContext('simple-modal');
  close();

  const err = parseErrorIntoHumanReadable(e);
  errorMessage.set(err);
};

export default handleWalletConnectionError;
