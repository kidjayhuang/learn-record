function isPlainObject(v: unknown): v is object {
  return typeof v === "object" && v !== null;
}

function cloneDeep(obj: object) {
  const target = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isPlainObject(target[key])) {
        target[key] = cloneDeep(target[key])
      } else {
        target[key] = obj[key];
      }
    }
  }
  return target
}

const source: any = {
  a: 1,
  b: {
    bb: 22
  },
}
source.c = source
const tar = cloneDeep(source)

console.log(tar);
