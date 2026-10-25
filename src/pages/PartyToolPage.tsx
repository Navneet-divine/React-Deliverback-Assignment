import React from 'react'
import { Link } from 'react-router-dom'
import { PartyAssistant } from '@/components/PartyAssistant'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Tv, Smartphone } from 'lucide-react'

export const PartyToolPage: React.FC = () => {

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Responsive Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 sm:pb-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Gifts
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              White Elephant Live Party Companion
            </h1>
            <Badge variant="festive" className="text-[10px] sm:text-xs uppercase font-extrabold">
              Free App
            </Badge>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Designed specifically for hosts during actual game night. Draw numbers fairly and enforce the 3-steal limit with zero arguments.
          </p>
        </div>

        {/* Device casting tip */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-100/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 text-slate-700 text-xs shrink-0">
          <div className="flex -space-x-1 shrink-0">
            <Tv className="w-4 sm:w-5 h-4 sm:h-5 text-rose-600" />
            <Smartphone className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
          </div>
          <span className="font-medium text-[11px] sm:text-xs">
            <strong>Host Tip:</strong> Cast to your TV or tablet!
          </span>
        </div>
      </div>

      {/* The Interactive Tools */}
      <PartyAssistant />

      {/* Rules Quick Link */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1 text-left">
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
            Not sure how the 3-steal freeze or Player 1 final turn works?
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Check our official rule guide for step-by-step instructions and dispute resolutions.
          </p>
        </div>
        <Link to="/rules" className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto font-bold cursor-pointer text-xs h-9">
            <BookOpen className="w-4 h-4 mr-1.5" /> Read The Rulebook
          </Button>
        </Link>
      </div>
    </div>
  )
}
