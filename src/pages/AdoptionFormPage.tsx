import { ChevronLeft, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function AdoptionFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pets, addAdoptionRequest, isLoading } = useAppContext();
  const pet = pets.find(p => p.id === id);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    hasPets: '',
    housingType: '',
    motivation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = '請填寫姓名';
      if (!formData.email.trim()) {
        newErrors.email = '請填寫電子郵件';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '請填寫有效的電子郵件格式';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = '請填寫電話號碼';
      } else if (!/^09\d{2}-?\d{3}-?\d{3}$/.test(formData.phone)) {
        newErrors.phone = '請填寫正確的台灣手機格式 (09xx-xxx-xxx)';
      }
      if (!formData.address.trim()) newErrors.address = '請填寫住址';
    } else if (step === 2) {
      if (!formData.hasPets) newErrors.hasPets = '請選擇是否有養其他寵物';
      if (!formData.housingType) newErrors.housingType = '請選擇住房類型';
    } else if (step === 3) {
      if (!formData.motivation.trim()) {
        newErrors.motivation = '請填寫領養動機';
      } else if (formData.motivation.trim().length < 10) {
        newErrors.motivation = '動機字數需至少 10 個字';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, name, value } = e.target;
    const fieldName = id || name;
    
    // Convert snake_case or kebab-case to camelCase for state
    const stateKey = fieldName.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase()) as keyof typeof formData;
    
    setFormData(prev => ({ ...prev, [stateKey]: value }));
    // Clear error when user starts typing
    if (errors[stateKey]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[stateKey];
        return next;
      });
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      if (pet) {
        setIsSubmitting(true);
        const success = await addAdoptionRequest({
          petId: pet.id,
          petName: pet.name,
          petBreed: pet.breed,
          petImage: pet.image,
          date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: '審核中'
        });
        setIsSubmitting(false);

        if (success) {
          alert('申請已送出！我們將儘快與您聯繫。');
          navigate('/profile');
        } else {
          alert('提交申請時發生錯誤，請稍後再試。');
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

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
        <p className="text-slate-500 mb-6">抱歉，我們找不到該寵物的資訊。</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          返回首頁
        </button>
      </div>
    );
  }

  const stepTitles = ['個人資訊', '居住狀況', '領養動機'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50">
      {/* Header */}
      <header className="w-full max-w-md bg-white px-6 pt-8 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            aria-label="返回" 
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">領養申請</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
            <span>第 {step} 步，共 3 步</span>
            <span>{stepTitles[step - 1]}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '33.33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-orange-500 h-full"
            />
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="w-full max-w-md flex-1 px-6 py-6 pb-24 overflow-hidden">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">聯絡資訊</h2>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="full-name">姓名</label>
                  <input 
                    className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none`} 
                    id="full-name" 
                    placeholder="王小明" 
                    type="text" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">電子郵件</label>
                  <input 
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none`} 
                    id="email" 
                    placeholder="example@email.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="phone">電話號碼</label>
                  <input 
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none`} 
                    id="phone" 
                    placeholder="0912-345-678" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="address">住址</label>
                  <input 
                    className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none`} 
                    id="address" 
                    placeholder="台北市信義區..." 
                    type="text" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">居住狀況</h2>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">您有養其他寵物嗎？</p>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300" 
                        name="has_pets" 
                        type="radio" 
                        value="yes" 
                        checked={formData.hasPets === 'yes'}
                        onChange={handleInputChange}
                      />
                      <span className="ml-2 text-gray-700">有</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300" 
                        name="has_pets" 
                        type="radio" 
                        value="no" 
                        checked={formData.hasPets === 'no'}
                        onChange={handleInputChange}
                      />
                      <span className="ml-2 text-gray-700">沒有</span>
                    </label>
                  </div>
                  {errors.hasPets && <p className="text-xs text-red-500">{errors.hasPets}</p>}
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="housing-type">住房類型</label>
                  <select 
                    className={`w-full px-4 py-3 border ${errors.housingType ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white outline-none`} 
                    id="housing-type" 
                    value={formData.housingType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>請選擇</option>
                    <option value="apartment">公寓</option>
                    <option value="house">獨棟房屋</option>
                    <option value="condo">大樓 / 華廈</option>
                    <option value="other">其他</option>
                  </select>
                  {errors.housingType && <p className="text-xs text-red-500 mt-1">{errors.housingType}</p>}
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">領養動機</h2>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="motivation">您為什麼想領養這隻寵物？</label>
                  <textarea 
                    className={`w-full px-4 py-3 border ${errors.motivation ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none outline-none`} 
                    id="motivation" 
                    placeholder="請告訴我們您的想法...（至少 10 個字）" 
                    rows={6}
                    value={formData.motivation}
                    onChange={handleInputChange}
                  />
                  {errors.motivation && <p className="text-xs text-red-500 mt-1">{errors.motivation}</p>}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </form>
      </main>

      {/* Bottom Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex justify-center z-10">
        <div className="w-full max-w-md">
          <button 
            disabled={isSubmitting}
            onClick={handleNext}
            className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all duration-150 flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              step === 3 ? '送出申請' : '下一步'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
