
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  List, Dog, Camera, Map as MapIcon, Info, Wallet, Calendar, Trash2 
} from 'lucide-react';

// --- Types ---
type CategoryType = 'food' | 'spot' | 'shop' | 'transport';
interface ItineraryItem {
  time: string; title: string; type: CategoryType; detail: string; note?: string; link: string;
}
interface DayItinerary {
  day: number; title: string; items: ItineraryItem[];
}
const CATEGORIES: Record<CategoryType, { label: string; color: string }> = {
  food: { label: "餐飲推薦", color: "text-orange-400 bg-orange-400/5 border-orange-400/20" },
  spot: { label: "景點活動", color: "text-emerald-400 bg-emerald-400/5 border-emerald-400/20" },
  shop: { label: "購物尋寶", color: "text-purple-400 bg-purple-400/5 border-purple-400/20" },
  transport: { label: "交通方式", color: "text-blue-400 bg-blue-400/5 border-blue-400/20" }
};

// --- Data ---
const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1, title: "抵達釜山與西面探索",
    items: [
      { time: "18:25", title: "抵達釜山機場", type: "transport", detail: "入境後先在機場便利商店儲值 T-Money 卡", note: "計程車：預估 ₩18,000，給司機看：부산진구 서면로 20", link: "Gimhae International Airport" },
      { time: "20:45", title: "晚餐：西面湯飯/烤肉", type: "food", detail: "松亭3代豬肉湯飯、味贊王鹽烤肉", note: "構圖建議：特寫湯滾燙時舀起滿滿的肉", link: "Songjeong Samdae Gukbap" },
      { time: "21:30", title: "西面逛街 (飯店周邊)", type: "shop", detail: "ARTBOX/DAISO：找 Galapagos Friends 狗狗系列", link: "Seomyeon Artbox" }
    ]
  },
  {
    day: 2, title: "松亭與海雲台海岸之旅",
    items: [
      { time: "08:30", title: "前往青沙浦 (EGG DROP)", type: "food", detail: "西面 EGG DROP 吃早餐", note: "計程車：預估 ₩18,000，看：청사포", link: "Egg Drop Seomyeon" },
      { time: "09:15", title: "青沙浦景點巡禮", type: "spot", detail: "灌籃高手平交道、天空步道、紅白燈塔", link: "Cheongsapo Daritdol Observatory" },
      { time: "13:00", title: "天空膠囊列車", type: "transport", detail: "青沙浦 -> 尾浦，需預約", link: "Blue Line Park Mipo" },
      { time: "14:15", title: "SEA LIFE 水族館", type: "spot", detail: "美人魚秀 15:30、鯊魚餵食秀 16:00", note: "在此啟用 VISIT BUSAN PASS", link: "Sea Life Busan Aquarium" },
      { time: "17:30", title: "晚餐：廣安木 海雲台店", type: "food", detail: "厚切熟成五花肉，專人代烤", link: "Gwang-an-mok" },
      { time: "20:30", title: "Club D Oasis 汗蒸幕", type: "spot", detail: "洗澡後喝甜米釀、吃烤蛋", link: "Club D Oasis" }
    ]
  },
  {
    day: 3, title: "甘川、松島與南浦洞",
    items: [
      { time: "09:30", title: "甘川洞文化村", type: "spot", detail: "必拍小王子背影。買貓咪造型吐司", link: "Gamcheon Culture Village" },
      { time: "13:30", title: "松島海上纜車", type: "spot", detail: "水晶車廂 (VBP)。龍宮雲橋連接無人島", link: "Songdo Marine Cable Car" },
      { time: "16:00", title: "電影博物館 + Trick Eye", type: "spot", detail: "3D 美術館，適合家庭拍照", link: "Busan Museum of Movies" },
      { time: "18:00", title: "南浦洞晚餐", type: "food", detail: "南浦蔘雞湯、味贊王、香港飯店0410", link: "Nampo-dong Street" }
    ]
  },
  {
    day: 4, title: "機張、Outlet 與西面",
    items: [
      { time: "10:00", title: "Skyline Luge", type: "spot", detail: "斜坡滑車體驗 (VBP)", link: "Skyline Luge Busan" },
      { time: "11:15", title: "樂天世界", type: "spot", detail: "14:00 花車巡遊", link: "Lotte World Busan" },
      { time: "14:00", title: "Lotte Outlet", type: "shop", detail: "Daiso 在 Lotte Mart 內", link: "Lotte Premium Outlet Dongbusan" },
      { time: "18:00", title: "晚餐：西面烤肉", type: "food", detail: "釜山宅 (烤熟才上桌)", link: "Busandaek Seomyeon" }
    ]
  },
  {
    day: 5, title: "最終採買與移師首爾",
    items: [
      { time: "10:30", title: "NC百貨 (西面)", type: "shop", detail: "Modern House (寵物用品)、Shoopen", link: "NC Department Store Seomyeon" },
      { time: "14:00", title: "搭乘 KTX 前往首爾", type: "transport", detail: "車程約 3 小時", link: "Busan Station KTX" },
      { time: "18:30", title: "晚餐：弘大商圈", type: "food", detail: "豬腳小姐 (蒜味有名)", link: "Myth Jokbal Hongdae" }
    ]
  },
  {
    day: 6, title: "一日遊與東大門",
    items: [
      { time: "07:20", title: "江原道一日遊出發", type: "spot", detail: "Eobi冰谷、草泥馬、南怡島", link: "Alpaca World" },
      { time: "19:00", title: "晚餐：東大門一隻雞", type: "food", detail: "陳玉華一隻雞、校村炸雞", link: "Jin Ok-hwa Original Chicken Restaurant" }
    ]
  },
  {
    day: 7, title: "廣藏市場與歸途",
    items: [
      { time: "10:20", title: "廣藏市場美食", type: "food", detail: "綠豆煎餅、麻藥飯捲", link: "Gwangjang Market" },
      { time: "13:30", title: "教保文庫 (光化門)", type: "shop", detail: "Hottracks 尋找雪納瑞周邊", link: "Kyobo Book Centre Gwanghwamun" },
      { time: "17:00", title: "金浦 Lotte Mall", type: "shop", detail: "最終補貨與晚餐", link: "Lotte Mall Gimpo Airport" }
    ]
  }
];

