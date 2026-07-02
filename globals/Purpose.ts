import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/lib/access'

export const Purpose: GlobalConfig = {
  slug: 'purpose',
  label: 'Purpose Sheet (Private)',
  admin: {
    group: 'Site',
  },
  access: adminOnly,
  fields: [
    {
      name: 'ministry',
      type: 'textarea',
      required: true,
    },
    {
      name: 'mission',
      type: 'textarea',
      required: true,
    },
    {
      name: 'purposeStatement',
      type: 'textarea',
      required: true,
    },
    {
      name: 'kingdomPlacement',
      type: 'array',
      fields: [
        {
          name: 'mountain',
          type: 'text',
        },
      ],
    },
    {
      name: 'scriptures',
      type: 'array',
      fields: [
        {
          name: 'reference',
          type: 'text',
        },
        {
          name: 'note',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'shape',
      type: 'group',
      fields: [
        {
          name: 'spiritualGifts',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'heart',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'abilities',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'personality',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'experiences',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'prophecies',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'problems',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'admirations',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'note', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
