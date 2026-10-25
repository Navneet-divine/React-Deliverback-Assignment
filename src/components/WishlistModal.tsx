import React from 'react'
import { GIFTS_DATA, GiftItem } from '@/data/gifts'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Trash2, ExternalLink, ShoppingBag, Heart } from 'lucide-react'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  favoriteIds: string[]
  onRemoveFavorite: (id: string) => void
  onClearAll: () => void
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  onRemoveFavorite,
  onClearAll,
}) => {
  const savedGifts: GiftItem[] = GIFTS_DATA.filter((g) => favoriteIds.includes(g.id))
  const totalCost = savedGifts.reduce((acc, g) => acc + g.price, 0)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[94vw] sm:max-w-lg p-0 overflow-hidden border-slate-200 flex flex-col max-h-[85vh] rounded-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0">
              <Heart className="w-4 sm:w-5 h-4 sm:h-5 fill-rose-600" />
            </div>
            <div>
              <DialogTitle className="font-extrabold text-slate-900 text-base sm:text-lg">
                My Saved Gifts
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {savedGifts.length} {savedGifts.length === 1 ? 'item' : 'items'} shortlisted for your party
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* List of items */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1">
          {savedGifts.length === 0 ? (
            <div className="text-center py-10 sm:py-12 space-y-3">
              <ShoppingBag className="w-10 sm:w-12 h-10 sm:h-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 text-sm sm:text-base">Your wishlist is empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the heart icon on any gift card to bookmark your favorite items for your White Elephant or Secret Santa party!
              </p>
            </div>
          ) : (
            savedGifts.map((gift) => (
              <div
                key={gift.id}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all gap-2"
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3 max-w-[62%] sm:max-w-[65%]">
                  <span className="text-xl sm:text-2xl shrink-0">{gift.emoji}</span>
                  <div className="truncate">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 block truncate">
                      {gift.title}
                    </span>
                    <span className="text-xs font-mono font-semibold text-rose-600">
                      ${gift.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 sm:px-2.5 text-xs font-semibold cursor-pointer"
                    onClick={() => {
                      window.open(`https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=whiteelephant-20`, '_blank')
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:mr-1" />
                    <span className="hidden sm:inline">Buy</span>
                  </Button>
                  <button
                    onClick={() => onRemoveFavorite(gift.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-md cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedGifts.length > 0 && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Total Estimated</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                ${totalCost.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-xs text-slate-500 hover:text-red-600 cursor-pointer h-9 px-2 sm:px-3"
              >
                Clear All
              </Button>
              <Button
                variant="festive"
                size="sm"
                onClick={onClose}
                className="text-xs font-bold cursor-pointer h-9 px-3 sm:px-4"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
