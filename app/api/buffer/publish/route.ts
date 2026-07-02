import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { publishSocialPostToBuffer } from '@/lib/buffer/publish'

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as { socialPostId?: string }

    if (!body.socialPostId) {
      return NextResponse.json(
        { error: 'socialPostId is required.' },
        { status: 400 },
      )
    }

    const socialPost = await payload.findByID({
      collection: 'social-posts',
      id: body.socialPostId,
      depth: 2,
    })

    const bufferSettings = await payload.findGlobal({
      slug: 'buffer-settings',
    })

    await payload.update({
      collection: 'social-posts',
      id: body.socialPostId,
      data: {
        bufferStatus: 'pending',
        errorLog: '',
      },
    })

    const { results, errors } = await publishSocialPostToBuffer(
      socialPost,
      bufferSettings.channels ?? [],
    )

    const bufferStatus =
      errors.length > 0 && results.length > 0
        ? 'scheduled'
        : socialPost.scheduleMode === 'now'
          ? 'published'
          : 'scheduled'

    await payload.update({
      collection: 'social-posts',
      id: body.socialPostId,
      data: {
        bufferStatus: errors.length === results.length ? 'failed' : bufferStatus,
        bufferPostIds: results.map((result) => ({
          channel: result.channel,
          postId: result.postId,
        })),
        errorLog: errors.join('\n'),
      },
    })

    return NextResponse.json({
      message:
        errors.length > 0
          ? `Published with warnings: ${errors.join(' | ')}`
          : 'Published to Buffer successfully.',
      results,
      errors,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to publish to Buffer.',
      },
      { status: 500 },
    )
  }
}
