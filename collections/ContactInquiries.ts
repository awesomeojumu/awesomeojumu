import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/lib/access'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  labels: {
    singular: 'Contact inquiry',
    plural: 'Contact inquiries',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'inquiryType', 'status', 'createdAt'],
    description: 'Submissions from the public contact form.',
  },
  access: {
    create: () => true,
    read: adminOnly.read,
    update: adminOnly.update,
    delete: adminOnly.delete,
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'inquiryType',
      type: 'text',
      required: true,
      admin: {
        description: 'Matches a Profile → Contact page inquiry type value.',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
