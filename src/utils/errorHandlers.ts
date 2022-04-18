const defaultError = {
  humanReadableError: 'Something went wrong, please try again later',
  fullError: '',
};

export const parseWalletConnectError = (e): typeof defaultError => {
  if (e.message === 'No ethereum detected on web page') {
    return {
      humanReadableError:
        'No ethereum wallet detected, please use a browser with an ethereum wallet',
      fullError: e.message,
    };
  }
  return {
    ...defaultError,
    fullError: e.message,
  };
};
