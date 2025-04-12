import { type RemoteModule } from "./types";
export * from "./types";

const mock = [
  {
    menuName: "门店等级",
    menuCode: "menu001",
    id: "100001",
    sortFlag: "1",
    version: "2",
    js: [
      {
        id: "6",
        url: "http://www.example.com/js/card_storeLevel_hash.js;http://www.example.com/js/route_storeLevel_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "采购",
    menuCode: "menu002",
    id: "100002",
    sortFlag: "2",
    version: "2",
    js: [
      {
        id: "7",
        url: "http://www.example.com/js/card_purchase_hash.js;http://www.example.com/js/route_purchase_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "零售",
    menuCode: "menu003",
    id: "100003",
    sortFlag: "3",
    version: "2",
    js: [
      {
        id: "8",
        url: "http://www.example.com/js/card_retail_hash.js;http://www.example.com/js/route_retail_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "零售效能",
    menuCode: "menu004",
    id: "100004",
    sortFlag: "4",
    version: "2",
    js: [
      {
        id: "9",
        url: "http://www.example.com/js/card_retailEfficiency_hash.js;http://www.example.com/js/route_retailEfficiency_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "门店活动",
    menuCode: "menu005",
    id: "100005",
    sortFlag: "5",
    version: "2",
    js: [
      {
        id: "10",
        url: "http://www.example.com/js/card_storeActivity_hash.js;http://www.example.com/js/route_storeActivity_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "库存",
    menuCode: "menu006",
    id: "100006",
    sortFlag: "6",
    version: "2",
    js: [
      {
        id: "11",
        url: "http://www.example.com/js/card_inventory_hash.js;http://www.example.com/js/route_inventory_hash.js",
        version: "2",
      },
    ],
  },
  {
    menuName: "用户经营",
    menuCode: "menu007",
    id: "100007",
    sortFlag: "7",
    version: "2",
    js: [
      {
        id: "12",
        url: "http://www.example.com/js/card_userManage_hash.js;http://www.example.com/js/route_userManage_hash.js",
        version: "2",
      },
    ],
  },
];
export const fetchRemoteModules: () => Promise<RemoteModule[]> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const remotes = mock;
      resolve(remotes);
    }, 200);
  });
};
