let arr = [
  { id: 1, name: "1", pid: 0 },
  { id: 2, name: "2", pid: 1 },
  { id: 3, name: "3", pid: 1 },
  { id: 4, name: "4", pid: 3 },
  { id: 5, name: "5", pid: 3 },
];
let tree = [
  {
    id: 1,
    name: "1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "3",
        pid: 1,
        children: [
          {
            id: 4,
            name: "4",
            pid: 3,
            children: [],
          },
        ],
      },
    ],
  },
];

function treeToArray(tree) {
  let res = [];
  for (const item of tree) {
    const { children, ...i } = item;
    if (children && children.length) {
      res = res.concat(treeToArray(children));
    }
    res.push(i);
  }
  return res;
}

// function treeToArray(tree) {
//   return tree.reduce((res, item) => {
//     const { children, ...i } = item;
//     return res.concat(
//       i,
//       children && children.length ? treeToArray(children) : []
//     );
//   }, []);
// }


function arrayToTree(items) {
  let res = [];
  let getChildren = (res, pid) => {
    for (const i of items) {
      if (i.pid === pid) {
        const newItem = { ...i, children: [] };
        res.push(newItem);
        getChildren(newItem.children, newItem.id);
      }
    }
  };
  getChildren(res, 0);
  return res;
}


function arrayToTree(items) {
    let res = []
    function getChildren(res, pid) {
        for (let v of items) {
            if(v.pid === pid) {
                const newV = {...v, children: []}
                res.push(newV)
                getChildren(newV.children, v.id)
            }
        }
    }
    getChildren(res, 0)
    return res
  }
console.log(111,  JSON.stringify(arrayToTree(arr), null, 2));
// function arrayToTree(items) {
//     let res = [] // 存放结果集
//     let map = {}

//     // 先转成map存储
//     for (const i of items) {
//         map[i.id] = { ...i, children: [] }
//     }

//     for (const i of items) {
//         const newItem = map[i.id]
//         if (i.pid === 0) {
//             res.push(newItem)
//         } else {
//             if (Object.prototype.hasOwnProperty.call(map, i.pid)) {
//                 map[i.pid].children.push(newItem)
//             }
//         }
//     }
//     return res
// }

// function arrayToTree(items) {
//     let res = [] // 存放结果集
//     let map = {}
//     // 判断对象是否有某个属性
//     let getHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)

//     // 边做map存储，边找对应关系
//     for (const i of items) {
//         map[i.id] = {
//             ...i,
//             children: getHasOwnProperty(map, i.id) ? map[i.id].children : []
//         }
//         const newItem = map[i.id]
//         if (i.pid === 0) {
//             res.push(newItem)
//         } else {
//             if (!getHasOwnProperty(map, i.pid)) {
//                 map[i.pid] = {
//                     children: []
//                 }
//             }
//             map[i.pid].children.push(newItem)
//         }
//     }
//     return res
// }
