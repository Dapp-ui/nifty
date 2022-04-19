const defaultError = {
  humanReadableError: 'Something went wrong, please try again later',
  fullError: '',
};

export const parseWalletConnectError = (e): typeof defaultError => {
  console.log('CONNECT ERROR:', e);
  if (e.message === 'No ethereum detected on web page') {
    return {
      humanReadableError:
        'No ethereum wallet detected, please use a browser with an ethereum wallet',
      fullError: e.message,
    };
  }

  if (e.message === 'User rejected the request.') {
    return {
      humanReadableError: 'User rejected request, please try again',
      fullError: e.message,
    };
  }

  return {
    ...defaultError,
    fullError: e.message,
  };
};

export const parseMintError = (e): typeof defaultError => {
  console.log('MINT ERROR:', e);

  if (
    e.data.message.indexOf('sender does not have enough allow list entries') !==
    -1
  ) {
    return {
      humanReadableError: 'user not on the allowlist, cannot mint',
      fullError: e.data.message,
    };
  }

  return {
    ...defaultError,
    fullError: e.message,
  };
};
