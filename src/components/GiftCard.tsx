import React from 'react'
import { GiftItem } from '@/data/gifts'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ExternalLink, Heart, Sparkles, Eye } from 'lucide-react'

interface GiftCardProps {
  gift: GiftItem
  onSelect: (gift: GiftItem) => void
  isFavorited: boolean
  onToggleFavorite: (id: string) => void
}

export const GiftCard: React.FC<GiftCardProps> = ({
  gift,
  onSelect,
  isFavorited,
  onToggleFavorite
}) => {
  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-slate-200/80 bg-white hover:border-rose-300 hover:shadow-xl transition-all duration-300 rounded-2xl">
      {/* Top Banner / Image or Emoji Preview with aspect ratio to prevent CLS */}
      <div className="relative h-36 sm:h-44 xl:h-48 2xl:h-52 aspect-[4/3] bg-gradient-to-br from-slate-50 via-rose-50/30 to-amber-50/40 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {gift.imageUrl ? (
          <img
            src={gift.imageUrl}
            alt={gift.title}
            loading="lazy"
            decoding="async"
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-6xl sm:text-7xl xl:text-8xl group-hover:scale-110 transition-transform duration-300 select-none filter drop-shadow-sm">
            {gift.emoji}
          </span>
        )}

        {/* Badge in top left */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3">
          <Badge
            variant="festive"
            className="text-[10px] sm:text-[11px] font-bold shadow-xs bg-white/90 backdrop-blur-xs text-rose-800 border-rose-200 px-2 py-0.5"
          >
            {gift.badge}
          </Badge>
        </div>

        {/* Favorite heart button in top right */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(gift.id)
          }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-xs hover:bg-white transition-all text-slate-400 hover:text-rose-500 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorited ? 'text-rose-500 fill-rose-500' : ''
              }`}
          />
        </button>
      </div>

      {/* Card Info */}
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
            ${gift.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1 text-[11px] sm:text-xs font-semibold text-slate-700 bg-amber-50 border border-amber-200/70 px-1.5 sm:px-2 py-0.5 rounded-md">
            <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500 fill-amber-500" />
            <span>{gift.rating}</span>
            <span className="text-slate-400">({(gift.reviewCount / 1000).toFixed(0)}k)</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">
          {gift.title}
        </h3>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-0 pb-3 flex-1 space-y-2.5">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {gift.description}
        </p>

        {/* Steal appeal tag */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-start gap-1.5 text-[10px] sm:text-[11px] text-emerald-900">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="line-clamp-2 font-medium">
            <strong>Party steal factor:</strong> {gift.whyItSteals}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-3.5 sm:p-5 pt-2 flex items-center gap-1.5 sm:gap-2 border-t border-slate-100/80 bg-slate-50/40">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[11px] sm:text-xs font-semibold cursor-pointer h-8 sm:h-9 px-2"
          onClick={() => onSelect(gift)}
        >
          <Eye className="w-3.5 h-3.5 mr-1" /> Quick View
        </Button>

        <Button
          variant="festive"
          size="sm"
          className="flex-1 text-[11px] sm:text-xs font-semibold cursor-pointer h-8 sm:h-9 px-2"
          onClick={() => {
            window.open(`https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=whiteelephant-20`, '_blank')
          }}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Deal
        </Button>
      </CardFooter>
    </Card>
  )
}
