import { ChevronLeft, Settings, Camera, MapPin, ChevronRight, User, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { pets, favorites, adoptionRequests } = useAppContext();

  const favoritePets = pets.filter(pet => favorites.includes(pet.id));

  return (
    <div className="bg-orange-50/30 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">個人資料</h1>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <Settings className="h-6 w-6" />
        </button>
      </header>

      <main className="max-w-md mx-auto">
        {/* User Info */}
        <section className="px-6 pt-8 pb-6 flex flex-col items-center text-center bg-white mb-2 shadow-sm">
          <div className="relative mb-4">
            <img 
              alt="Jane Doe" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg ring-1 ring-slate-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNMoCWHHGrtaAHr5xaMRZuuGWAySDmxCUJlVvl6DfQfkn8vi371U2Z5L_BLksT2m9VRZp1r3ML4bujXkxx0NYQA2LnJNNUdp3y2Lx8kakJ0DW0d9Bbi-wd4FzuPl5R8OsX5lkn6yYGUu14gWV1cudtuX0jTxoGymF7CwpU1JJvL5sZ8A5A3VwgnQAgchnHOE8V2s3aZfBxPjWWQs7BQyL0GFgJEQ74M_kSp9q8X57kTDQvrqYB7R0MVu-WyzDKORAvTdqgOgwmLA"
              referrerPolicy="no-referrer"
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-md">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Jane Doe</h2>
          <div className="flex items-center text-slate-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">舊金山</span>
          </div>
        </section>

        {/* Adoption Requests */}
        <section className="mt-4 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">我的領養申請</h3>
            <button className="text-orange-500 text-sm font-semibold">查看全部</button>
          </div>
          <div className="space-y-3">
            {adoptionRequests.length === 0 ? (
              <div className="bg-white p-6 rounded-xl text-center border border-dashed border-slate-200">
                <p className="text-sm text-slate-400">尚無領養申請</p>
              </div>
            ) : (
              adoptionRequests.map((req) => (
                <div key={req.id} className="bg-white p-3 rounded-xl shadow-sm flex items-center border border-slate-50">
                  <img 
                    alt={req.petName} 
                    className="w-16 h-16 rounded-lg object-cover" 
                    src={req.petImage}
                    referrerPolicy="no-referrer"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-slate-800">{req.petName} ({req.petBreed})</h4>
                    <p className="text-xs text-slate-400">申請日期 {req.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                      req.status === '已通過' ? 'bg-green-100 text-green-700' : 
                      req.status === '已拒絕' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Favorite Pets */}
        <section className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">收藏寵物</h3>
            <button 
              onClick={() => navigate('/favorites')}
              className="text-orange-500 text-sm font-semibold"
            >
              查看全部
            </button>
          </div>
          {favoritePets.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-dashed border-slate-200">
              <p className="text-sm text-slate-400">尚無收藏寵物</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {favoritePets.slice(0, 3).map((pet) => (
                <div 
                  key={pet.id} 
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => navigate(`/pet/${pet.id}`)}
                >
                  <img 
                    alt={pet.name} 
                    className="w-full h-full object-cover rounded-xl" 
                    src={pet.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 rounded-xl group-hover:bg-black/0 transition-colors"></div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Settings */}
        <section className="mt-8 px-6 space-y-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">設定與支援</h3>
          <button className="w-full flex items-center p-4 bg-white rounded-xl border border-slate-50 shadow-sm active:bg-slate-50 transition-colors">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-500 mr-4">
              <User className="h-5 w-5" />
            </div>
            <span className="flex-1 font-semibold text-slate-700 text-left">帳戶設定</span>
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
          <button className="w-full flex items-center p-4 bg-white rounded-xl border border-slate-50 shadow-sm active:bg-slate-50 transition-colors">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-500 mr-4">
              <HelpCircle className="h-5 w-5" />
            </div>
            <span className="flex-1 font-semibold text-slate-700 text-left">幫助與支援</span>
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
          <button className="w-full flex items-center p-4 bg-white rounded-xl border border-slate-50 shadow-sm text-red-500 active:bg-red-50 transition-colors mt-4">
            <div className="bg-red-50 p-2 rounded-lg mr-4">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="flex-1 font-semibold text-left">登出</span>
          </button>
        </section>
      </main>
    </div>
  );
}
