import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gift, Heart, BookOpen, Dices, Menu, X } from 'lucide-react'

interface NavbarProps {
  wishlistCount: number
  onOpenWishlist: () => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Gift Ideas (1.22M)', icon: <Gift className="w-3.5 h-3.5" /> },
  { path: '/rules', label: 'Game Rules (450K)', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { path: '/secret-santa', label: 'Secret Santa (135K)', icon: <Gift className="w-3.5 h-3.5" /> },
  { path: '/party-tool', label: 'Live Party Tool', icon: <Dices className="w-3.5 h-3.5" /> },
]

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro banner for holiday traffic context */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 px-3 sm:px-4 py-1.5 text-center text-[11px] sm:text-xs font-semibold text-white tracking-wide flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="truncate">🎄 <strong>Holiday 2026:</strong> Over 2.5M People Search for White Elephant Every December</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.2 rounded-full text-[10px] shrink-0">Updated Daily</span>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <span className="text-lg sm:text-xl">🐘</span>
          </div>
          <div>
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                WhiteElephant<span className="text-rose-600">HQ</span>
              </span>
              <Badge variant="festive" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 font-extrabold uppercase hidden xs:inline-flex">
                Guide
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-medium -mt-0.5 hidden xl:block">
              Gift Ideas, Official Rules & Party Companion
            </p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right actions: Wishlist + Mobile toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenWishlist}
            className="relative cursor-pointer text-xs font-bold border-slate-200 hover:border-rose-300 px-2.5 sm:px-3 h-9"
          >
            <Heart className={`w-4 h-4 sm:mr-1.5 ${wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="sm:ml-1.5 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-black">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center space-x-2.5 px-3 py-3 rounded-xl text-sm font-bold text-left transition-colors ${isActive
                  ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                  : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
