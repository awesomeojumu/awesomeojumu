import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/lib/access'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    group: 'Profile',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category'],
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Project & Program Management', value: 'project-management' },
        { label: 'Technical / Development', value: 'technical' },
        { label: 'Data & Analysis', value: 'data-analysis' },
        { label: 'Business & Strategy', value: 'business-strategy' },
        { label: 'Tools', value: 'tools' },
        { label: 'Soft Skills', value: 'soft' },
      ],
    },
  ],
}
