import React from 'react'
import { Link } from 'react-router-dom'
import { RulesSection } from '@/components/RulesSection'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Dices, Gift } from 'lucide-react'
export const RulesPage: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Page Breadcrumb / Navigation Banner */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Gifts
        </Link>
        <Badge variant="festive" className="text-[10px] sm:text-xs font-mono">
          Updated 2026
        </Badge>
      </div>

      {/* Main Rules Section */}
      <RulesSection />

      {/* Bottom Cross-Promotional Call to Action */}
      <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <Badge className="bg-white/20 text-white border-0 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
            Ready to Play?
          </Badge>
          <h3 className="text-xl sm:text-2xl font-black">
            Put These Rules into Action with Our Free Party Companion
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Forget cutting paper strips for numbers! Use our live turn number drawer with confetti and the automatic 3-steal tracker on your phone or laptop.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto">
          <Link to="/party-tool" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold cursor-pointer shadow-md text-xs sm:text-sm h-11"
            >
              <Dices className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-700" /> Open Live Party Tool
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-emerald-900 font-extrabold cursor-pointer text-xs sm:text-sm h-11 transition-all shadow-sm"
            >
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Browse Gifts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
