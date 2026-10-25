import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Gift, Sparkles, Check, ArrowRight } from 'lucide-react'

const SECRET_SANTA_IDEAS = [
  { recipient: 'The Coffee Addict', ideas: ['AeroPress Go Travel Brewer', 'Insulated Double-Wall Tumbler', 'Single-Origin Coffee Sampler'], price: '$15 - $25' },
  { recipient: 'The Workaholic / Remote Worker', ideas: ['Mini Mushroom Desk Vacuum', 'Ergonomic Memory Foam Wrist Rest', 'Magnetic Fidget Pen'], price: '$12 - $20' },
  { recipient: 'The Foodie / Snack Master', ideas: ['TRUFF Black Truffle Hot Sauce', 'Mini Dash Waffle Maker', 'Gourmet Popcorn Seasoning Set'], price: '$13 - $22' },
  { recipient: 'The Stressed Coworker', ideas: ['Aromatherapy Shower Steamers', 'Desk Punching Bag', 'Weighted Neck Wrap'], price: '$14 - $24' },
]

export const SecretSantaGuide: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<number>(0)
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)

  const handleRandomize = () => {
    const randomIdx = Math.floor(Math.random() * SECRET_SANTA_IDEAS.length)
    setSelectedPersona(randomIdx)
    const persona = SECRET_SANTA_IDEAS[randomIdx]
    const randomGift = persona.ideas[Math.floor(Math.random() * persona.ideas.length)]
    setGeneratedPrompt(`Recommended for "${persona.recipient}": ${randomGift} (${persona.price})`)

    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.8 }
    })
  }

  return (
    <div className="space-y-6 sm:space-y-8" id="secret-santa">
      <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
        <Badge variant="festive" className="px-3 py-1 text-[10px] sm:text-xs uppercase font-bold tracking-wider">
          🎅 135K Searches / Month
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Secret Santa Gift Ideas: Thoughtful Presents For Every Person
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Got an assigned coworker or family member and no idea what they like? Pick their persona below or generate an instant thoughtful gift match!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Column */}
        <Card className="lg:col-span-1 border-slate-200/90 shadow-sm p-4 sm:p-6 bg-slate-50/60 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-rose-600 shrink-0" />
              White Elephant vs Secret Santa
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confused between the two? Here is how they differ:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-rose-700 block mb-1">🎁 White Elephant:</span>
                Everyone brings a generic gift for ANYONE to steal or open. Stealing is encouraged, and laughter/fun is the focus.
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-1">🎅 Secret Santa:</span>
                You draw one specific person's name secretly beforehand and buy a personalized, thoughtful gift tailored just for them.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRandomize}
              className="w-full text-xs font-bold cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 mr-1.5" /> Surprise Me with an Idea
            </Button>
          </div>
        </Card>

        {/* Persona Matcher Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Horizontally swipeable on mobile */}
          <div className="flex overflow-x-auto overflow-y-hidden sm:overflow-visible no-scrollbar py-1 pb-1 sm:pb-0 sm:flex-wrap gap-2 -mx-1 px-1 sm:mx-0 sm:px-0">
            {SECRET_SANTA_IDEAS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPersona(idx)
                  setGeneratedPrompt(null)
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${selectedPersona === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
              >
                {item.recipient}
              </button>
            ))}
          </div>

          {generatedPrompt && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{generatedPrompt}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] shrink-0">Instant Pick</Badge>
            </div>
          )}

          <Card className="border-slate-200 shadow-xs bg-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] sm:text-xs uppercase font-extrabold text-emerald-600 tracking-wider">
                  Target Recipient
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {SECRET_SANTA_IDEAS[selectedPersona].recipient}
                </h4>
              </div>
              <Badge variant="outline" className="font-mono text-xs w-fit">
                Budget: {SECRET_SANTA_IDEAS[selectedPersona].price}
              </Badge>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Top 3 Fail-Safe Gifts to Buy:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SECRET_SANTA_IDEAS[selectedPersona].ideas.map((gift, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-800">{gift}</span>
                    </div>
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(gift)}&tag=whiteelephant-20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      Shop on Amazon <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
