import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, isLoading, favorites, toggleFavorite } = useAppContext();
  
  const pet = pets.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">載入中...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">找不到寵物</h2>
        <p className="text-slate-500 mb-6">抱歉，我們找不到您正在尋找的寵物資訊。</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          返回首頁
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(pet.id);

  return (
    <div className="max-w-md mx-auto min-h-screen relative pb-24 bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full">
        <img 
          alt={pet.name} 
          className="w-full h-full object-cover" 
          src={pet.image}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl text-white">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Content Body */}
      <main className="bg-white -mt-8 relative rounded-t-[32px] p-6 space-y-8 shadow-xl">
        {/* Identity */}
        <section>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{pet.name}</h1>
              <p className="text-slate-500 font-medium">{pet.location}</p>
            </div>
            <button 
              onClick={() => toggleFavorite(pet.id)}
              className={`p-3 rounded-xl transition-colors ${isFavorite ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}
            >
              <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">年齡</p>
              <p className="font-bold text-slate-800">{pet.age}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">品種</p>
              <p className="font-bold text-slate-800">{pet.breed}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">性別</p>
              <p className="font-bold text-slate-800">{pet.gender}</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">數值</h2>
          <div className="space-y-3">
            {[
              { label: '精力', value: pet.energy, text: pet.energy > 80 ? '高' : '中' },
              { label: '活潑度', value: pet.playfulness, text: pet.playfulness > 90 ? '非常活潑' : '活潑' },
              { label: '訓練程度', value: pet.training, text: pet.training > 60 ? '進階' : '基礎' }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{stat.label}</span>
                  <span className="text-orange-500">{stat.text}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-orange-500 h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">關於 {pet.name}</h2>
          <p className="text-slate-600 leading-relaxed">
            {pet.description}
          </p>
        </section>

        {/* Location */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">地點</h2>
            <button className="text-orange-500 text-sm font-bold">在地圖上查看</button>
          </div>
          <div className="relative w-full h-40 rounded-xl overflow-hidden">
            <img 
              alt="Map preview" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWlrWyM_lGvQfw_duTdMQ_TEFifOnBvv4DYhKUgsgl7gy0qLrWAUdxYMLPvipMrCHa_C9-HALBU8DYgZTLwxFCvH1PxoTJlPC9m3_QnLPfsygReOjqwRYLR2qZ9Oc1hbau14g9PX3wNoIX6cvjBCZE_qynubKv0anRBZNNsabU7nL1ppQa0jBuL18sQ5kk-rGzOAVb4NSEXld9Kzt_--NpCxZPRkv7li-VMYNspDx0FDTI86p1ky0v17i0UfKq5uVxirwfvexi8g"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <p className="text-xs font-bold text-slate-700">{pet.shelter}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] max-w-md mx-auto">
        <Link 
          to={`/adopt/${pet.id}`}
          className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] transform flex items-center justify-center"
        >
          領養我
        </Link>
      </div>
    </div>
  );
}
