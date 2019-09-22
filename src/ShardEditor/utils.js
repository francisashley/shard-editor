export function purgeArray(items, index) {
  return items.filter((item, i) => i !== index);
}

export function insertArray(index, item, arr) {
  arr.splice(index, 0, item);
  return arr;
}
