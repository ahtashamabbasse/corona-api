const cleanString = str => {
  return parseInt(str.trim().replace(/,/g, '') || '0', 10);
};

module.exports = {
  cleanString
};
