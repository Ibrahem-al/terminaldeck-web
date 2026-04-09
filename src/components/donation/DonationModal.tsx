import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface DonationModalProps {
  isOpen: boolean
  onDismiss: () => void
  onDonate: () => void
}

export function DonationModal({ isOpen, onDismiss, onDonate }: DonationModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onDismiss])

  const handleDonate = () => {
    onDonate()
    navigate('/donate')
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onDismiss}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-strong rounded-2xl p-8 max-w-md w-full border border-border"
          >
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg font-mono font-bold">
                <span className="text-cyan">{'>'}</span>
                <span className="text-text">_</span>
              </span>
              <span className="text-sm font-mono font-semibold text-text-mid tracking-wide">
                Support TerminalDeck
              </span>
            </div>

            <p className="text-text-mid text-[15px] leading-relaxed mb-8">
              TerminalDeck is free and open source. If it saves you time,
              consider supporting development so it can keep getting better.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDonate}
                className="w-full px-6 py-3 rounded-lg font-semibold text-void bg-cyan hover:brightness-110 transition-all glow-box"
              >
                Support the Project
              </button>
              <button
                onClick={onDismiss}
                autoFocus
                className="w-full px-6 py-3 rounded-lg font-semibold text-text-mid border border-border hover:border-cyan/30 hover:text-text transition-all"
              >
                No thanks, just download
              </button>
            </div>

            <p className="text-center text-[12px] text-text-dim mt-4">
              Your download will start either way.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
