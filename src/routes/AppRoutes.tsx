import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GiftItem } from '@/data/gifts'
import { GiftsPage } from '@/pages/GiftsPage'
import { RulesPage } from '@/pages/RulesPage'
import { PartyToolPage } from '@/pages/PartyToolPage'
import { SecretSantaPage } from '@/pages/SecretSantaPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

interface AppRoutesProps {
  favorites: string[]
  onToggleFavorite: (id: string) => void
  onOpenGiftModal: (gift: GiftItem) => void
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
  favorites,
  onToggleFavorite,
  onOpenGiftModal,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GiftsPage
            onOpenGiftModal={onOpenGiftModal}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        }
      />
      <Route
        path="/gifts"
        element={
          <GiftsPage
            onOpenGiftModal={onOpenGiftModal}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        }
      />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/party-tool" element={<PartyToolPage />} />
      <Route
        path="/secret-santa"
        element={
          <SecretSantaPage
            onOpenGiftModal={onOpenGiftModal}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        }
      />
      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
