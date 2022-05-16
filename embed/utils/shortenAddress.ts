const shortenAddress = (address: string): string => {
  if (!address) {
    return '';
  }

  return `${address.substring(0, 5)}...${address.substring(36, 40)}`;
};

export default shortenAddress;
