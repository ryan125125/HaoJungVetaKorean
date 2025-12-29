
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  List, 
  Dog, 
  Camera, 
  Map as MapIcon, 
  Info, 
  Wallet,
  Calendar,
  Share2,
  Trash2
} from 'lucide-react';
import { ITINERARY_DATA, CATEGORIES } from './constants';
import { ItineraryItem as ItemType } from './types';

const ItineraryCard: React.FC<{
  item: ItemType;
  index: number;
  activeDay: number;
  expenseValue: string;
  onExpenseChange: (value: string) => void;
}> = ({ item, index, activeDay, expenseValue, onExpenseChange }) => {
  const cat = CATEGORIES[item.type];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative group"
    >
      <div 
        className="bg-[#141416]/70 border border-[#28282d]/80 backdrop-blur-xl rounded-[2rem] p-6 transition-all duration-300 active:scale-[0.98] border-l-4 hover:bg-[#141416]/90 shadow-lg shadow-black/20" 
        style={{ borderLeftColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] px-3 py-1 rounded-full border font-medium ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 self-center bg-zinc-800/50 px-2 py-0.5 rounded-md">
              {item.time}
            </span>
          </div>
          <a 
            href={`https://map.naver.com/v5/search/${encodeURIComponent(item.link)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all shadow-lg active:scale-90"
          >
            <MapIcon className="w-4 h-4 text-white" />
          </a>
        </div>

        <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
        <div className="space-y-3">
          <p className="text-sm text-zinc-400 leading-relaxed font-light">{item.detail}</p>
          {item.note && (
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-zinc-600 mt-1 flex-shrink-0" />
                <span className="text-xs text-zinc-500 italic leading-snug">{item.note}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-800/50 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-zinc-800/50 flex-grow focus-within:border-zinc-500 transition-colors">
            <Wallet className="w-3 h-3 text-zinc-600" />
            <input 
              type="number" 
              inputMode="numeric"
              placeholder="記錄支出 (KRW)" 
              value={expenseValue}
              onChange={(e) => onExpenseChange(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-zinc-700 font-mono" 
            />
          </div>
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">KRW</span>
        </div>
      </div>
    </motion.div>
  );
};

const TravelApp: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [expenses, setExpenses] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('maru-trip-expenses');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('maru-trip-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleExpenseChange = (id: string, value: string) => {
    setExpenses(prev => ({ ...prev, [id]: value }));
  };

  const clearExpenses = () => {
    if (window.confirm("確定要清除所有支出紀錄嗎？")) {
      setExpenses({});
      localStorage.removeItem('maru-trip-expenses');
    }
  };

  const dayTotal = useMemo(() => {
    return Object.entries(expenses)
      .filter(([key]) => key.startsWith(`day${activeDay}-`))
      .reduce((sum: number, [_, val]) => sum + (Number(val) || 0), 0);
  }, [expenses, activeDay]);

  const grandTotal = useMemo(() => {
    return Object.values(expenses).reduce((sum: number, val) => sum + (Number(val) || 0), 0);
  }, [expenses]);

  const currentDayData = useMemo(() => 
    ITINERARY_DATA.find(i => i.day === activeDay) || ITINERARY_DATA[0]
  , [activeDay]);

  return (
    <div className="w-full h-screen bg-[#050505] text-[#a1a1aa] font-sans overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-md h-full relative flex flex-col shadow-2xl bg-[#050505]">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl px-6 pt-8 pb-6 border-b border-zinc-900">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tighter text-white italic">
                  MARU TRIP <span className="text-zinc-500 font-light text-sm ml-1">25</span>
                </h1>
              </div>
              <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] mt-1 font-medium">Busan & Seoul Quest</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[10px] text-zinc-500 uppercase mb-1 font-semibold tracking-tighter">Total Spent</p>
              <p className="text-lg font-mono text-white leading-none">₩{grandTotal.toLocaleString()}</p>
            </div>
          </div>
        </header>

        {/* Day Nav */}
        <div className="flex-none bg-[#050505]">
            <div className="flex space-x-3 px-6 py-5 overflow-x-auto no-scrollbar">
            {ITINERARY_DATA.map(d => (
                <button 
                key={d.day} 
                onClick={() => setActiveDay(d.day)}
                className={`flex-shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${
                    activeDay === d.day 
                    ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/30'
                }`}
                >
                <span className="text-[10px] font-bold">D{d.day}</span>
                <span className="text-[8px] mt-0.5 opacity-60 font-medium">DAY</span>
                </button>
            ))}
            </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-5 pb-36 no-scrollbar">
            <div className="flex justify-between items-center mb-6 bg-zinc-900/20 p-4 rounded-[1.5rem] border border-zinc-800/30 backdrop-blur-sm sticky top-2 z-10 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-white leading-tight">Day {activeDay}</h2>
                    <p className="text-[10px] text-zinc-500 mt-0.5 truncate max-w-[140px] font-medium">{currentDayData.title}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                  <p className="text-[9px] text-zinc-500 uppercase font-semibold">Day Budget</p>
                  <p className="text-sm font-mono text-zinc-200">₩{dayTotal.toLocaleString()}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                  key={activeDay} 
                  initial={{ opacity: 0, x: 5 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.2 }} 
                  className="space-y-5"
              >
                  {currentDayData.items.map((item, idx) => (
                      <ItineraryCard 
                        key={`${activeDay}-${idx}`}
                        item={item}
                        index={idx}
                        activeDay={activeDay}
                        expenseValue={expenses[`day${activeDay}-${idx}`] || ''}
                        onExpenseChange={(val) => handleExpenseChange(`day${activeDay}-${idx}`, val)}
                      />
                  ))}
              </motion.div>
            </AnimatePresence>

            {/* Clear Data Button */}
            {grandTotal > 0 && (
              <button 
                onClick={clearExpenses}
                className="mt-12 mb-4 w-full py-4 border border-zinc-900 rounded-3xl flex items-center justify-center gap-2 text-zinc-700 hover:text-red-900 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Clear Trip Data</span>
              </button>
            )}
        </main>

        {/* Floating Nav */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 px-6 pointer-events-none z-[100]">
          <nav className="pointer-events-auto h-18 bg-[#141416]/90 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-around px-2 w-full max-w-[320px] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
              <button className="flex flex-col items-center p-4 text-zinc-500 hover:text-white transition-colors group active:scale-75">
                  <List className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="relative">
                <div 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center -translate-y-8 shadow-[0_10px_30px_rgba(255,255,255,0.3)] border-[6px] border-[#050505] cursor-pointer hover:scale-110 active:scale-90 transition-all group"
                >
                    <Dog className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
                </div>
              </div>

              <button 
                onClick={() => alert("準備拍照記錄 Maru 的瞬間！")}
                className="flex flex-col items-center p-4 text-zinc-500 hover:text-white transition-colors group active:scale-75"
              >
                  <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TravelApp;