// --- Components ---
const ItineraryCard = ({ item, index, expenseValue, onExpenseChange }) => {
  const cat = CATEGORIES[item.type];
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="relative">
      <div className="bg-[#141416]/70 border border-[#28282d]/80 backdrop-blur-xl rounded-[2rem] p-6 mb-4 border-l-4" style={{ borderLeftColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <span className={`text-[10px] px-3 py-1 rounded-full border font-medium ${cat.color}`}>{cat.label}</span>
            <span className="text-[11px] font-mono text-zinc-500 self-center bg-zinc-800/50 px-2 py-0.5 rounded-md">{item.time}</span>
          </div>
          <a href={`https://map.naver.com/v5/search/${encodeURIComponent(item.link)}`} target="_blank" className="p-2.5 bg-zinc-800 rounded-2xl active:scale-90"><MapIcon className="w-4 h-4 text-white" /></a>
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
        <p className="text-sm text-zinc-400 mb-4">{item.detail}</p>
        <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-zinc-800/50 flex-grow">
            <Wallet className="w-3 h-3 text-zinc-600" />
            <input type="number" placeholder="記錄支出 (KRW)" value={expenseValue} onChange={(e) => onExpenseChange(e.target.value)} className="bg-transparent text-xs text-white focus:outline-none w-full font-mono" />
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">KRW</span>
        </div>
      </div>
    </motion.div>
  );
};

const TravelApp = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [expenses, setExpenses] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('maru-trip-expenses') || '{}');
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('maru-trip-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const grandTotal = useMemo(() => 
    Object.values(expenses).reduce((s: number, v: string) => s + (Number(v) || 0), 0)
  , [expenses]);

  const currentDayData = ITINERARY_DATA.find(i => i.day === activeDay);

  return (
    <div className="w-full h-screen bg-[#050505] text-[#a1a1aa] flex flex-col items-center">
      <div className="w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <header className="px-6 pt-8 pb-6 border-b border-zinc-900 bg-[#050505]/80 backdrop-blur-xl z-20">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-bold text-white italic">MARU TRIP <span className="text-zinc-500 font-light ml-1 text-sm">25</span></h1>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase">Total Spent</p>
              <p className="text-lg font-mono text-white leading-none">₩{grandTotal.toLocaleString()}</p>
            </div>
          </div>
        </header>

        <div className="flex space-x-3 px-6 py-5 overflow-x-auto no-scrollbar">
          {ITINERARY_DATA.map(d => (
            <button key={d.day} onClick={() => setActiveDay(d.day)} className={`flex-shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${activeDay === d.day ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-zinc-900/40 text-zinc-500 hover:bg-zinc-800/50'}`}>
              <span className="text-[10px] font-bold">D{d.day}</span>
              <span className="text-[8px] opacity-60 font-medium">DAY</span>
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto px-5 pb-36 no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div key={activeDay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {currentDayData?.items.map((item, idx) => (
                <ItineraryCard 
                  key={`${activeDay}-${idx}`} 
                  item={item} 
                  index={idx} 
                  expenseValue={expenses[`day${activeDay}-${idx}`] || ''} 
                  onExpenseChange={(val) => setExpenses(prev => ({ ...prev, [`day${activeDay}-${idx}`]: val }))} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 px-6 pointer-events-none z-[100]">
          <nav className="pointer-events-auto h-18 bg-[#141416]/90 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-around px-2 w-full max-w-[320px] border border-white/10 shadow-2xl">
            <button className="p-4 text-zinc-500 active:text-white"><List className="w-5 h-5" /></button>
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-14 h-14 bg-white rounded-full flex items-center justify-center -translate-y-8 shadow-xl border-[6px] border-[#050505] active:scale-95 transition-all cursor-pointer"><Dog className="w-6 h-6 text-black" /></div>
            <button className="p-4 text-zinc-500 active:text-white"><Camera className="w-5 h-5" /></button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TravelApp />);
}
