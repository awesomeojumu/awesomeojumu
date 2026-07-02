import type { Media } from '@/payload-types'
import { createBufferPost } from './mutations'
import {
  fetchBufferChannels,
  mapServiceToChannelKey,
} from './channels'

type SocialPostDoc = {
  id: string
  caption: string
  channels: Array<'linkedin' | 'instagram' | 'twitter'>
  scheduleMode: 'now' | 'queue' | 'scheduled'
  scheduledAt?: string | null
  platformVariants?: {
    linkedin?: string | null
    instagram?: string | null
    twitter?: string | null
  } | null
  media?: Array<{
    url?: string | null
    image?: Media | string | null
  }> | null
}

type CachedChannel = {
  channelId: string
  service?: 'linkedin' | 'instagram' | 'twitter' | null
}

function getMediaUrl(media?: SocialPostDoc['media']) {
  if (!media?.length) return []

  return media
    .map((item) => {
      if (item.url) return item.url

      if (item.image && typeof item.image === 'object') {
        return (
          item.image.cloudinaryUrl ||
          item.image.url ||
          null
        )
      }

      return null
    })
    .filter((url): url is string => Boolean(url))
}

function getCaptionForChannel(
  socialPost: SocialPostDoc,
  channel: 'linkedin' | 'instagram' | 'twitter',
) {
  const variant = socialPost.platformVariants?.[channel]
  return variant?.trim() || socialPost.caption
}

export async function publishSocialPostToBuffer(
  socialPost: SocialPostDoc,
  cachedChannels: CachedChannel[],
) {
  const { channels: liveChannels } = await fetchBufferChannels()

  const channelMap = new Map<string, string>()

  for (const cached of cachedChannels) {
    if (cached.service) {
      channelMap.set(cached.service, cached.channelId)
    }
  }

  for (const live of liveChannels) {
    const key = mapServiceToChannelKey(live.service)
    if (key === 'linkedin' || key === 'instagram' || key === 'twitter') {
      channelMap.set(key, live.id)
    }
  }

  const mediaUrls = getMediaUrl(socialPost.media)
  const results: Array<{ channel: string; postId: string }> = []
  const errors: string[] = []

  for (const channel of socialPost.channels) {
    const channelId = channelMap.get(channel)

    if (!channelId) {
      errors.push(`No Buffer channel configured for ${channel}.`)
      continue
    }

    try {
      const postId = await createBufferPost({
        channelId,
        text: getCaptionForChannel(socialPost, channel),
        mode: socialPost.scheduleMode,
        scheduledAt: socialPost.scheduledAt ?? undefined,
        mediaUrls,
      })

      results.push({ channel, postId })
    } catch (error) {
      errors.push(
        `${channel}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  if (!results.length) {
    throw new Error(errors.join(' | ') || 'No posts were published to Buffer.')
  }

  return {
    results,
    errors,
  }
}
