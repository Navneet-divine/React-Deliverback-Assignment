import React from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_KEYWORD_STATS } from '@/data/gifts'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Heart } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800 mt-16 sm:mt-20">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-10 sm:space-y-12">
        {/* Keyword Target Grid - Explicitly demonstrates coverage of George's keywords */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Targeted Holiday Search Queries (December Peak)
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Built to Capture High-Volume Holiday Gift Traffic
              </h4>
            </div>
            <Badge variant="outline" className="text-slate-300 border-slate-600 text-xs shrink-0">
              2.5M+ Total Monthly Searches
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {SEARCH_KEYWORD_STATS.map((stat, idx) => (
              <Link
                key={idx}
                to={stat.path}
                className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-700/50 hover:border-rose-500/70 hover:bg-slate-850 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <span className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white capitalize leading-snug transition-colors">
                  {stat.keyword}
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xs sm:text-sm text-rose-400 group-hover:text-rose-300 font-extrabold font-mono transition-colors">
                    {stat.volume}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400">/ mo</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-2.5">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🐘</span>
              <span className="text-xl font-black text-white">
                WhiteElephant<span className="text-rose-500">HQ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier interactive companion and gift directory for holiday White Elephant, Dirty Santa, and Secret Santa gift exchanges.
            </p>
          </div>

          <div>
            <h5 className="text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2.5 sm:mb-3">
              Gift Categories
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li>
                <Link to="/?category=funny#gifts" className="hover:text-white transition-colors">
                  Funny White Elephant Gifts (201K)
                </Link>
              </li>
              <li>
                <Link to="/?category=best#gifts" className="hover:text-white transition-colors">
                  Best White Elephant Gifts (201K)
                </Link>
              </li>
              <li>
                <Link to="/?category=all#gifts" className="hover:text-white transition-colors">
                  All White Elephant Gifts (246K)
                </Link>
              </li>
              <li>
                <Link to="/secret-santa" className="hover:text-white transition-colors">
                  Secret Santa Gift Ideas (135K)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2.5 sm:mb-3">
              Game Rules & Tools
            </h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li>
                <Link to="/rules" className="hover:text-white transition-colors">
                  White Elephant Rules (450K)
                </Link>
              </li>
              <li>
                <Link to="/rules#step-5" className="hover:text-white transition-colors">
                  The 3-Steal Freeze Rule
                </Link>
              </li>
              <li>
                <Link to="/party-tool" className="hover:text-white transition-colors">
                  Digital Turn Number Drawer
                </Link>
              </li>
              <li>
                <Link to="/party-tool" className="hover:text-white transition-colors">
                  Live Steal Counter Board
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2.5 sm:mb-3">
              Holiday Guarantee
            </h5>
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Curated & Tested</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Every gift is hand-selected based on real reviews, prime delivery reliability, and maximum party steal potential.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {CURRENT_YEAR} WhiteElephantHQ. All rights reserved. Created with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Built for joyful holiday parties <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  )
}
