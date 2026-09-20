Array.prototype.snail = function (rowsCount, colsCount) {
  if (this.length !== rowsCount * colsCount) return [];
  const res = Array.from({ length: rowsCount }, () => []);
  for (let i = 0; i < this.length; i++) {
    const col = Math.floor(i / rowsCount);
    const idx = i % rowsCount;
    const row = col % 2 === 0 ? idx : rowsCount - 1 - idx;
    res[row][col] = this[i];
  }
  return res;
};
