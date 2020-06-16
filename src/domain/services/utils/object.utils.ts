/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

const isArray = (obj: any) =>
  Object.prototype.toString.call(obj) === '[object Array]';

const addNode = (prop: string, value: any, parent: any) => {
  parent[prop] = value;
};

const recursiveDiff = (a: any, b: any, node: any) => {
  for (const prop in a) {
    if (
      typeof b[prop] !== 'undefined' &&
      JSON.stringify(a[prop]) !== JSON.stringify(b[prop])
    ) {
      if (typeof b[prop] !== 'object' || b[prop] == null) {
        addNode(prop, a[prop], node); // b[prop]
      } else if (isArray(b[prop])) {
        addNode(prop, [], node);
        recursiveDiff(a[prop], b[prop], node[prop]);
      } else {
        addNode(prop, {}, node);
        recursiveDiff(a[prop], b[prop], node[prop]);
      }
    }
  }
};

const getDiff = (a: any, b: any) => {
  const diff = isArray(a) ? [] : {};
  recursiveDiff(a, b, diff);
  return diff;
};

export { getDiff };
