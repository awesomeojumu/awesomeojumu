import type { Field } from 'payload'

export const socialPublishingFields: Field[] = [
  {
    name: 'linkedSocialPost',
    type: 'relationship',
    relationTo: 'social-posts',
    admin: {
      position: 'sidebar',
      description: 'Linked social post for Buffer publishing.',
    },
  },
  {
    name: 'createSocialPostAction',
    type: 'ui',
    admin: {
      position: 'sidebar',
      components: {
        Field: '@/components/CreateSocialPostButton#CreateSocialPostButton',
      },
    },
  },
]
