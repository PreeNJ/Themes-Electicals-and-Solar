{/* 1. Header Button (line ~166) */}
<button
  onClick={onOpenAIAdvisor}
  className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-blue-900 text-white hover:bg-blue-800 rounded-lg text-xs font-semibold shadow-xs transition-colors border border-blue-700"
  id="ai-advisor-header-btn"
>
  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
  <span>Chat Bot Advisor</span>
</button>

{/* 2. Sub-navigation Bar Link (line ~377) */}
<button
  onClick={onOpenAIAdvisor}
  className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors text-[11px]"
>
  <HelpCircle className="w-3.5 h-3.5 text-red-400" />
  <span>Need Technical Advice? Ask Chat Bot</span>
</button>

{/* 3. Mobile Navigation Drawer Button (line ~449) */}
<button
  onClick={() => {
    onOpenAIAdvisor();
    setMobileMenuOpen(false);
  }}
  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md"
>
  <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
  <span>Chat Bot Advisor</span>
</button>