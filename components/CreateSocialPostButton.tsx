'use client'

import { Button, useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useState } from 'react'

export function CreateSocialPostButton() {
  const { id, collectionSlug } = useDocumentInfo()
  const linkedSocialPost = useFormFields(([fields]) => fields.linkedSocialPost?.value)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (collectionSlug !== 'posts') {
    return null
  }

  const linkedId =
    typeof linkedSocialPost === 'object' && linkedSocialPost !== null
      ? (linkedSocialPost as { id?: string }).id
      : typeof linkedSocialPost === 'string'
        ? linkedSocialPost
        : null

  const handleCreate = async () => {
    if (!id) {
      setStatus('Save this blog post before creating a social post.')
      return
    }

    if (linkedId) {
      window.location.href = `/admin/collections/social-posts/${linkedId}`
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/social-posts/from-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id }),
      })

      const data = (await response.json()) as {
        socialPostId?: string
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create social post.')
      }

      if (data.socialPostId) {
        window.location.href = `/admin/collections/social-posts/${data.socialPostId}`
        return
      }

      setStatus(data.message || 'Social post created.')
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to create social post.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Button buttonStyle="secondary" disabled={loading} onClick={handleCreate}>
        {loading
          ? 'Creating...'
          : linkedId
            ? 'Open linked social post'
            : 'Create social post'}
      </Button>
      <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>
        Builds a draft with excerpt + link to /words/[slug], plus LinkedIn,
        Instagram, and X captions.
      </p>
      {status ? <p>{status}</p> : null}
    </div>
  )
}
