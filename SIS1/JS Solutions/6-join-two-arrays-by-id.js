var join = function (arr1, arr2) {
  const map = new Map();
  for (const o of arr1) map.set(o.id, o);
  for (const o of arr2) {
    map.set(o.id, map.has(o.id) ? { ...map.get(o.id), ...o } : o); 
  }
  return [...map.values()].sort((a, b) => a.id - b.id);
};
