import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { publishedReadAccess, isAdmin } from '@/lib/access'
import { statusField } from '@/fields/status'
import { socialPublishingFields } from '@/fields/socialPublishing'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Thought',
    plural: 'My Thoughts',
  },
  admin: {
    group: 'Content',
    description: 'Essays, ideas, and written pieces',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publishedReadAccess,
    update: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on the Words listing and post page. Used for social if no social teaser is set.',
      },
    },
    {
      name: 'socialTeaser',
      type: 'textarea',
      admin: {
        description:
          'Optional punchier line for social posts. Falls back to excerpt. Auto-appended with a link to this post when promoting.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readTimeMinutes',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated read time shown in mono on the Words list.',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Ayobami Ojumu',
      admin: {
        position: 'sidebar',
      },
    },
    statusField,
    ...socialPublishingFields,
  ],
}
