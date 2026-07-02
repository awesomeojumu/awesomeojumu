'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

export function PublishToBufferButton() {
  const { id, collectionSlug } = useDocumentInfo()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePublish = async () => {
    if (!id || collectionSlug !== 'social-posts') {
      setStatus('Save this social post before publishing.')
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/buffer/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socialPostId: id }),
      })

      const data = (await response.json()) as {
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish to Buffer.')
      }

      setStatus(data.message || 'Published to Buffer successfully.')
      window.location.reload()
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to publish to Buffer.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Button buttonStyle="primary" disabled={loading} onClick={handlePublish}>
        {loading ? 'Publishing...' : 'Publish to Buffer'}
      </Button>
      {status ? <p>{status}</p> : null}
    </div>
  )
}
