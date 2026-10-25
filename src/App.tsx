import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { GiftItem } from '@/data/gifts'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { AppRoutes } from '@/routes'
import { GiftModal } from '@/components/GiftModal'
import { WishlistModal } from '@/components/WishlistModal'

export function App() {
  // Global modals & favorites state
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([
    'burrito-blanket',
    'yeti-rambler-mug'
  ])

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id)
      if (!exists) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 }
        })
        return [...prev, id]
      }
      return prev.filter((item) => item !== id)
    })
  }

  const handleOpenGiftModal = (gift: GiftItem) => {
    setSelectedGift(gift)
    setIsGiftModalOpen(true)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-rose-500 selection:text-white">
        {/* Top Navbar */}
        <Navbar
          wishlistCount={favorites.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        {/* Main Routed Page Content - Full Width */}
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">
          <AppRoutes
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenGiftModal={handleOpenGiftModal}
          />
        </main>

        {/* Footer */}
        <Footer />

        {/* Gift Quick View Modal using shadcn Dialog */}
        <GiftModal
          gift={selectedGift}
          isOpen={isGiftModalOpen}
          onClose={() => setIsGiftModalOpen(false)}
          isFavorited={selectedGift ? favorites.includes(selectedGift.id) : false}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Wishlist Modal using shadcn Dialog */}
        <WishlistModal
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          favoriteIds={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onClearAll={() => setFavorites([])}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
