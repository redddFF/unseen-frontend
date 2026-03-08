'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface WarningModalOptions {
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

interface WarningModalState extends WarningModalOptions {
  isOpen: boolean
}

interface WarningModalContextType {
  showWarning: (options: WarningModalOptions) => void
  closeWarning: () => void
}

const WarningModalContext = createContext<WarningModalContextType | undefined>(undefined)

const initialState: WarningModalState = {
  isOpen: false,
  title: 'Warning',
  message: '',
  actionLabel: 'OK',
}

export function WarningModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<WarningModalState>(initialState)

  const closeWarning = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const showWarning = useCallback((options: WarningModalOptions) => {
    setModal({
      isOpen: true,
      title: options.title ?? 'Warning',
      message: options.message,
      actionLabel: options.actionLabel ?? 'OK',
      onAction: options.onAction,
    })
  }, [])

  const handleAction = useCallback(() => {
    if (modal.onAction) {
      modal.onAction()
    }
    closeWarning()
  }, [modal, closeWarning])

  const value = useMemo(
    () => ({ showWarning, closeWarning }),
    [showWarning, closeWarning]
  )

  return (
    <WarningModalContext.Provider value={value}>
      {children}

      {modal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <button
            aria-label="Close warning modal"
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={closeWarning}
          />

          <div
            className="relative w-full max-w-md border p-6 md:p-8"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-primary)',
            }}
          >
            <p
              className="text-10 mb-4"
              style={{
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {modal.title}
            </p>

            <p
              className="text-13 mb-6"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
              }}
            >
              {modal.message}
            </p>

            <button
              type="button"
              className="w-full border px-4 py-3 text-11 font-bold uppercase transition-all duration-300"
              style={{
                borderColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                backgroundColor: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0000ff'
                e.currentTarget.style.color = '#0000ff'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)'
                e.currentTarget.style.color = 'var(--bg-primary)'
                e.currentTarget.style.backgroundColor = 'var(--text-primary)'
              }}
              onClick={handleAction}
            >
              {modal.actionLabel}
            </button>
          </div>
        </div>
      )}
    </WarningModalContext.Provider>
  )
}

export function useWarningModal() {
  const context = useContext(WarningModalContext)

  if (!context) {
    throw new Error('useWarningModal must be used within WarningModalProvider')
  }

  return context
}
