export default function removeEmpty(data: any) {
  const keys = Object.keys(data);
  const result: any = keys
    .filter((key: any) => data[key] !== undefined && data[key] !== null)
    .reduce((prev: any, next: any) => {
      const currentKey: any = next;
      let nextData: any;
      if (typeof data[currentKey] === 'object') {
        nextData = removeEmpty(data[currentKey]);
      } else {
        nextData = data[currentKey];
      }
      if (
        typeof data[currentKey] === 'object' &&
        Object.keys(nextData).length === 0
      ) {
        return prev;
      }
      prev[currentKey] = nextData;
      return prev;
    }, {});
  return result;
}
