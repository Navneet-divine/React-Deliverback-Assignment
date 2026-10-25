import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { OFFICIAL_RULES, POPULAR_VARIATIONS } from '@/data/rules'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Gift,
  ListOrdered,
  Sparkles,
  Repeat,
  ShieldCheck,
  Trophy,
  Copy,
  Check,
  HelpCircle,
  Flame,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: <Gift className="w-4 h-4 sm:w-5 sm:h-5" />,
  2: <ListOrdered className="w-4 h-4 sm:w-5 sm:h-5" />,
  3: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
  4: <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />,
  5: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
  6: <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />,
}

export const RulesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [copied, setCopied] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#step-5') {
      setActiveStep(5)
      const el = document.getElementById('official-rules')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
      }
    }
  }, [location.hash])

  const currentRule = OFFICIAL_RULES.find((r) => r.step === activeStep) || OFFICIAL_RULES[0]

  const handleCopyRules = () => {
    const text = `🎄 THE OFFICIAL WHITE ELEPHANT GIFT EXCHANGE RULES 🎄\n\n` +
      OFFICIAL_RULES.map(
        (r) => `STEP ${r.step}: ${r.title}\n• ${r.shortDesc}\n${r.details.map((d) => `  - ${d}`).join('\n')}\nPro Tip: ${r.proTip}\n`
      ).join('\n') +
      `\nGenerated from WhiteElephantHQ.com - Have an awesome party!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      })
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="space-y-8 sm:space-y-10" id="official-rules">
      {/* Responsive Header section with keyword target */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="festive" className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs uppercase font-bold tracking-wider">
              450K Searches / Month
            </Badge>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Standard Holiday Rules (Updated 2026)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Official White Elephant Rules & Guide
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Everything you need to host a flawless gift swap without awkward family arguments or infinite stealing loops.
          </p>
        </div>

        <Button
          onClick={handleCopyRules}
          variant={copied ? "secondary" : "outline"}
          className="w-full md:w-auto shrink-0 h-11 px-4 sm:px-5 font-bold cursor-pointer transition-all shadow-xs text-xs sm:text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-white" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Rule Sheet for Group Chat
            </>
          )}
        </Button>
      </div>

      {/* Interactive Step Navigator - Horizontally swipeable on very small screens, or grid on larger */}
      <div className="flex overflow-x-auto overflow-y-hidden sm:overflow-visible no-scrollbar py-1 pb-2 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 -mx-1 px-1 sm:mx-0 sm:px-0">
        {OFFICIAL_RULES.map((rule) => {
          const isActive = rule.step === activeStep
          return (
            <button
              key={rule.step}
              onClick={() => setActiveStep(rule.step)}
              className={`flex flex-col items-center p-2.5 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer shrink-0 min-w-[100px] sm:min-w-0 ${isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-600/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
            >
              <div
                className={`p-1.5 sm:p-2 rounded-lg mb-1.5 sm:mb-2 ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
              >
                {STEP_ICONS[rule.step]}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-rose-100' : 'text-slate-400'}`}>
                Step {rule.step}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold line-clamp-1 mt-0.5 max-w-[90px] sm:max-w-none">
                {rule.title.split(':')[0]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Step Detailed Card */}
      <Card className="border-slate-200/90 shadow-md overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 sm:p-3 bg-white/20 rounded-xl backdrop-blur-xs shrink-0">
              {STEP_ICONS[currentRule.step]}
            </div>
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-white/80 block">
                Step {currentRule.step} of 6
              </span>
              <h3 className="text-lg sm:text-2xl font-black leading-tight">{currentRule.title}</h3>
            </div>
          </div>
          <Badge className="bg-white text-rose-800 font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 shadow-xs border-0 text-[10px] sm:text-xs shrink-0">
            Crucial Step
          </Badge>
        </div>

        <CardContent className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="text-xs sm:text-sm md:text-base text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200">
            {currentRule.shortDesc}
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Detailed Rule Instructions:
            </h4>
            <ul className="space-y-2">
              {currentRule.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro-tip box */}
          <div className="p-3.5 sm:p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 sm:gap-3 text-amber-950">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="font-bold text-amber-900 block mb-0.5">Host Pro-Tip:</strong>
              {currentRule.proTip}
            </div>
          </div>

          {/* Next / Prev step navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="cursor-pointer text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
            </Button>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Step {activeStep} of 6
            </span>
            <Button
              variant="festive"
              size="sm"
              disabled={activeStep === 6}
              onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
              className="cursor-pointer text-xs font-bold"
            >
              Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* House Rule Variations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Popular Variations & Alternative Names
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {POPULAR_VARIATIONS.map((item, idx) => (
            <Card key={idx} className="p-4 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all">
              <h4 className="font-bold text-slate-900 text-sm mb-1 text-rose-700">
                {item.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.difference}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
