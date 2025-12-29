
import { DayItinerary, Categories } from './types';

export const CATEGORIES: Categories = {
  food: { label: "餐飲推薦", color: "text-orange-400 bg-orange-400/5 border-orange-400/20" },
  spot: { label: "景點活動", color: "text-emerald-400 bg-emerald-400/5 border-emerald-400/20" },
  shop: { label: "購物尋寶", color: "text-purple-400 bg-purple-400/5 border-purple-400/20" },
  transport: { label: "交通方式", color: "text-blue-400 bg-blue-400/5 border-blue-400/20" }
};

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1, title: "抵達釜山與西面探索",
    items: [
      { time: "18:25", title: "抵達釜山機場", type: "transport", detail: "入境後先在機場便利商店儲值 T-Money 卡 [cite: 4]", note: "【方案A：計程車】預估 ₩18,000 / 35-40分，給司機看：부산진구 서면로 20 (센特爾7酒店) [cite: 3]", link: "Gimhae International Airport" },
      { time: "20:45", title: "晚餐：西面湯飯/烤肉", type: "food", detail: "松亭3代豬肉湯飯：₩9,000，24小時營業。咕咕烤雞：₩20,000，皮脆多汁。味贊王鹽烤肉：五花肉 ₩14,000，專人代烤 [cite: 8, 9, 10]", note: "構圖建議：特寫湯滾燙時舀起滿滿的肉 [cite: 12]", link: "Songjeong Samdae Gukbap" },
      { time: "21:30", title: "西面逛街 (飯店周邊)", type: "shop", detail: "ARTBOX/DAISO：找 Galapagos Friends 狗狗系列。西面地下街：便宜襪子、手機殼 [cite: 16, 17]", note: "借位拍照：在 Artbox 讓小孩拿大玩偶遮臉 [cite: 18]", link: "Seomyeon Artbox" }
    ]
  },
  {
    day: 2, title: "松亭與海雲台海岸之旅",
    items: [
      { time: "08:30", title: "前往青沙浦 (EGG DROP)", type: "food", detail: "可先在西面 EGG DROP 吃早餐 [cite: 21]", note: "計程車：預估 ₩18,000，看：청사포 (Cheongsapo) [cite: 22]", link: "Egg Drop Seomyeon" },
      { time: "09:15", title: "青沙浦景點巡禮", type: "spot", detail: "灌籃高手平交道、天空步道 (Daritdol)、紅白燈塔 [cite: 24, 25, 26]", note: "透明步道風景壯闊，燈塔是經典合照背景 [cite: 25, 26]", link: "Cheongsapo Daritdol Observatory" },
      { time: "11:30", title: "午餐：青沙浦烤魚/烤貝", type: "food", detail: "青沙浦烤魚：適合家庭。秀敏家：想吃烤貝可選。Alice Donut：₩4,000 造型可愛 [cite: 28, 29, 30]", link: "Suminine" },
      { time: "13:00", title: "天空膠囊列車 (預約制)", type: "transport", detail: "青沙浦 -> 尾浦，車程約30分鐘。自費行程不含在 Pass 內 [cite: 33]", note: "點心：Rendeja-Vous 尾浦店，濟州風滿地木屑超好拍 [cite: 34]", link: "Blue Line Park Mipo" },
      { time: "14:15", title: "SEA LIFE 水族館 (VBP)", type: "spot", detail: "必看：美人魚秀 15:30 (B2/B3)、鯊魚餵食秀 16:00 (B3) [cite: 38]", note: "Pass 在此啟用，效期至 Day 4 下午 [cite: 37]。Kakao Friends 海雲台店找寵物用品 [cite: 40]", link: "Sea Life Busan Aquarium" },
      { time: "17:30", title: "晚餐：廣安木 海雲台店", type: "food", detail: "厚切熟成五花肉與梅花肉，專業代烤。環境時尚整潔，排煙好 [cite: 45, 46, 49]", note: "支援 CatchTable 預約，若無則預約 LCT 大樓內韓式定食 [cite: 47, 52]", link: "Gwang-an-mok" },
      { time: "19:45", title: "X the Sky (VBP)", type: "spot", detail: "20:30 最後入場。全球最高星巴克 (99F) [cite: 61, 63]", note: "構圖：透過地板拍沙灘，利用玻璃反光拍倒影 [cite: 64]", link: "Busan X the Sky" },
      { time: "20:30", title: "Club D Oasis 汗蒸幕 (VBP)", type: "spot", detail: "洗澡後喝甜米釀、吃烤蛋 [cite: 67, 68]", note: "全家羊角頭造型拍照，小孩拿蛋敲爸爸頭 [cite: 69]", link: "Club D Oasis" }
    ]
  },
  {
    day: 3, title: "甘川、松島與南浦洞",
    items: [
      { time: "09:30", title: "甘川洞文化村 (VBP)", type: "spot", detail: "體驗手翻書、Ibgogage/Chibima 韓服 [cite: 80, 83]", note: "必拍小王子背影。買貓咪造型吐司 [cite: 85, 86]", link: "Gamcheon Culture Village" },
      { time: "12:30", title: "午餐：松島海鮮/定食", type: "food", detail: "松島廚房 (22樓景觀) 或 泗川海鮮湯 (₩40,000) [cite: 90, 94, 98]", link: "Sacheon Haemultang" },
      { time: "13:30", title: "松島海上纜車 & 龍宮雲橋", type: "spot", detail: "水晶車廂 (VBP)。龍宮雲橋連接無人島 [cite: 100, 105]", note: "點心：現炸松島麻花捲 ₩1,000 [cite: 101]", link: "Songdo Marine Cable Car" },
      { time: "15:15", title: "白淺灘文化村", type: "spot", detail: "海岸隧道、藍白風格圍欄 [cite: 111]", note: "Huinnyeoul Beach 粉紅海景咖啡廳 [cite: 110]", link: "Huinnyeoul Culture Village" },
      { time: "16:00", title: "電影博物館 + Trick Eye (VBP)", type: "spot", detail: "Trick Eye 3D 美術館 4歲小孩會玩瘋 [cite: 117, 118]", note: "17:00 最後入場 [cite: 119]", link: "Busan Museum of Movies" },
      { time: "17:30", title: "南浦洞逛街與晚餐", type: "food", detail: "南浦地下街平價女裝、樂天百貨水上噴泉秀 [cite: 123, 127]", note: "晚餐：味贊王、南浦蔘雞湯、香港飯店0410 [cite: 133, 134, 135]", link: "Nampo-dong Street" }
    ]
  },
  {
    day: 4, title: "機張、Outlet 與西面",
    items: [
      { time: "10:00", title: "Skyline Luge (VBP)", type: "spot", detail: "斜坡滑車體驗 [cite: 150]", note: "方案A計程車：約 ₩25,000 [cite: 148]", link: "Skyline Luge Busan" },
      { time: "11:15", title: "樂天世界 (VBP)", type: "spot", detail: "14:00 花車巡遊，務必在 14:15 前掃碼入場 [cite: 154, 157]", link: "Lotte World Busan" },
      { time: "14:00", title: "紅磚校園 (VBP) + Outlet", type: "shop", detail: "室內積木館。Outlet 買 Wonder Place/Top Ten/Roem [cite: 158, 164, 166]", note: "Daiso 在 Lotte Mart 內 [cite: 162]", link: "Lotte Premium Outlet Dongbusan" },
      { time: "18:00", title: "晚餐：西面烤肉推薦", type: "food", detail: "Godeban (肉厚環境好)、釜山宅 (烤熟才上桌)、河南豬肉家 [cite: 184, 185, 186]", note: "Object 西面店尋找雪納瑞精品 [cite: 176]", link: "Busandaek Seomyeon" }
    ]
  },
  {
    day: 5, title: "最終採買與移師首爾",
    items: [
      { time: "10:30", title: "NC百貨 (西面)", type: "shop", detail: "Modern House (寵物用品)、Shoopen (平價鞋)、Butter Shop [cite: 198, 200, 199]", note: "3/4樓童裝 Milky、Indi Brand Kids [cite: 201]", link: "NC Department Store Seomyeon" },
      { time: "14:00", title: "搭乘 KTX 前往首爾", type: "transport", detail: "釜山 -> 首爾，車程約 3 小時 [cite: 211]", note: "點心：三珍魚板買上車吃 [cite: 212]", link: "Busan Station KTX" },
      { time: "18:30", title: "晚餐：弘大商圈", type: "food", detail: "豬腳小姐 (蒜味有名)、弘益碳烤排骨、兔子停 [cite: 226, 227, 228]", note: "Object 弘大總店、Sangsang Madang 尋寶 [cite: 218, 219]", link: "Myth Jokbal Hongdae" }
    ]
  },
  {
    day: 6, title: "一日遊與東大門",
    items: [
      { time: "07:20", title: "江原道一日遊出發", type: "spot", detail: "Eobi冰谷、草泥馬、南怡島 [cite: 234]", note: "集合點 DDP，清晨極冷請搭計程車 [cite: 231]", link: "Alpaca World" },
      { time: "19:00", title: "晚餐：東大門一隻雞", type: "food", detail: "陳玉華一隻雞、孔陵一隻雞、校村炸雞 [cite: 249, 250, 251]", note: "DDP Design Store 找設計師動物擺飾 [cite: 246]", link: "Jin Ok-hwa Original Chicken Restaurant" }
    ]
  },
  {
    day: 7, title: "廣藏市場與歸途",
    items: [
      { time: "10:20", title: "廣藏市場美食", type: "food", detail: "順熙家綠豆煎餅、母女麻藥飯捲、糯米麻花捲 [cite: 256]", note: "拍棉被山和煎餅山 [cite: 257]", link: "Gwangjang Market" },
      { time: "13:30", title: "教保文庫 (光化門)", type: "shop", detail: "全韓最大書店，Hottracks 尋找雪納瑞周邊 [cite: 261]", link: "Kyobo Book Centre Gwanghwamun" },
      { time: "17:00", title: "金浦 Lotte Mall", type: "shop", detail: "Muji、Artbox、ABC Mart 最終補貨 [cite: 268, 270]", note: "晚餐：議政府部隊鍋 (有不辣兒童餐) [cite: 272]", link: "Lotte Mall Gimpo Airport" }
    ]
  }
];
