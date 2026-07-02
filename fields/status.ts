import type { Field } from 'payload'

export const statusField: Field = {
  name: 'status',
  type: 'select',
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
  required: true,
  admin: {
    position: 'sidebar',
  },
}
