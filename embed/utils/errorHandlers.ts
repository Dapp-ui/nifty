const defaultError = {
  humanReadableError: 'Something went wrong, please try again later',
  fullError: '',
};

export const parseWalletConnectError = (e): typeof defaultError => {
  const message = e.message || e.data?.message || '';

  if (message === 'No ethereum detected on web page') {
    return {
      humanReadableError:
        'No ethereum wallet detected, please use a browser with an ethereum wallet',
      fullError: message,
    };
  }

  if (message === 'User rejected the request.') {
    return {
      humanReadableError: 'User rejected request, please try again',
      fullError: message,
    };
  }

  return {
    ...defaultError,
    fullError: message,
  };
};

export const parseMintError = (e): typeof defaultError => {
  const message = e.message || e.data?.message || '';

  console.log('THE MESSAGE: ', message);

  if (
    message.indexOf('sender does not have enough allow list entries') !== -1
  ) {
    return {
      humanReadableError: 'user not on the allowlist, cannot mint',
      fullError: message,
    };
  }

  return {
    ...defaultError,
    fullError: message,
  };
};
