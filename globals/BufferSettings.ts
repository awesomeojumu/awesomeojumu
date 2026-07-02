import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/lib/access'

export const BufferSettings: GlobalConfig = {
  slug: 'buffer-settings',
  label: 'Buffer Settings',
  admin: {
    group: 'Social',
  },
  access: adminOnly,
  fields: [
    {
      name: 'organizationId',
      type: 'text',
      admin: {
        description: 'Cached Buffer organization ID.',
      },
    },
    {
      name: 'channels',
      type: 'array',
      admin: {
        description: 'Synced Buffer channels. Refresh from Buffer admin tools.',
      },
      fields: [
        {
          name: 'channelId',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'service',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter / X', value: 'twitter' },
          ],
        },
      ],
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'syncAction',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/SyncBufferChannelsButton#SyncBufferChannelsButton',
        },
      },
    },
  ],
}
