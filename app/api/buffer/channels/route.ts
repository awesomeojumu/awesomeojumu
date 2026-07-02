import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import {
  fetchBufferChannels,
  mapServiceToChannelKey,
} from '@/lib/buffer/channels'

export async function POST() {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { organizationId, channels } = await fetchBufferChannels()

    const mappedChannels = channels
      .map((channel) => {
        const service = mapServiceToChannelKey(channel.service)

        if (
          service !== 'linkedin' &&
          service !== 'instagram' &&
          service !== 'twitter'
        ) {
          return null
        }

        return {
          channelId: channel.id,
          name: channel.name,
          service: service as 'linkedin' | 'instagram' | 'twitter',
        }
      })
      .filter((channel): channel is NonNullable<typeof channel> => Boolean(channel))

    await payload.updateGlobal({
      slug: 'buffer-settings',
      data: {
        organizationId: organizationId ?? undefined,
        channels: mappedChannels,
        lastSyncedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      message: `Synced ${mappedChannels.length} Buffer channels.`,
      channels: mappedChannels,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to sync Buffer channels.',
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bufferSettings = await payload.findGlobal({
      slug: 'buffer-settings',
    })

    return NextResponse.json(bufferSettings)
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch Buffer settings.',
      },
      { status: 500 },
    )
  }
}
