import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { GIFTS_DATA, GiftItem } from '@/data/gifts'
import { GiftCard } from '@/components/GiftCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Sparkles,
  Gift,
  HelpCircle,
  Flame,
  Smile,
  Zap,
  ArrowUpDown,
  Filter,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react'

type CategoryFilter = 'all' | 'funny' | 'best' | 'under-25' | 'under-15' | 'secret-santa'
type SortOrder = 'popular' | 'price-asc' | 'price-desc'

const CATEGORY_DISPLAY_NAMES: Record<CategoryFilter, string> = {
  'all': 'All Gifts',
  'funny': 'Funny & Gag (201K)',
  'best': 'Best & Useful (201K)',
  'under-25': 'Under $25 (1.22M)',
  'under-15': 'Under $15',
  'secret-santa': 'Secret Santa (135K)'
}

export interface CategoryPillItem {
  id: CategoryFilter
  label: string
  icon: React.ReactNode
}

export const CATEGORY_PILLS: CategoryPillItem[] = [
  { id: 'all', label: 'All Gifts', icon: <Gift className="w-3.5 h-3.5" /> },
  { id: 'funny', label: '😂 Funny & Gag (201K)', icon: <Smile className="w-3.5 h-3.5" /> },
  { id: 'best', label: '⭐ Best & Useful (201K)', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'under-25', label: '🎁 Under $25 (1.22M)', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'under-15', label: '💸 Under $15', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'secret-santa', label: '🎅 Secret Santa (135K)', icon: <Gift className="w-3.5 h-3.5" /> },
]

export interface FAQItem {
  q: string
  a: string
}

export const WHITE_ELEPHANT_FAQS: FAQItem[] = [
  {
    q: 'What is a White Elephant gift exchange?',
    a: 'A White Elephant gift exchange is a festive party game where participants bring wrapped gifts and take turns unwrapping a new one or stealing an already opened gift from another player.'
  },
  {
    q: 'What is the standard budget for White Elephant gifts?',
    a: 'Most groups set a spending limit between $15 and $25. This ensures fairness and allows participants to buy either great quality gag gifts or genuine crowd-pleasers like mugs, blankets, or gadgets.'
  },
  {
    q: 'Can you steal back a gift immediately after it was taken from you?',
    a: 'No! The "No Immediate Steal-Back Rule" prevents Player B from immediately stealing back the exact gift that Player A just stole. You must choose another eligible open gift or unwrap a fresh one.'
  },
  {
    q: 'What is the 3-steal rule ("Frozen" Gift)?',
    a: 'To prevent infinite stealing loops that drag the game on for hours, a gift is declared permanently "frozen" or locked after it has been stolen 3 times. The 3rd thief keeps it forever.'
  },
  {
    q: 'Why is it called "White Elephant"?',
    a: 'The phrase stems from historical lore where the King of Siam would gift rare white albino elephants to courtiers who displeased him. The elephants were sacred and could not be put to work, making them a burdensome, expensive luxury to maintain!'
  },
  {
    q: 'What is the difference between Secret Santa and White Elephant?',
    a: 'In Secret Santa, you are secretly assigned one specific recipient and buy a thoughtful gift for them. In White Elephant, gifts are generic and contributed to a central pool where players openly steal from one another.'
  }
]

interface GiftsPageProps {
  onOpenGiftModal: (gift: GiftItem) => void
  favorites: string[]
  onToggleFavorite: (id: string) => void
}

