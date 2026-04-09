import { useState, useCallback } from 'react'

export function useDonationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [pendingTarget, setPendingTarget] = useState<string>('_self')

  const interceptDownload = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setPendingUrl(e.currentTarget.href)
    setPendingTarget(e.currentTarget.target || '_self')
    setIsOpen(true)
  }, [])

  const triggerPendingDownload = useCallback(() => {
    if (pendingUrl) {
      window.open(pendingUrl, pendingTarget)
    }
  }, [pendingUrl, pendingTarget])

  const dismiss = useCallback(() => {
    triggerPendingDownload()
    setIsOpen(false)
    setPendingUrl(null)
  }, [triggerPendingDownload])

  const closeForDonation = useCallback(() => {
    setIsOpen(false)
    setPendingUrl(null)
  }, [])

  return { isOpen, interceptDownload, dismiss, closeForDonation }
}
