import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { 
  Dices, 
  Plus, 
  RefreshCw, 
  Trophy, 
  Lock, 
  ShieldAlert, 
  Sparkles, 
  UserCheck, 
  AlertTriangle,
  PartyPopper
} from 'lucide-react'

interface TrackedGift {
  id: string
  name: string
  currentOwner: string
  stealCount: number
}

const STEAL_LIMIT_STEPS = [1, 2, 3] as const

export const PartyAssistant: React.FC = () => {
  // Turn drawer state
  const [totalPlayers, setTotalPlayers] = useState<number>(12)
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [currentDrawn, setCurrentDrawn] = useState<number | null>(null)

  // Dialog states for shadcn modals
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)
  const [isAllDrawnModalOpen, setIsAllDrawnModalOpen] = useState<boolean>(false)

  // Steal tracker state
  const [trackedGifts, setTrackedGifts] = useState<TrackedGift[]>([
    { id: '1', name: 'YETI Rambler Mug', currentOwner: 'Sarah', stealCount: 2 },
    { id: '2', name: 'Burrito Tortilla Blanket', currentOwner: 'Mike', stealCount: 1 },
    { id: '3', name: 'Bob Ross Toaster', currentOwner: 'Emma', stealCount: 3 },
  ])
  const [newGiftName, setNewGiftName] = useState('')
  const [newGiftOwner, setNewGiftOwner] = useState('')

  // Draw next number
  const handleDrawNumber = () => {
    const remaining = []
    for (let i = 1; i <= totalPlayers; i++) {
      if (!drawnNumbers.includes(i)) {
        remaining.push(i)
      }
    }

    if (remaining.length === 0) {
      setIsAllDrawnModalOpen(true)
      return
    }

    const randomIndex = Math.floor(Math.random() * remaining.length)
    const picked = remaining[randomIndex]
    setCurrentDrawn(picked)
    setDrawnNumbers((prev) => [...prev, picked])

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    })
  }

  // Confirmed reset from shadcn modal
  const handleConfirmReset = () => {
    setDrawnNumbers([])
    setCurrentDrawn(null)
    setIsResetModalOpen(false)
  }

  // Steal Tracker actions
  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGiftName.trim()) return

    const newGift: TrackedGift = {
      id: Date.now().toString(),
      name: newGiftName.trim(),
      currentOwner: newGiftOwner.trim() || `Player ${trackedGifts.length + 1}`,
      stealCount: 0
    }
    setTrackedGifts((prev) => [newGift, ...prev])
    setNewGiftName('')
    setNewGiftOwner('')
  }

  const handleSteal = (id: string) => {
    setTrackedGifts((prev) =>
      prev.map((g) => {
        if (g.id === id && g.stealCount < 3) {
          const nextCount = g.stealCount + 1
          if (nextCount === 3) {
            confetti({
              particleCount: 50,
              spread: 70,
              colors: ['#ef4444', '#f59e0b', '#10b981']
            })
          }
          return { ...g, stealCount: nextCount }
        }
        return g
      })
    )
  }

  const handleRemoveGift = (id: string) => {
    setTrackedGifts((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-6 sm:space-y-8" id="party-tools">
      <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
        <Badge variant="festive" className="px-3 py-1 text-[10px] sm:text-xs uppercase tracking-wider font-bold">
          🎉 Free Interactive Party Companion
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Live Game Turn & Steal Tracker
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Hosting right now? Project this screen onto your TV or tablet to draw numbers digitally and track the strict 3-steal limit so nobody argues!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool 1: Turn Order Number Drawer */}
        <Card className="border-slate-200/90 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-amber-50/50 border-b border-rose-100 rounded-t-xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-rose-600 text-white rounded-lg shrink-0">
                  <Dices className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    Digital Number Drawer
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Fair random turn order for your party
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-white font-mono text-xs shrink-0">
                {drawnNumbers.length}/{totalPlayers} Drawn
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label htmlFor="total-players-input" className="text-xs sm:text-sm font-semibold text-slate-700">
                Total Players in Room:
              </label>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <input
                  id="total-players-input"
                  aria-label="Total Players in Room"
                  type="number"
                  min="2"
                  max="60"
                  value={totalPlayers}
                  onChange={(e) => setTotalPlayers(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-14 sm:w-16 px-2 py-1 text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-rose-500 text-sm"
                />
                <span className="text-xs text-slate-500 font-medium">people</span>
              </div>
            </div>

            {/* Huge display for current drawn number */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-rose-50/60 to-white rounded-2xl border-2 border-dashed border-rose-200 min-h-[160px] sm:min-h-[180px] relative overflow-hidden">
              {currentDrawn !== null ? (
                <div className="text-center animate-in zoom-in-50 duration-300">
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest text-rose-600 font-bold block mb-1">
                    Up Next to Choose or Steal:
                  </span>
                  <div className="text-5xl sm:text-6xl font-black text-rose-600 tracking-tight font-mono drop-shadow-sm">
                    #{currentDrawn}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Turn {drawnNumbers.length} of {totalPlayers}
                  </span>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 text-rose-400 opacity-70 animate-pulse" />
                  <p className="font-semibold text-sm sm:text-base text-slate-600">No number drawn yet</p>
                  <p className="text-xs text-slate-400">Click the button below to pick player 1</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handleDrawNumber}
                variant="festive"
                className="flex-1 py-5 sm:py-6 text-sm sm:text-base font-bold shadow-md cursor-pointer"
                disabled={drawnNumbers.length >= totalPlayers}
              >
                <Dices className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2" />
                {drawnNumbers.length >= totalPlayers ? 'All Drawn! Player 1 Finale' : 'Draw Next Number'}
              </Button>
              <Button
                onClick={() => setIsResetModalOpen(true)}
                variant="outline"
                size="icon"
                title="Reset Turn Order"
                className="h-10 sm:h-12 w-10 sm:w-12 shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </Button>
            </div>

            {/* List of previously drawn numbers */}
            {drawnNumbers.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Order of play history:</span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {drawnNumbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool 2: Steal Limit Tracker (3-Steal Freeze) */}
        <Card className="border-slate-200/90 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50/50 border-b border-emerald-100 rounded-t-xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    3-Steal Rule Tracker
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Track steals in real-time — gifts freeze at 3!
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="font-mono text-xs shrink-0">
                Live Board
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Quick add gift form */}
            <form onSubmit={handleAddGift} className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Gift Name (e.g. Airfryer)..."
                value={newGiftName}
                onChange={(e) => setNewGiftName(e.target.value)}
                className="flex-1 text-xs sm:text-sm"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Holder (optional)"
                  value={newGiftOwner}
                  onChange={(e) => setNewGiftOwner(e.target.value)}
                  className="flex-1 sm:w-28 text-xs sm:text-sm"
                />
                <Button type="submit" variant="secondary" className="px-3 shrink-0 cursor-pointer text-xs sm:text-sm font-bold">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </form>

            {/* List of active tracked gifts */}
            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
              {trackedGifts.map((gift) => {
                const isFrozen = gift.stealCount >= 3
                return (
                  <div
                    key={gift.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-all gap-2.5 ${
                      isFrozen
                        ? 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5 max-w-full sm:max-w-[55%]">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 truncate block">
                          {gift.name}
                        </span>
                        {isFrozen && (
                          <Badge variant="destructive" className="text-[9px] uppercase font-black tracking-wide gap-1 py-0.5">
                            <Lock className="w-2.5 h-2.5 inline" /> FROZEN (3/3)
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        Currently with: <span className="font-semibold text-slate-700">{gift.currentOwner}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-2.5 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right mr-1">
                        <div className="text-[11px] sm:text-xs font-semibold text-slate-500">
                          Steals: <span className="font-black text-slate-900">{gift.stealCount}</span>/3
                        </div>
                        <div className="flex gap-1 mt-1">
                          {STEAL_LIMIT_STEPS.map((step) => (
                            <div
                              key={step}
                              className={`w-3.5 h-1.5 rounded-full ${
                                step <= gift.stealCount
                                  ? step === 3
                                    ? 'bg-red-500'
                                    : 'bg-amber-500'
                                  : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <Button
                          size="sm"
                          disabled={isFrozen}
                          onClick={() => handleSteal(gift.id)}
                          className={`text-xs px-2.5 h-8 font-semibold cursor-pointer ${
                            isFrozen
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-600 hover:bg-amber-700 text-white'
                          }`}
                        >
                          {isFrozen ? 'Locked' : '+1 Steal'}
                        </Button>

                        <button
                          onClick={() => handleRemoveGift(gift.id)}
                          title="Delete gift"
                          className="text-slate-400 hover:text-red-500 p-1 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
              <Trophy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Official Rule Reminder:</strong> Once an item hits 3 steals, it is permanently locked with the 3rd stealer and safe from any further swap!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SHADCN UI DIALOG MODAL 1: Reset Confirmation */}
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="w-[92vw] sm:max-w-md p-6 rounded-2xl border-slate-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 leading-tight">
                Reset All Drawn Numbers?
              </DialogTitle>
              <span className="text-xs text-slate-400 font-medium">Turn Order Reset</span>
            </div>
          </div>

          <DialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
            This will clear all <strong>{drawnNumbers.length}</strong> previously drawn player numbers so you can start a fresh game from turn #1. This action cannot be undone.
          </DialogDescription>

          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetModalOpen(false)}
              className="w-full sm:w-auto text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirmReset}
              className="w-full sm:w-auto text-xs font-bold cursor-pointer bg-rose-600 hover:bg-rose-700 text-white"
            >
              Yes, Reset Numbers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SHADCN UI DIALOG MODAL 2: All Numbers Drawn / Player 1 Finale Announcement */}
      <Dialog open={isAllDrawnModalOpen} onOpenChange={setIsAllDrawnModalOpen}>
        <DialogContent className="w-[92vw] sm:max-w-md p-6 rounded-2xl border-slate-200 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <PartyPopper className="w-8 h-8" />
          </div>

          <DialogTitle className="text-xl font-black text-slate-900 leading-tight">
            All Numbers Drawn!
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
            Every participant in the room has picked or stolen a gift. It is now time for the official <strong>Player #1 Finale Advantage</strong>:
          </DialogDescription>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-950 space-y-1 my-2">
            <span className="font-bold text-amber-900 block">👑 Official Rule:</span>
            <span>Player #1 may now either keep their current gift OR steal any unlocked gift in the room!</span>
          </div>

          <DialogFooter className="pt-2 flex justify-center">
            <Button
              variant="festive"
              size="sm"
              onClick={() => setIsAllDrawnModalOpen(false)}
              className="w-full text-xs font-bold cursor-pointer"
            >
              Awesome, Let's Finish the Game!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
