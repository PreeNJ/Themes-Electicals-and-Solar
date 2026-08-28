// 1. Initial Greeting (line ~36)
text: `Hello! Jambo! 👋 I am your **Chat Bot Advisor** at **Themes Electricals**.

With **15 years of industry experience**, how can I assist your setup today? You can ask me about:
• Sizing solar systems, hybrid inverters & LiFePO4 batteries
• Solar water pumps for deep boreholes & farming
• Solar street lights (All-In-One & Split)
• Generators (Diesel & Petrol backup)
• Heat pumps for energy-efficient water heating`,

// 2. Modal Header Title (line ~155)
<span className="font-extrabold text-sm text-white">Themes Electricals Chat Bot Advisor</span>

// 3. Messages List - User avatar only, bot icon removed (line ~180)
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
            ? 'bg-blue-900 text-white rounded-tr-xs text-xs sm:text-sm font-medium'
            : 'bg-white text-slate-800 rounded-tl-xs shadow-xs border border-slate-100 text-xs sm:text-sm'
        }`}
      >
        <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
        <span className="text-[10px] text-slate-400 block text-right">{msg.timestamp}</span>
      </div>
    </div>
  );
})}