import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Zap, 
  User, 
  Lightbulb
} from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
initialContext
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! Jambo! 👋 I am your **Chat Bot Advisor** at **Themes Electricals**.

With **15 years of industry experience**, how can I assist your setup today? You can ask me about:
• Sizing solar systems, hybrid inverters & LiFePO4 batteries
• Solar water pumps for deep boreholes & farming
• Solar street lights (All-in-One & Split)
• Power back up generators (Diesel / Petrol / ATS)
• Air source & solar heat pumps
• FREE delivery around Nairobi CBD or showroom pickup in Utawala Jowin Business Arcade!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext && isOpen) {
      const contextMsg = `I am reviewing my solar sizing calculation:
• Recommended Inverter: ${initialContext.recommendedInverterName || 'Hybrid Inverter'}
• Solar Array: ${initialContext.recommendedPanelWatts || '3300'} Wp
• Battery Storage: ${initialContext.recommendedBatteryModel || '5.12kWh LiFePO4'}
• Estimated Total Cost: KSh ${initialContext.estimatedTotalKES ? initialContext.estimatedTotalKES.toLocaleString() : '325,000'}

Can you verify if this setup is optimal for Kenyan conditions and what warranty comes with Themes Electricals?`;
      
      handleSendMessage(contextMsg);
    }
  }, [isOpen, initialContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: initialContext,
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      const assistantReply = data.reply || "I'd be glad to help size your electrical or solar power system. Please let us know your location and load requirements.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: assistantReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `For immediate technical assistance, please call our engineering desk at **${STORE_INFO.phone}** or email **${STORE_INFO.email}**. Visit us at Utawala Jowin Business Arcade!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "What solar system do I need for a 4-bedroom house with fridge & pump?",
    "What borehole pump is best for an 80m well and farming?",
    "How does a heat pump water heater reduce power bills?",
    "Tell me about delivery to Nairobi CBD and upcountry.",
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs cursor-pointer animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">Themes Electricals Chat Bot Advisor</span>
                <span className="bg-red-600/30 text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/40">
                  15 Years Experience
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Utawala Jowin Business Arcade • Nairobi • 0713317582
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50 text-xs text-slate-800">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isUser && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-red-600 text-white font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 ${
                    isUser
                      ? 'bg-red-600 text-white font-medium rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                  <div
                    className={`text-[10px] ${
                      isUser ? 'text-red-100' : 'text-slate-400'
                    } text-right`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-start">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-2 text-slate-500 text-xs">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-200" />
                <span>Chat Bot Advisor analyzing requirement...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        {messages.length < 3 && (
          <div className="p-3 bg-white border-t border-slate-200 space-y-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-red-600" />
              <span>Suggested Technical Queries:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-left text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-950 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about lighting, solar pumps, street lights, generators, heat pumps..."
              className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-red-600"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
