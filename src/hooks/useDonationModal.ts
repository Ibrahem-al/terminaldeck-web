import { useState, useRef, useCallback } from 'react'

const STORAGE_KEY = 'donation-modal-dismissed'

function isDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function setDismissed(fallbackRef: React.MutableRefObject<boolean>) {
  fallbackRef.current = true
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // private browsing — fallback ref is already set
  }
}

export function useDonationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [pendingTarget, setPendingTarget] = useState<string>('_self')
  const dismissedRef = useRef(false)

  const interceptDownload = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dismissedRef.current || isDismissed()) return // let native <a> proceed
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
    setDismissed(dismissedRef)
    triggerPendingDownload()
    setIsOpen(false)
    setPendingUrl(null)
  }, [triggerPendingDownload])

  const closeForDonation = useCallback(() => {
    setDismissed(dismissedRef)
    triggerPendingDownload()
    setIsOpen(false)
    setPendingUrl(null)
  }, [triggerPendingDownload])

  return { isOpen, interceptDownload, dismiss, closeForDonation }
}
