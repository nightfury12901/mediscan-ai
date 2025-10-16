import { DiseaseCards } from '@/components/ui/DiseaseCards'
import { NetworkBackground } from '@/components/ui/NetworkBackground'

export default function DiseasesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <NetworkBackground />
      <div className="relative z-10">
        <DiseaseCards />
      </div>
    </div>
  )
}
