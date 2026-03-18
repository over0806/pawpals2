import { ChevronLeft, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { pets, favorites, toggleFavorite, isLoading } = useAppContext();

  const favoritePets = pets.filter(pet => favorites.includes(pet.id));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">載入中...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">收藏寵物</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="max-w-md mx-auto px-6 py-6">
        {favoritePets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">尚無收藏</h3>
            <p className="text-sm text-slate-400 max-w-[200px]">
              快去探索並收藏您喜歡的小動物吧！
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform"
            >
              去逛逛
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favoritePets.map((pet) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={pet.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 group cursor-pointer"
                onClick={() => navigate(`/pet/${pet.id}`)}
              >
                <div className="relative aspect-square">
                  <img 
                    src={pet.image} 
                    alt={pet.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pet.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-orange-500 shadow-sm"
                  >
                    <Heart className="h-4 w-4" fill="currentColor" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800">{pet.name}</h3>
                  <p className="text-xs text-slate-400">{pet.breed}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
