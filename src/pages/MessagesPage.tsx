import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

export default function MessagesPage() {
  const navigate = useNavigate();
  const { chats, clearUnreadMessages } = useAppContext();

  useEffect(() => {
    clearUnreadMessages();
  }, [clearUnreadMessages]);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">消息</h1>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <main className="max-w-md mx-auto">
        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              className="block w-full pl-10 pr-3 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-orange-500 focus:bg-white transition-all outline-none" 
              placeholder="搜尋對話..." 
              type="text" 
            />
          </div>
        </div>

        {/* Message List */}
        <div className="divide-y divide-slate-50">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="px-6 py-4 flex items-center gap-4 active:bg-slate-50 transition-colors cursor-pointer"
            >
              <img 
                src={chat.participantAvatar} 
                alt={chat.participantName} 
                className="w-14 h-14 rounded-full object-cover border border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-800 truncate">{chat.participantName}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
          
          {/* Mock more messages */}
          <div className="px-6 py-4 flex items-center gap-4 opacity-60">
            <div className="w-14 h-14 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
