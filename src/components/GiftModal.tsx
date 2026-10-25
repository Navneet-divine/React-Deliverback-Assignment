import React from 'react'
import { GiftItem } from '@/data/gifts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ExternalLink, Star, ShieldCheck, Heart, Sparkles } from 'lucide-react'

interface GiftModalProps {
  gift: GiftItem | null
  isOpen: boolean
  onClose: () => void
  isFavorited: boolean
  onToggleFavorite: (id: string) => void
}

export const GiftModal: React.FC<GiftModalProps> = ({
  gift,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
}) => {
  if (!gift) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[94vw] sm:max-w-lg p-0 overflow-hidden border-slate-200 max-h-[90vh] flex flex-col rounded-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 p-4 sm:p-6 text-white relative shrink-0">
          <div className="flex items-center space-x-3 pr-6">
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm shrink-0">{gift.emoji}</span>
            <div>
              <Badge variant="festive" className="mb-1 text-white border-white/30 bg-white/20 text-[10px]">
                {gift.badge}
              </Badge>
              <DialogTitle className="text-base sm:text-xl font-bold leading-snug text-white">
                {gift.title}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Scrollable Body content */}
        <div className="p-4 sm:p-6 pt-2 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          <DialogDescription className="sr-only">
            Detailed information, party steal appeal, and purchase options for {gift.title}.
          </DialogDescription>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Typical Price</span>
              <div className="text-xl sm:text-2xl font-black text-rose-600">${gift.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center space-x-1.5 bg-amber-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-amber-200">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">{gift.rating}</span>
              <span className="text-[10px] sm:text-xs text-slate-500">({gift.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Product Overview</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{gift.description}</p>
          </div>

          <div className="p-3.5 sm:p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Why It Gets Stolen At Parties:</span>
            </div>
            <p className="text-xs text-emerald-900/90 leading-relaxed">
              {gift.whyItSteals}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {gift.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-2 sm:gap-3">
            <Button
              variant="festive"
              className="flex-1 py-5 text-xs sm:text-sm font-bold cursor-pointer"
              onClick={() => {
                window.open(`https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=whiteelephant-20`, '_blank')
              }}
            >
              <ExternalLink className="w-4 h-4 mr-1.5 sm:mr-2" /> Check Price on Amazon
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0 cursor-pointer"
              onClick={() => onToggleFavorite(gift.id)}
              title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`}
              />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-1.5 text-[10px] sm:text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Eligible for Prime fast holiday shipping and easy gift wrapping</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
