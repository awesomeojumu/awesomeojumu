import type { CollectionConfig } from 'payload'
import { publishedReadAccess, isAdmin } from '@/lib/access'
import { statusField } from '@/fields/status'
import { socialPublishingFields } from '@/fields/socialPublishing'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    group: 'Profile',
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'category', 'status', 'date'],
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
    {
      name: 'issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Ministry / Chaplaincy', value: 'ministry-chaplaincy' },
        { label: 'Project Management', value: 'project-management' },
        { label: 'Business & Strategy', value: 'business-strategy' },
        { label: 'Technical', value: 'technical' },
        { label: 'Soft Skills & Marketing', value: 'soft-skills-marketing' },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      admin: {
        description:
          'Optional context — reaffirmation dates, exam status, attendance vs. full certification, etc.',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'certStatus',
      type: 'select',
      defaultValue: 'completed',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
      ],
      required: true,
    },
    {
      name: 'credentialUrl',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    statusField,
    ...socialPublishingFields,
  ],
}
