import { bufferRequest } from './client'

export type BufferChannel = {
  id: string
  name: string
  displayName?: string
  service: string
}

type OrganizationsQueryResponse = {
  account: {
    organizations: Array<{
      id: string
      name?: string
    }>
  }
}

type ChannelsQueryResponse = {
  channels: BufferChannel[]
}

const ORGANIZATIONS_QUERY = `
  query GetOrganizations {
    account {
      organizations {
        id
        name
      }
    }
  }
`

const CHANNELS_QUERY = `
  query GetChannels($organizationId: OrganizationId!) {
    channels(input: { organizationId: $organizationId }) {
      id
      name
      displayName
      service
    }
  }
`

export async function fetchBufferChannels() {
  const orgData = await bufferRequest<OrganizationsQueryResponse>(
    ORGANIZATIONS_QUERY,
  )

  const organizations = orgData.account.organizations
  const organizationId = organizations[0]?.id

  if (!organizationId) {
    return {
      organizationId: null,
      channels: [],
    }
  }

  const channelData = await bufferRequest<ChannelsQueryResponse>(
    CHANNELS_QUERY,
    { organizationId },
  )

  const channels = channelData.channels.map((channel) => ({
    ...channel,
    organizationId,
    organizationName: organizations[0]?.name,
  }))

  return {
    organizationId,
    channels,
  }
}

export function mapServiceToChannelKey(service: string) {
  const normalized = service.toLowerCase()

  if (normalized.includes('linkedin')) return 'linkedin'
  if (normalized.includes('instagram')) return 'instagram'
  if (normalized.includes('twitter') || normalized === 'x') return 'twitter'

  return normalized
}
