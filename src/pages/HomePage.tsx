import { Search, MapPin, ChevronDown, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function HomePage() {
  const { pets, isLoading, favorites, toggleFavorite } = useAppContext();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 p-2 rounded-xl">
              <MapPin className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">地點</p>
              <p className="text-sm font-bold flex items-center gap-1">
                紐約市 <ChevronDown className="h-4 w-4 text-slate-400" />
              </p>
            </div>
          </div>
          <Link to="/profile" className="h-10 w-10 rounded-full border-2 border-orange-50 overflow-hidden">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3IAsmwsLlr-7Mpg6qzPhcq3Ot1EmHBCyyKnz8d_SqeRZFbRShnRBBFHBfndAOv4PFOvvsmHpjegLJhMfgu9qwkCUa41z3Y40XiB0ezDl2Fe3AauatQwF3EoWmvani0PXgxwF8pvTcopFLcsrcF59iYIZF0Dn13gsEOEU8f3McrAKh6BX24ouNyD4GGZb5vVFvAuJ6C2XjB2KSTt0QhqbWKpolGmQfte4RLQMrq1R5cdtMx4-FjF5L4cAe5GvVOwZnc1e268i5vA"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            className="block w-full pl-10 pr-3 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-orange-500 focus:bg-white transition-all outline-none" 
            placeholder="搜尋寵物..." 
            type="text" 
          />
        </div>
      </header>

      <main className="px-5 mt-6 space-y-8">
        {/* Hero Banner */}
        <section className="relative bg-orange-500 rounded-xl overflow-hidden h-40 flex items-center px-6">
          <div className="z-10 w-2/3">
            <h1 className="text-white text-xl font-extrabold leading-tight mb-2">尋找您的新夥伴</h1>
            <button className="bg-white text-orange-500 text-xs font-bold px-4 py-2 rounded-full shadow-lg">立即領養</button>
          </div>
          <img 
            alt="黃金獵犬" 
            className="absolute right-[-20px] bottom-[-10px] h-44 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANgVJGWi_Vf6bC4TaPx_KJfk0XlrNP7L0l0YfTRs_YECRq1m7NMfGAsyBL4Zz671GY0cPxpV6D881sWdZk7WtlXO3igApoOhOF6WtTCw8I0Q5xSU8AvHR_sbuZOI5X8KxyxdB0yrrf9vex5VKWYQma_04Rgr1nzA3wYSj8Ad9GFrM8a00tf0R2BUNctlYqTDgSqq7jdWHR10Fkepb4A4pDlRDEzYFFZD1-NNS8kJdFAGfxEA0L47LpiTJcEup5aLQb0Rs6_p2wyg"
            referrerPolicy="no-referrer"
          />
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-slate-800">分類</h2>
            <button className="text-xs font-semibold text-orange-500">查看全部</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {[
              { icon: '🐕', label: '狗狗' },
              { icon: '🐈', label: '貓咪' },
              { icon: '✨', label: '其他' }
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[72px]">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center hover:bg-orange-50 hover:border-orange-500 transition-colors cursor-pointer group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pet Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-slate-800">附近的寵物</h2>
            <button className="text-xs font-semibold text-orange-500">查看全部</button>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 pointer-events-none">
              <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">載入中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {pets.map((pet) => (
                <Link 
                  key={pet.id} 
                  to={`/pet/${pet.id}`}
                  className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 relative block"
                >
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(pet.id);
                    }}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors ${favorites.includes(pet.id) ? 'text-orange-500' : 'text-slate-400'}`} 
                      fill={favorites.includes(pet.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <div className="aspect-square w-full mb-3 rounded-xl overflow-hidden">
                    <img 
                      alt={pet.name} 
                      className="w-full h-full object-cover" 
                      src={pet.image}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-slate-800">{pet.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-500">{pet.breed}</p>
                    <p className="text-xs font-bold text-slate-800">{pet.age}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
