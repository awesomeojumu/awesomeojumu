const TWITTER_LIMIT = 280
const INSTAGRAM_LIMIT = 2200

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
}

export function buildPostUrl(slug: string) {
  return `${getSiteUrl()}/words/${slug}`
}

function truncateText(text: string, maxLength: number, suffix = '…') {
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength - suffix.length).trimEnd()}${suffix}`
}

export function buildBlogSocialCaptions(input: {
  teaser: string
  slug: string
}) {
  const teaser = input.teaser.trim()
  const url = buildPostUrl(input.slug)
  const readMoreLine = `Read more: ${url}`

  const caption = `${teaser}\n\n${readMoreLine}`

  const twitterSuffix = `\n\n${url}`
  const twitterTeaserMax = TWITTER_LIMIT - twitterSuffix.length - 1
  const twitter = `${truncateText(teaser, twitterTeaserMax)}\n\n${url}`

  const instagramSuffix = '\n\nFull piece on the site — link in bio.'
  const instagramTeaserMax = INSTAGRAM_LIMIT - instagramSuffix.length
  const instagram = `${truncateText(teaser, instagramTeaserMax)}${instagramSuffix}`

  return {
    caption,
    platformVariants: {
      linkedin: caption,
      instagram,
      twitter,
    },
    postUrl: url,
  }
}

export const SOCIAL_CHARACTER_LIMITS = {
  twitter: TWITTER_LIMIT,
  instagram: INSTAGRAM_LIMIT,
  linkedin: 3000,
} as const
