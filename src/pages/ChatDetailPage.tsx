import { ChevronLeft, Send, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

export default function ChatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, addMessageToChat } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = chats.find(c => c.id === id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  if (!chat) return <div>Chat not found</div>;

  const handleSend = () => {
    if (!inputValue.trim()) return;
    addMessageToChat(chat.id, {
      senderId: 'me',
      senderName: 'Jane Doe',
      content: inputValue,
      isMe: true
    });
    setInputValue('');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <img 
          src={chat.participantAvatar} 
          alt={chat.participantName} 
          className="w-10 h-10 rounded-full object-cover border border-slate-100"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <h1 className="text-sm font-bold text-slate-800">{chat.participantName}</h1>
          <p className="text-[10px] text-green-500 font-medium">在線上</p>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <MoreVertical className="h-5 w-5 text-slate-400" />
        </button>
      </header>

      {/* Messages */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
      >
        {chat.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] space-y-1`}>
              <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.isMe 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
              <p className={`text-[10px] text-slate-400 font-medium ${msg.isMe ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Input */}
      <footer className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <div className="flex-1 relative">
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full pl-4 pr-10 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-orange-500 focus:bg-white transition-all outline-none" 
            placeholder="輸入訊息..." 
            type="text" 
          />
        </div>
        <button 
          onClick={handleSend}
          className="bg-orange-500 text-white p-3 rounded-xl shadow-md active:scale-95 transition-transform"
        >
          <Send className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}
