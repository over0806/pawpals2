import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdoptionRequest, Chat, Message, Pet } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AppContextType {
  pets: Pet[];
  isLoading: boolean;
  adoptionRequests: AdoptionRequest[];
  addAdoptionRequest: (request: Omit<AdoptionRequest, 'id'>) => Promise<boolean>;
  approveAdoptionRequest: (requestId: string) => void;
  chats: Chat[];
  addMessageToChat: (chatId: string, message: Omit<Message, 'id' | 'time'>) => void;
  hasUnreadMessages: boolean;
  clearUnreadMessages: () => void;
  favorites: string[];
  toggleFavorite: (petId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_CHATS: Chat[] = [
  {
    id: 'c1',
    participantName: '爪爪收容所',
    participantAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWlrWyM_lGvQfw_duTdMQ_TEFifOnBvv4DYhKUgsgl7gy0qLrWAUdxYMLPvipMrCHa_C9-HALBU8DYgZTLwxFCvH1PxoTJlPC9m3_QnLPfsygReOjqwRYLR2qZ9Oc1hbau14g9PX3wNoIX6cvjBCZE_qynubKv0anRBZNNsabU7nL1ppQa0jBuL18sQ5kk-rGzOAVb4NSEXld9Kzt_--NpCxZPRkv7li-VMYNspDx0FDTI86p1ky0v17i0UfKq5uVxirwfvexi8g',
    lastMessage: '您好！關於您申請領養 Buddy 的事宜，我們想與您預約面談時間。',
    lastMessageTime: '10:30 AM',
    messages: [
      {
        id: 'm1',
        senderId: 'shelter',
        senderName: '爪爪收容所',
        content: '您好！關於您申請領養 Buddy 的事宜，我們想與您預約面談時間。',
        time: '10:30 AM',
        isMe: false
      }
    ]
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch Pets
      const { data: petsData, error: petsError } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      if (petsError) throw petsError;
      setPets(petsData || []);

      // Fetch Adoption Requests
      const { data: reqData, error: reqError } = await supabase
        .from('adoption_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (reqError) throw reqError;
      
      const mappedRequests = (reqData || []).map((req: any) => ({
        id: req.id,
        petId: req.pet_id,
        petName: req.pet_name,
        petBreed: req.pet_breed,
        petImage: req.pet_image,
        date: req.date,
        status: req.status as AdoptionRequest['status']
      }));
      setAdoptionRequests(mappedRequests);

    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAdoptionRequest = async (requestData: Omit<AdoptionRequest, 'id'>) => {
    // Check for duplicate request
    const isDuplicate = adoptionRequests.find(req => req.petId === requestData.petId);
    if (isDuplicate) {
      alert('您已經提交過對這隻寵物的領養申請了！');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('adoption_requests')
        .insert([
          {
            pet_id: requestData.petId,
            pet_name: requestData.petName,
            pet_breed: requestData.petBreed,
            pet_image: requestData.petImage,
            date: requestData.date,
            status: requestData.status,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase Insert Error:', error);
        throw error;
      }

      if (data && data[0]) {
        const newReq: AdoptionRequest = {
          id: data[0].id,
          petId: data[0].pet_id,
          petName: data[0].pet_name,
          petBreed: data[0].pet_breed,
          petImage: data[0].pet_image,
          date: data[0].date,
          status: data[0].status as AdoptionRequest['status']
        };
        setAdoptionRequests(prev => [newReq, ...prev]);

        // Add confirmation message to chat
        const confirmationMessage: Message = {
          id: `cfm-${Date.now()}`,
          senderId: 'shelter',
          senderName: '爪爪收容所',
          content: `我們已收到您對 ${requestData.petName} 的領養申請！我們的團隊將會進行初步審核，並在 3-5 個工作天內透過此聊天視窗與您聯繫。感謝您的耐心等候！`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        };

        setChats(prevChats => {
          const shelterChat = prevChats.find(c => c.participantName === '爪爪收容所');
          if (shelterChat) {
            setHasUnreadMessages(true);
            return prevChats.map(c => c.id === shelterChat.id ? {
              ...c,
              lastMessage: confirmationMessage.content,
              lastMessageTime: confirmationMessage.time,
              messages: [...c.messages, confirmationMessage]
            } : c);
          }
          return prevChats;
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding adoption request:', error);
      return false;
    }
  };

  const clearUnreadMessages = () => {
    setHasUnreadMessages(false);
  };

  const toggleFavorite = (petId: string) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId) 
        : [...prev, petId]
    );
  };

  const approveAdoptionRequest = (requestId: string) => {
    const request = adoptionRequests.find(r => r.id === requestId);
    if (!request) return;

    // TODO: Update status in Supabase if needed
    setAdoptionRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: '已通過' } : req
    ));

    const newMessage: Message = {
      id: `sys-${Date.now()}`,
      senderId: 'system',
      senderName: '系統通知',
      content: `恭喜！您對 ${request.petName} 的領養申請已通過審核。請查看您的消息以獲取後續步驟。`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false
    };

    setChats(prevChats => {
      const shelterChat = prevChats.find(c => c.participantName === '爪爪收容所');
      if (shelterChat) {
        setHasUnreadMessages(true);
        return prevChats.map(c => c.id === shelterChat.id ? {
          ...c,
          lastMessage: newMessage.content,
          lastMessageTime: newMessage.time,
          messages: [...c.messages, newMessage]
        } : c);
      }
      return prevChats;
    });
  };

  const addMessageToChat = (chatId: string, msgData: Omit<Message, 'id' | 'time'>) => {
    const newMessage: Message = {
      ...msgData,
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        if (!newMessage.isMe) {
          setHasUnreadMessages(true);
        }
        return {
          ...chat,
          lastMessage: newMessage.content,
          lastMessageTime: newMessage.time,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      pets,
      isLoading,
      adoptionRequests, 
      addAdoptionRequest, 
      approveAdoptionRequest, 
      chats, 
      addMessageToChat, 
      hasUnreadMessages, 
      clearUnreadMessages,
      favorites,
      toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
