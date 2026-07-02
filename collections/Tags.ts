import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { isAdmin } from '@/lib/access'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
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
    slugField({ fieldToUse: 'name' }),
    {
      name: 'showInWorkFilter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Show as a toggle on the Work page filter bar (e.g. Consulting, Kingdom-Tech).',
      },
    },
    {
      name: 'workFilterOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        description: 'Lower numbers appear first in the Work filter bar.',
        condition: (_, siblingData) => Boolean(siblingData?.showInWorkFilter),
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
