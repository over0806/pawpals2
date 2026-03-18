import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Heart, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function BottomNav() {
  const location = useLocation();
  const { hasUnreadMessages } = useAppContext();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-4 flex justify-around items-center z-[100]">
      <Link to="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-orange-500' : 'text-slate-400'}`}>
        <Home className="h-6 w-6" fill={isActive('/') ? 'currentColor' : 'none'} />
        <span className="text-[10px] font-bold uppercase tracking-wider">首頁</span>
      </Link>
      <Link to="/messages" className={`flex flex-col items-center gap-1 transition-colors relative ${isActive('/messages') ? 'text-orange-500' : 'text-slate-400'}`}>
        <div className="relative">
          <MessageCircle className="h-6 w-6" fill={isActive('/messages') ? 'currentColor' : 'none'} />
          {hasUnreadMessages && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">消息</span>
      </Link>
      <Link to="/favorites" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/favorites') ? 'text-orange-500' : 'text-slate-400'}`}>
        <Heart className="h-6 w-6" fill={isActive('/favorites') ? 'currentColor' : 'none'} />
        <span className="text-[10px] font-bold uppercase tracking-wider">收藏</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-orange-500' : 'text-slate-400'}`}>
        <User className="h-6 w-6" fill={isActive('/profile') ? 'currentColor' : 'none'} />
        <span className="text-[10px] font-bold uppercase tracking-wider">個人中心</span>
      </Link>
    </nav>
  );
}
