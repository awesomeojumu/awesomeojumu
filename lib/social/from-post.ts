import { buildBlogSocialCaptions } from './captions'

type BlogPostSource = {
  id: string
  title: string
  slug: string
  excerpt: string
  socialTeaser?: string | null
  coverImage?: string | { id: string } | null
}

function getCoverImageId(
  coverImage?: string | { id: string } | null,
): string | null {
  if (!coverImage) return null

  return typeof coverImage === 'object' ? coverImage.id : coverImage
}

export function buildSocialPostDataFromBlogPost(post: BlogPostSource) {
  const teaser = post.socialTeaser?.trim() || post.excerpt.trim()
  const { caption, platformVariants } = buildBlogSocialCaptions({
    teaser,
    slug: post.slug,
  })
  const coverImageId = getCoverImageId(post.coverImage)

  return {
    title: `Promote: ${post.title}`,
    sourceType: 'posts' as const,
    sourcePost: post.id,
    caption,
    platformVariants,
    channels: ['linkedin', 'instagram', 'twitter'] as Array<
      'linkedin' | 'instagram' | 'twitter'
    >,
    media: coverImageId ? [{ image: coverImageId }] : [],
    scheduleMode: 'queue' as const,
    bufferStatus: 'draft' as const,
  }
}

export function applyBlogPostSocialFields(
  data: Record<string, unknown>,
  post: BlogPostSource,
) {
  const social = buildSocialPostDataFromBlogPost(post)

  if (!data.title) {
    data.title = social.title
  }

  if (!data.caption) {
    data.caption = social.caption
  }

  const variants =
    (data.platformVariants as Record<string, string | undefined> | undefined) ??
    {}

  data.platformVariants = {
    linkedin: variants.linkedin || social.platformVariants.linkedin,
    instagram: variants.instagram || social.platformVariants.instagram,
    twitter: variants.twitter || social.platformVariants.twitter,
  }

  if (!Array.isArray(data.media) || data.media.length === 0) {
    data.media = social.media
  }

  if (!Array.isArray(data.channels) || data.channels.length === 0) {
    data.channels = social.channels
  }

  return data
}
