import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/lib/access'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    group: 'Profile',
    useAsTitle: 'degree',
    defaultColumns: ['degree', 'institution', 'conferredDate', 'eduStatus'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'honors',
      type: 'text',
      admin: {
        description: 'Optional distinction or honors, e.g. "with Distinction", "Hons".',
      },
    },
    {
      name: 'conferredDate',
      type: 'date',
      admin: {
        description: 'Date the qualification was conferred or awarded.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'eduStatus',
      type: 'select',
      defaultValue: 'in-view',
      options: [
        { label: 'In View', value: 'in-view' },
        { label: 'Completed', value: 'completed' },
      ],
      required: true,
    },
  ],
}
