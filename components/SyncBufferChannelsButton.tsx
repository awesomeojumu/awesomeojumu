'use client'

import { Button } from '@payloadcms/ui'
import { useState } from 'react'

export function SyncBufferChannelsButton() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/buffer/channels', {
        method: 'POST',
      })

      const data = (await response.json()) as {
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync Buffer channels.')
      }

      setStatus(data.message || 'Buffer channels synced.')
      window.location.reload()
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to sync Buffer channels.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Button buttonStyle="secondary" disabled={loading} onClick={handleSync}>
        {loading ? 'Syncing...' : 'Sync Channels from Buffer'}
      </Button>
      {status ? <p>{status}</p> : null}
    </div>
  )
}
