'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#333',
          border: '1px solid #e5e7eb',
          borderRadius: '0.625rem',
          fontSize: '0.875rem',
          padding: '12px 16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        success: {
          iconTheme: {
            primary: '#047544',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc2626',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}
