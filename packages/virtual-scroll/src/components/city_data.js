const cityList = [
  {
    code: "0997",
    name: "阿克苏",
    pinyin: "Akesu",
    label: "Akesu0997",
  },
  {
    code: "0837",
    name: "阿坝",
    pinyin: "Aba",
    label: "Aba0837",
  },
  {
    code: "0483",
    name: "阿拉善盟",
    pinyin: "Alashanmeng",
    label: "Alashanmeng0483",
  },
  {
    code: "0906",
    name: "阿勒泰",
    pinyin: "Aletai",
    label: "Aletai0906",
  },
  {
    code: "0897",
    name: "阿里",
    pinyin: "Ali",
    label: "Ali0897",
  },
  {
    code: "0915",
    name: "安康",
    pinyin: "Ankang",
    label: "Ankang0915",
  },
  {
    code: "0556",
    name: "安庆",
    pinyin: "Anqing",
    label: "Anqing0556",
  },
  {
    code: "0412",
    name: "鞍山",
    pinyin: "Anshan",
    label: "Anshan0412",
  },
  {
    code: "0853",
    name: "安顺",
    pinyin: "Anshun",
    label: "Anshun0853",
  },
  {
    code: "0372",
    name: "安阳",
    pinyin: "Anyang",
    label: "Anyang0372",
  },
  {
    code: "0451",
    name: "阿城",
    pinyin: "Acheng",
    label: "Acheng0451",
  },
  {
    code: "0796",
    name: "安福",
    pinyin: "Anfu",
    label: "Anfu0796",
  },
  {
    code: "0572",
    name: "安吉",
    pinyin: "Anji",
    label: "Anji0572",
  },
  {
    code: "0871",
    name: "安宁",
    pinyin: "Anning",
    label: "Anning0871",
  },
  {
    code: "0536",
    name: "安丘",
    pinyin: "Anqiu",
    label: "Anqiu0536",
  },
  {
    code: "0595",
    name: "安溪",
    pinyin: "Anxi",
    label: "Anxi0595",
  },
  {
    code: "0791",
    name: "安义",
    pinyin: "Anyi",
    label: "Anyi0791",
  },
  {
    code: "0797",
    name: "安远",
    pinyin: "Anyuan",
    label: "Anyuan0797",
  },
  {
    code: "010",
    name: "北京",
    pinyin: "Beijing",
    label: "Beijing010",
  },
  {
    code: "0436",
    name: "白城",
    pinyin: "Baicheng",
    label: "Baicheng0436",
  },
  {
    code: "0776",
    name: "百色",
    pinyin: "Baise",
    label: "Baise0776",
  },
  {
    code: "0439",
    name: "白山",
    pinyin: "Baishan",
    label: "Baishan0439",
  },
  {
    code: "0943",
    name: "白银",
    pinyin: "Baiyin",
    label: "Baiyin0943",
  },
  {
    code: "0552",
    name: "蚌埠",
    pinyin: "Bangbu",
    label: "Bangbu0552",
  },
  {
    code: "0312",
    name: "保定",
    pinyin: "Baoding",
    label: "Baoding0312",
  },
  {
    code: "0917",
    name: "宝鸡",
    pinyin: "Baoji",
    label: "Baoji0917",
  },
  {
    code: "0875",
    name: "保山",
    pinyin: "Baoshan",
    label: "Baoshan0875",
  },
  {
    code: "0472",
    name: "包头",
    pinyin: "Baotou",
    label: "Baotou0472",
  },
  {
    code: "0478",
    name: "巴彦淖尔",
    pinyin: "Bayannaoer",
    label: "Bayannaoer0478",
  },
  {
    code: "0996",
    name: "巴音郭楞",
    pinyin: "Bayinguoleng",
    label: "Bayinguoleng0996",
  },
  {
    code: "0827",
    name: "巴中",
    pinyin: "Bazhong",
    label: "Bazhong0827",
  },
  {
    code: "0779",
    name: "北海",
    pinyin: "Beihai",
    label: "Beihai0779",
  },
  {
    code: "0414",
    name: "本溪",
    pinyin: "Benxi",
    label: "Benxi0414",
  },
  {
    code: "0857",
    name: "毕节",
    pinyin: "Bijie",
    label: "Bijie0857",
  },
  {
    code: "0543",
    name: "滨州",
    pinyin: "Binzhou",
    label: "Binzhou0543",
  },
  {
    code: "0909",
    name: "博尔塔拉",
    pinyin: "Boertala",
    label: "Boertala0909",
  },
  {
    code: "0558",
    name: "亳州",
    pinyin: "Bozhou",
    label: "Bozhou0558",
  },
  {
    code: "0514",
    name: "宝应",
    pinyin: "Baoying",
    label: "Baoying0514",
  },
  {
    code: "0451",
    name: "巴彦",
    pinyin: "Bayan",
    label: "Bayan0451",
  },
  {
    code: "0515",
    name: "滨海",
    pinyin: "Binhai",
    label: "Binhai0515",
  },
  {
    code: "0451",
    name: "宾县",
    pinyin: "Binxian",
    label: "Binxian0451",
  },
  {
    code: "0771",
    name: "宾阳",
    pinyin: "Binyang",
    label: "Binyang0771",
  },
  {
    code: "023",
    name: "璧山",
    pinyin: "Bishan",
    label: "Bishan023",
  },
  {
    code: "0391",
    name: "博爱",
    pinyin: "Boai",
    label: "Boai0391",
  },
  {
    code: "0752",
    name: "博罗",
    pinyin: "Boluo",
    label: "Boluo0752",
  },
  {
    code: "0543",
    name: "博兴",
    pinyin: "Boxing",
    label: "Boxing0543",
  },
  {
    code: "023",
    name: "重庆",
    pinyin: "Chongqing",
    label: "Chongqing023",
  },
  {
    code: "0431",
    name: "长春",
    pinyin: "Changchun",
    label: "Changchun0431",
  },
  {
    code: "0731",
    name: "长沙",
    pinyin: "Changsha",
    label: "Changsha0731",
  },
  {
    code: "0519",
    name: "常州",
    pinyin: "Changzhou",
    label: "Changzhou0519",
  },
  {
    code: "028",
    name: "成都",
    pinyin: "Chengdu",
    label: "Chengdu028",
  },
  {
    code: "0317",
    name: "沧州",
    pinyin: "Cangzhou",
    label: "Cangzhou0317",
  },
  {
    code: "0736",
    name: "常德",
    pinyin: "Changde",
    label: "Changde0736",
  },
  {
    code: "0895",
    name: "昌都",
    pinyin: "Changdu",
    label: "Changdu0895",
  },
  {
    code: "0997",
    name: "昌吉",
    pinyin: "Changji",
    label: "Changji0997",
  },
  {
    code: "0355",
    name: "长治",
    pinyin: "Changzhi",
    label: "Changzhi0355",
  },
  {
    code: "0565",
    name: "巢湖",
    pinyin: "Chaohu",
    label: "Chaohu0565",
  },
  {
    code: "0421",
    name: "朝阳",
    pinyin: "Chaoyang",
    label: "Chaoyang0421",
  },
  {
    code: "0768",
    name: "潮州",
    pinyin: "Chaozhou",
    label: "Chaozhou0768",
  },
  {
    code: "0314",
    name: "承德",
    pinyin: "Chengde",
    label: "Chengde0314",
  },
  {
    code: "0735",
    name: "郴州",
    pinyin: "Chenzhou",
    label: "Chenzhou0735",
  },
  {
    code: "0476",
    name: "赤峰",
    pinyin: "Chifeng",
    label: "Chifeng0476",
  },
  {
    code: "0566",
    name: "池州",
    pinyin: "Chizhou",
    label: "Chizhou0566",
  },
  {
    code: "0771",
    name: "崇左",
    pinyin: "Chongzuo",
    label: "Chongzuo0771",
  },
  {
    code: "0875",
    name: "楚雄",
    pinyin: "Chuxiong",
    label: "Chuxiong0875",
  },
  {
    code: "0550",
    name: "滁州",
    pinyin: "Chuzhou",
    label: "Chuzhou0550",
  },
  {
    code: "0577",
    name: "苍南",
    pinyin: "Cangnan",
    label: "Cangnan0577",
  },
  {
    code: "0539",
    name: "苍山",
    pinyin: "Cangshan",
    label: "Cangshan0539",
  },
  {
    code: "0530",
    name: "曹县",
    pinyin: "Caoxian",
    label: "Caoxian0530",
  },
  {
    code: "0535",
    name: "长岛",
    pinyin: "Changdao",
    label: "Changdao0535",
  },
  {
    code: "0551",
    name: "长丰",
    pinyin: "Changfeng",
    label: "Changfeng0551",
  },
  {
    code: "0411",
    name: "长海",
    pinyin: "Changhai",
    label: "Changhai0411",
  },
  {
    code: "0591",
    name: "长乐",
    pinyin: "Changle",
    label: "Changle0591",
  },
  {
    code: "0536",
    name: "昌乐",
    pinyin: "Changle",
    label: "Changle0536",
  },
  {
    code: "0570",
    name: "常山",
    pinyin: "Changshan",
    label: "Changshan0570",
  },
  {
    code: "0512",
    name: "常熟",
    pinyin: "Changshu",
    label: "Changshu0512",
  },
  {
    code: "0596",
    name: "长泰",
    pinyin: "Changtai",
    label: "Changtai0596",
  },
  {
    code: "0597",
    name: "长汀",
    pinyin: "Changting",
    label: "Changting0597",
  },
  {
    code: "0572",
    name: "长兴",
    pinyin: "Changxing",
    label: "Changxing0572",
  },
  {
    code: "0536",
    name: "昌邑",
    pinyin: "Changyi",
    label: "Changyi0536",
  },
  {
    code: "0768",
    name: "潮安",
    pinyin: "Chaoan",
    label: "Chaoan0768",
  },
  {
    code: "0871",
    name: "呈贡",
    pinyin: "Chenggong",
    label: "Chenggong0871",
  },
  {
    code: "023",
    name: "城口",
    pinyin: "Chengkou",
    label: "Chengkou023",
  },
  {
    code: "0530",
    name: "成武",
    pinyin: "Chengwu",
    label: "Chengwu0530",
  },
  {
    code: "0635",
    name: "茌平",
    pinyin: "Chiping",
    label: "Chiping0635",
  },
  {
    code: "0794",
    name: "崇仁",
    pinyin: "Chongren",
    label: "Chongren0794",
  },
  {
    code: "0797",
    name: "崇义",
    pinyin: "Chongyi",
    label: "Chongyi0797",
  },
  {
    code: "028",
    name: "崇州",
    pinyin: "Chongzhou",
    label: "Chongzhou028",
  },
  {
    code: "0571",
    name: "淳安",
    pinyin: "Chunan",
    label: "Chunan0571",
  },
  {
    code: "0574",
    name: "慈溪",
    pinyin: "Cixi",
    label: "Cixi0574",
  },
  {
    code: "020",
    name: "从化",
    pinyin: "Conghua",
    label: "Conghua020",
  },
  {
    code: "0556",
    name: "枞阳",
    pinyin: "Congyang",
    label: "Congyang0556",
  },
  {
    code: "0411",
    name: "大连",
    pinyin: "Dalian",
    label: "Dalian0411",
  },
  {
    code: "0769",
    name: "东莞",
    pinyin: "Dongguan",
    label: "Dongguan0769",
  },
  {
    code: "0872",
    name: "大理",
    pinyin: "Dali",
    label: "Dali0872",
  },
  {
    code: "0415",
    name: "丹东",
    pinyin: "Dandong",
    label: "Dandong0415",
  },
  {
    code: "0459",
    name: "大庆",
    pinyin: "Daqing",
    label: "Daqing0459",
  },
  {
    code: "0352",
    name: "大同",
    pinyin: "Datong",
    label: "Datong0352",
  },
  {
    code: "0457",
    name: "大兴安岭",
    pinyin: "Daxinganling",
    label: "Daxinganling0457",
  },
  {
    code: "0818",
    name: "达州",
    pinyin: "Dazhou",
    label: "Dazhou0818",
  },
  {
    code: "0692",
    name: "德宏",
    pinyin: "Dehong",
    label: "Dehong0692",
  },
  {
    code: "0838",
    name: "德阳",
    pinyin: "Deyang",
    label: "Deyang0838",
  },
  {
    code: "0534",
    name: "德州",
    pinyin: "Dezhou",
    label: "Dezhou0534",
  },
  {
    code: "0932",
    name: "定西",
    pinyin: "Dingxi",
    label: "Dingxi0932",
  },
  {
    code: "0887",
    name: "迪庆",
    pinyin: "Diqing",
    label: "Diqing0887",
  },
  {
    code: "0546",
    name: "东营",
    pinyin: "Dongying",
    label: "Dongying0546",
  },
  {
    code: "0515",
    name: "大丰",
    pinyin: "Dafeng",
    label: "Dafeng0515",
  },
  {
    code: "0580",
    name: "岱山",
    pinyin: "Daishan",
    label: "Daishan0580",
  },
  {
    code: "0557",
    name: "砀山",
    pinyin: "Dangshan",
    label: "Dangshan0557",
  },
  {
    code: "0555",
    name: "当涂",
    pinyin: "Dangtu",
    label: "Dangtu0555",
  },
  {
    code: "0530",
    name: "单县",
    pinyin: "Danxian",
    label: "Danxian0530",
  },
  {
    code: "0511",
    name: "丹阳",
    pinyin: "Danyang",
    label: "Danyang0511",
  },
  {
    code: "0753",
    name: "大埔",
    pinyin: "Dapu",
    label: "Dapu0753",
  },
  {
    code: "0598",
    name: "大田",
    pinyin: "Datian",
    label: "Datian0598",
  },
  {
    code: "028",
    name: "大邑",
    pinyin: "Dayi",
    label: "Dayi028",
  },
  {
    code: "0797",
    name: "大余",
    pinyin: "Dayu",
    label: "Dayu0797",
  },
  {
    code: "023",
    name: "大足",
    pinyin: "Dazu",
    label: "Dazu023",
  },
  {
    code: "0792",
    name: "德安",
    pinyin: "Dean",
    label: "Dean0792",
  },
  {
    code: "0595",
    name: "德化",
    pinyin: "Dehua",
    label: "Dehua0595",
  },
  {
    code: "0431",
    name: "德惠",
    pinyin: "Dehui",
    label: "Dehui0431",
  },
  {
    code: "0371",
    name: "登封",
    pinyin: "Dengfeng",
    label: "Dengfeng0371",
  },
  {
    code: "0572",
    name: "德清",
    pinyin: "Deqing",
    label: "Deqing0572",
  },
  {
    code: "0758",
    name: "德庆",
    pinyin: "Deqing",
    label: "Deqing0758",
  },
  {
    code: "0793",
    name: "德兴",
    pinyin: "Dexing",
    label: "Dexing0793",
  },
  {
    code: "0668",
    name: "电白",
    pinyin: "Dianbai",
    label: "Dianbai0668",
  },
  {
    code: "023",
    name: "垫江",
    pinyin: "Dianjiang",
    label: "Dianjiang023",
  },
  {
    code: "0797",
    name: "定南",
    pinyin: "Dingnan",
    label: "Dingnan0797",
  },
  {
    code: "0530",
    name: "定陶",
    pinyin: "Dingtao",
    label: "Dingtao0530",
  },
  {
    code: "0550",
    name: "定远",
    pinyin: "Dingyuan",
    label: "Dingyuan0550",
  },
  {
    code: "0635",
    name: "东阿",
    pinyin: "Donga",
    label: "Donga0635",
  },
  {
    code: "0518",
    name: "东海",
    pinyin: "Donghai",
    label: "Donghai0518",
  },
  {
    code: "0530",
    name: "东明",
    pinyin: "Dongming",
    label: "Dongming0530",
  },
  {
    code: "0538",
    name: "东平",
    pinyin: "Dongping",
    label: "Dongping0538",
  },
  {
    code: "0596",
    name: "东山",
    pinyin: "Dongshan",
    label: "Dongshan0596",
  },
  {
    code: "0515",
    name: "东台",
    pinyin: "Dongtai",
    label: "Dongtai0515",
  },
  {
    code: "0577",
    name: "洞头",
    pinyin: "Dongtou",
    label: "Dongtou0577",
  },
  {
    code: "0794",
    name: "东乡",
    pinyin: "Dongxiang",
    label: "Dongxiang0794",
  },
  {
    code: "0579",
    name: "东阳",
    pinyin: "Dongyang",
    label: "Dongyang0579",
  },
  {
    code: "0762",
    name: "东源",
    pinyin: "Dongyuan",
    label: "Dongyuan0762",
  },
  {
    code: "0566",
    name: "东至",
    pinyin: "Dongzhi",
    label: "Dongzhi0566",
  },
  {
    code: "0792",
    name: "都昌",
    pinyin: "Duchang",
    label: "Duchang0792",
  },
  {
    code: "028",
    name: "都江堰",
    pinyin: "Dujiangyan",
    label: "Dujiangyan028",
  },
];

export default cityList;
