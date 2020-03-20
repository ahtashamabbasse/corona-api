const cleanString = cell => {
  // let str = cell.children.length !== 0 ? cell.children[0].data : '';
  return parseInt(cell.trim().replace(/,/g, '') || '0', 10);
};

module.exports = {
  cleanString
};
