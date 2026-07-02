import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { buildSocialPostDataFromBlogPost } from '@/lib/social/from-post'

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as { postId?: string }

    if (!body.postId) {
      return NextResponse.json({ error: 'postId is required.' }, { status: 400 })
    }

    const post = await payload.findByID({
      collection: 'posts',
      id: body.postId,
      depth: 1,
    })

    if (post.linkedSocialPost) {
      const existingId =
        typeof post.linkedSocialPost === 'object'
          ? post.linkedSocialPost.id
          : post.linkedSocialPost

      return NextResponse.json({
        socialPostId: existingId,
        message: 'A social post is already linked to this blog post.',
        created: false,
      })
    }

    const socialPost = await payload.create({
      collection: 'social-posts',
      data: buildSocialPostDataFromBlogPost(post),
    })

    await payload.update({
      collection: 'posts',
      id: body.postId,
      data: {
        linkedSocialPost: socialPost.id,
      },
    })

    return NextResponse.json({
      socialPostId: socialPost.id,
      message: 'Social post created with excerpt, link, and platform captions.',
      created: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create social post from blog post.',
      },
      { status: 500 },
    )
  }
}
