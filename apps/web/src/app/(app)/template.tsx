'use client'

import Header from '@/components/header'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments()
  const isSheetOpen = segments.some((segment) => segment.startsWith('@'))

  return (
    <div className="space-y-4 py-4">
      {!isSheetOpen && <Header />}
      {children}
    </div>
  )
}