export const GiftsPage: React.FC<GiftsPageProps> = ({
  onOpenGiftModal,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('popular')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const categoryParam = searchParams.get('category') as CategoryFilter | null
  const queryParam = searchParams.get('q') || ''


  useEffect(() => {
    if (categoryParam && ['all', 'funny', 'best', 'under-25', 'under-15', 'secret-santa'].includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    } else if (!categoryParam) {
      setSelectedCategory('all')
    }

    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam)
    }

    if (location.hash === '#gifts') {
      const el = document.getElementById('gifts')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [categoryParam, queryParam, location.hash])

  const scrollToGifts = () => {
    const el = document.getElementById('gifts')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleHeroFilterClick = (cat: CategoryFilter) => {
    handleCategoryChange(cat)
    handleClearSearch()
    setTimeout(() => {
      scrollToGifts()
    }, 50)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    const newParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      newParams.set('q', value)
    } else {
      newParams.delete('q')
    }
    setSearchParams(newParams, { replace: true })
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('q')
    setSearchParams(newParams, { replace: true })
  }

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat)
    const newParams = new URLSearchParams(searchParams)
    if (cat === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', cat)
    }
    setSearchParams(newParams, { replace: true })
  }

  const handleClearAllFilters = () => {
    setSelectedCategory('all')
    setMaxPrice(null)
    setSearchQuery('')
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('category')
    newParams.delete('q')
    setSearchParams(newParams, { replace: true })
  }

  const isFilterActive = selectedCategory !== 'all' || maxPrice !== null
  const isAnyFilterActive = isFilterActive || searchQuery.trim() !== ''
  const filterButtonLabel = maxPrice !== null
    ? `Under $${maxPrice}`
    : selectedCategory !== 'all'
      ? 'Filter (1)'
      : 'Filter'

  // Filtered and sorted gifts
  const filteredGifts = useMemo(() => {
    return GIFTS_DATA.filter((gift) => {
      const matchesSearch =
        gift.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      if (!matchesSearch) return false
      if (maxPrice !== null && gift.price > maxPrice) return false

      if (selectedCategory === 'all') return true
      if (selectedCategory === 'under-15') return gift.price <= 15
      if (selectedCategory === 'under-25') return gift.price <= 25
      return gift.category === selectedCategory || gift.tags.includes(selectedCategory)
    }).sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price
      if (sortOrder === 'price-desc') return b.price - a.price
      return b.reviewCount - a.reviewCount
    })
  }, [searchQuery, selectedCategory, sortOrder, maxPrice])

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Responsive & Big-Screen Balanced Hero Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 xl:p-14 shadow-2xl border border-rose-900/40">
        <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="festive" className="px-2.5 sm:px-3 py-1 font-extrabold uppercase text-[10px] sm:text-xs tracking-wider">
                🎄 Holiday 2026 Gift Guide
              </Badge>
              <span className="text-[11px] sm:text-xs text-rose-300 font-medium">
                Over 2.5M December Searches Solved
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12]">
              Find the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
                Funniest & Best
              </span>{' '}
              White Elephant Gifts
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Whether you need hilarious gag gifts, crowd-favorite steals under $25, or official party rules to avoid arguments—we’ve got your holiday exchange covered.
            </p>

            {/* Instant Search Bar */}
            <div className="pt-1 sm:pt-2 max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  scrollToGifts()
                }}
                className="relative flex items-center"
              >
                <button
                  type="submit"
                  className="absolute left-3.5 sm:left-4 z-10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Search and jump to gifts"
                >
                  <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <Input
                  type="text"
                  placeholder="Search gifts (e.g. blanket, mug, toaster)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      scrollToGifts()
                    }
                  }}
                  className="pl-10 sm:pl-12 pr-24 py-5 sm:py-6 bg-white/10 hover:bg-white/15 focus-visible:bg-white/20 text-white placeholder:text-slate-400 rounded-xl sm:rounded-2xl border border-white/25 focus-visible:border-rose-400/80 focus-visible:ring-2 focus-visible:ring-rose-500/40 transition-all text-xs sm:text-sm md:text-base shadow-inner backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 sm:right-4 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1.5 rounded-lg z-10 cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </form>
            </div>

            {/* Quick Keyword Jump Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="text-slate-400 font-medium">Popular:</span>
              <button
                onClick={() => handleHeroFilterClick('funny')}
                className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-rose-200 border border-white/10 transition-colors cursor-pointer"
              >
                Funny (201K)
              </button>
              <button
                onClick={() => handleHeroFilterClick('under-25')}
                className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-amber-200 border border-white/10 transition-colors cursor-pointer"
              >
                Under $25 (1.22M)
              </button>
              <Link
                to="/rules"
                className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-emerald-200 border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" /> Official Rules (450K)
              </Link>
            </div>
          </div>

          {/* Right Column: Balanced Big Screen Showcase Card */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
                    Trending Steals Spotlight
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-white/10 text-white border-white/20 font-mono">
                  Live Hits
                </Badge>
              </div>

              {/* Spotlight Item 1: YETI Mug */}
              <div
                onClick={() => {
                  const gift = GIFTS_DATA.find((g) => g.id === 'yeti-rambler-mug')
                  if (gift) onOpenGiftModal(gift)
                }}
                className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-3 hover:bg-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      YETI Rambler 14 oz Mug
                    </span>
                    <span className="text-[11px] text-rose-300 font-mono font-bold">$24.95</span>
                  </div>
                </div>
                <Badge variant="festive" className="text-[10px] px-2 py-0.5 bg-rose-500/80 text-white shrink-0">
                  👑 Most Stolen
                </Badge>
              </div>

              {/* Spotlight Item 2: Burrito Blanket */}
              <div
                onClick={() => {
                  const gift = GIFTS_DATA.find((g) => g.id === 'burrito-blanket')
                  if (gift) onOpenGiftModal(gift)
                }}
                className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-3 hover:bg-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌯</span>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Giant Tortilla Burrito Blanket
                    </span>
                    <span className="text-[11px] text-rose-300 font-mono font-bold">$18.99</span>
                  </div>
                </div>
                <Badge variant="festive" className="text-[10px] px-2 py-0.5 bg-amber-500/80 text-white shrink-0">
                  😂 Top Gag
                </Badge>
              </div>

              {/* Live Game Steal Limit Link */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>3-Steal Limit Enforced</span>
                </span>
                <Link to="/party-tool" className="font-bold text-amber-300 hover:text-white flex items-center gap-1">
                  Launch Live Tool <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Filter and Catalog Section */}
      <section className="space-y-6" id="gifts">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Category Pills */}
          <div className="flex-1 flex overflow-x-auto overflow-y-hidden sm:overflow-visible no-scrollbar pb-1 lg:pb-0 sm:flex-wrap gap-1.5 sm:gap-2 -mx-1 px-1 sm:mx-0 sm:px-0">
            {CATEGORY_PILLS.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(isSelected && cat.id !== 'all' ? 'all' : (cat.id as CategoryFilter))}
                  className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${isSelected
                    ? 'bg-rose-600 text-white shadow-xs font-extrabold ring-2 ring-rose-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                    }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  {isSelected && cat.id !== 'all' && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryChange('all')
                      }}
                      className="ml-0.5 p-0.5 rounded-full hover:bg-rose-700 transition-colors inline-flex items-center"
                      title="Clear category filter"
                      aria-label="Clear category filter"
                    >
                      <X className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Action Tools: Search, Filter & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
            {/* Catalog Search Input */}
            <div className="relative w-full sm:w-44 md:w-52 lg:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search in gifts..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-9 pl-8 pr-7 text-xs bg-slate-50 hover:bg-white focus:bg-white border-slate-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 rounded-xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-9 text-xs font-semibold cursor-pointer transition-all ${isFilterActive
                      ? 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100/70 hover:text-rose-800 font-bold'
                      : ''
                      }`}
                  >
                    <Filter className={`w-3.5 h-3.5 mr-1 ${isFilterActive ? 'text-rose-600' : 'text-slate-500'}`} />
                    <span>{filterButtonLabel}</span>
                    {isFilterActive && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClearAllFilters()
                        }}
                        className="ml-1.5 p-0.5 rounded-full hover:bg-rose-200/80 inline-flex items-center"
                        title="Clear filters"
                      >
                        <X className="w-3 h-3 text-rose-600" />
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1.5">
                  <DropdownMenuLabel className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Budget Limit
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => setMaxPrice(null)}
                    className={`cursor-pointer flex items-center justify-between text-xs ${maxPrice === null ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>All Prices</span>
                    {maxPrice === null && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setMaxPrice(15)}
                    className={`cursor-pointer flex items-center justify-between text-xs ${maxPrice === 15 ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Under $15 Max</span>
                    {maxPrice === 15 && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setMaxPrice(25)}
                    className={`cursor-pointer flex items-center justify-between text-xs ${maxPrice === 25 ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Under $25 Max (Standard)</span>
                    {maxPrice === 25 && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setMaxPrice(50)}
                    className={`cursor-pointer flex items-center justify-between text-xs ${maxPrice === 50 ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Under $50 Max</span>
                    {maxPrice === 50 && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Category Jump
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleCategoryChange('all')}
                    className={`cursor-pointer flex items-center justify-between text-xs ${selectedCategory === 'all' ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>All Categories</span>
                    {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCategoryChange('funny')}
                    className={`cursor-pointer flex items-center justify-between text-xs ${selectedCategory === 'funny' ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Gag / Laughs (201K)</span>
                    {selectedCategory === 'funny' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCategoryChange('best')}
                    className={`cursor-pointer flex items-center justify-between text-xs ${selectedCategory === 'best' ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Crowd Pleasers (201K)</span>
                    {selectedCategory === 'best' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCategoryChange('secret-santa')}
                    className={`cursor-pointer flex items-center justify-between text-xs ${selectedCategory === 'secret-santa' ? 'font-bold text-rose-600 bg-rose-50/50' : ''
                      }`}
                  >
                    <span>Secret Santa (135K)</span>
                    {selectedCategory === 'secret-santa' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </DropdownMenuItem>

                  {isFilterActive && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleClearAllFilters}
                        className="cursor-pointer text-xs font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" /> Clear All Filters
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden xs:inline" />
                <Select value={sortOrder} onValueChange={(val) => setSortOrder(val as SortOrder)}>
                  <SelectTrigger className="w-[140px] sm:w-[170px] h-9 text-xs">
                    <SelectValue placeholder="Sort gifts by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular / Steals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary Bar */}
        {isAnyFilterActive && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Active Filters:</span>

              {selectedCategory !== 'all' && (
                <Badge
                  variant="secondary"
                  className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 rounded-lg"
                >
                  <span>Category: {CATEGORY_DISPLAY_NAMES[selectedCategory]}</span>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="hover:bg-rose-200/60 rounded-full p-0.5 cursor-pointer transition-colors"
                    title="Remove category filter"
                    aria-label="Remove category filter"
                  >
                    <X className="w-3 h-3 text-rose-700" />
                  </button>
                </Badge>
              )}

              {maxPrice !== null && (
                <Badge
                  variant="secondary"
                  className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 rounded-lg"
                >
                  <span>Price: Under ${maxPrice}</span>
                  <button
                    onClick={() => setMaxPrice(null)}
                    className="hover:bg-amber-200/60 rounded-full p-0.5 cursor-pointer transition-colors"
                    title="Remove budget filter"
                    aria-label="Remove budget filter"
                  >
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </Badge>
              )}

              {searchQuery.trim() !== '' && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 rounded-lg"
                >
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={handleClearSearch}
                    className="hover:bg-blue-200/60 rounded-full p-0.5 cursor-pointer transition-colors"
                    title="Clear search query"
                    aria-label="Clear search query"
                  >
                    <X className="w-3 h-3 text-blue-700" />
                  </button>
                </Badge>
              )}
            </div>

            <button
              onClick={handleClearAllFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>
        )}

        {/* Product Grid: Responsive 1 to 6 columns across full-width screens */}
        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 sm:gap-6">
            {filteredGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onSelect={onOpenGiftModal}
                isFavorited={favorites.includes(gift.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-slate-800">No gifts matched your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing the search term or switching the category tab to find gifts!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setMaxPrice(null)
              }}
              className="cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Jump To Other Dedicated Pages Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <Badge variant="festive" className="text-xs font-bold uppercase">
              450K Searches / Month
            </Badge>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Need the Official White Elephant Rules?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Check out our complete 6-step interactive rulebook, printable copy-sheet, and 3-steal limit explanation to keep your game running smoothly.
            </p>
          </div>
          <Link to="/rules">
            <Button variant="festive" className="w-full sm:w-fit cursor-pointer font-bold">
              Read The Official Rules <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs font-bold uppercase">
              Free Party Companion
            </Badge>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Live Number Drawer & Steal Tracker
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Throwing a party right now? Draw turn numbers fairly with confetti and track gift steals in real-time on any TV or phone.
            </p>
          </div>
          <Link to="/party-tool">
            <Button variant="secondary" className="w-full sm:w-fit cursor-pointer font-bold">
              Launch Party Companion <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="border-t border-slate-200 pt-12 sm:pt-16 space-y-6 sm:space-y-8" id="faq">
        <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase font-bold text-slate-700">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know About White Elephant
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHITE_ELEPHANT_FAQS.map((faq, idx) => (
            <Card key={idx} className="p-4 sm:p-5 border-slate-200 bg-white hover:border-slate-300 transition-all">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 sm:mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
