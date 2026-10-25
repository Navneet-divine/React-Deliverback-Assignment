import React from 'react'
import { Link } from 'react-router-dom'
import { SecretSantaGuide } from '@/components/SecretSantaGuide'
import { GIFTS_DATA, GiftItem } from '@/data/gifts'
import { GiftCard } from '@/components/GiftCard'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
interface SecretSantaPageProps {
  onOpenGiftModal: (gift: GiftItem) => void
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

export const SecretSantaPage: React.FC<SecretSantaPageProps> = ({
  onOpenGiftModal,
  favorites,
  onToggleFavorite,
}) => {

  const secretSantaGifts = GIFTS_DATA.filter(
    (g) => g.category === 'secret-santa' || g.tags.includes('secret-santa') || g.tags.includes('practical')
  ).slice(0, 5)

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Gifts
        </Link>
        <Badge variant="festive" className="text-[10px] sm:text-xs uppercase font-extrabold">
          135K Searches / Month
        </Badge>
      </div>

      {/* Main Secret Santa interactive guide & Persona Matcher */}
      <SecretSantaGuide />

      {/* Curated Secret Santa Gift Ideas Grid */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold text-emerald-600 tracking-wider">
              Curated Catalog
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              Top-Rated Secret Santa Gifts Under $25
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thoughtful, coworker-appropriate gifts guaranteed not to sit in an office junk drawer.
            </p>
          </div>
          <Badge variant="secondary" className="font-mono text-xs w-fit">
            {secretSantaGifts.length} Best Recommendations
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5 sm:gap-6">
          {secretSantaGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onSelect={onOpenGiftModal}
              isFavorited={favorites.includes(gift.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
