import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Home, BookOpen, Dices, Gift } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[65vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full text-center p-8 sm:p-12 shadow-xl border-slate-200 rounded-3xl bg-white space-y-6 animate-in zoom-in-95 duration-200">
        {/* Festive Lost Elephant & Gift illustration */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-50 border-2 border-dashed border-rose-200 flex items-center justify-center mx-auto text-5xl sm:text-6xl animate-bounce">
            🐘
          </div>
          <span className="absolute -bottom-1 -right-1 text-3xl">🎁</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Badge variant="festive" className="text-xs font-mono font-bold uppercase tracking-wider">
              404 - Page Not Found
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Whoops! This Gift Has Vanished
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            The page you are looking for may have been stolen in the third round, unwrapped, or never existed in the gift pile!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto h-11 px-5 text-xs sm:text-sm font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
          </Button>

          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="festive"
              className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Helpful Popular Destinations */}
        <div className="pt-6 border-t border-slate-100 text-left space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
            Or Jump Straight To:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <Link
              to="/"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 transition-colors flex items-center gap-2 font-semibold text-slate-700"
            >
              <Gift className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="truncate">Gift Ideas</span>
            </Link>
            <Link
              to="/rules"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 transition-colors flex items-center gap-2 font-semibold text-slate-700"
            >
              <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">Game Rules</span>
            </Link>
            <Link
              to="/party-tool"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 transition-colors flex items-center gap-2 font-semibold text-slate-700"
            >
              <Dices className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Party Tool</span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NotFoundPage
