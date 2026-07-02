import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/lib/access'
import { applyBlogPostSocialFields } from '@/lib/social/from-post'
import { SOCIAL_CHARACTER_LIMITS } from '@/lib/social/captions'

export const SocialPosts: CollectionConfig = {
  slug: 'social-posts',
  admin: {
    group: 'Social',
    useAsTitle: 'title',
    defaultColumns: ['title', 'bufferStatus', 'scheduleMode', 'updatedAt'],
  },
  access: adminOnly,
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return data

        const sourceType = data.sourceType

        if (sourceType === 'projects' && data.sourceProject && !data.caption) {
          const project = await req.payload.findByID({
            collection: 'projects',
            id: data.sourceProject,
          })
          data.caption = project.excerpt
          data.title = data.title || `Promote: ${project.title}`
        }

        if (sourceType === 'posts' && data.sourcePost) {
          const post = await req.payload.findByID({
            collection: 'posts',
            id: data.sourcePost,
            depth: 1,
          })

          applyBlogPostSocialFields(data, post)
        }

        if (
          sourceType === 'certifications' &&
          data.sourceCertification &&
          !data.caption
        ) {
          const certification = await req.payload.findByID({
            collection: 'certifications',
            id: data.sourceCertification,
          })
          data.caption = `New certification milestone: ${certification.title} (${certification.issuer})`
          data.title = data.title || `Promote: ${certification.title}`
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal label for this social post.',
      },
    },
    {
      name: 'sourceType',
      type: 'select',
      options: [
        { label: 'Project', value: 'projects' },
        { label: 'Post', value: 'posts' },
        { label: 'Certification', value: 'certifications' },
        { label: 'Standalone', value: 'standalone' },
      ],
    },
    {
      name: 'sourceProject',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        condition: (_, siblingData) => siblingData?.sourceType === 'projects',
      },
    },
    {
      name: 'sourcePost',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        condition: (_, siblingData) => siblingData?.sourceType === 'posts',
      },
    },
    {
      name: 'sourceCertification',
      type: 'relationship',
      relationTo: 'certifications',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.sourceType === 'certifications',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Default caption for Buffer. For blog posts, auto-fills as excerpt + Read more link.',
      },
    },
    {
      name: 'platformVariants',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'textarea',
          admin: {
            description: `LinkedIn caption (up to ${SOCIAL_CHARACTER_LIMITS.linkedin} chars).`,
          },
        },
        {
          name: 'instagram',
          type: 'textarea',
          admin: {
            description: `Instagram caption (up to ${SOCIAL_CHARACTER_LIMITS.instagram} chars).`,
          },
        },
        {
          name: 'twitter',
          type: 'textarea',
          admin: {
            description: `X caption (up to ${SOCIAL_CHARACTER_LIMITS.twitter} chars, auto-truncated).`,
          },
        },
      ],
    },
    {
      name: 'channels',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Twitter / X', value: 'twitter' },
      ],
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Optional direct public URL override for Buffer.',
          },
        },
      ],
    },
    {
      name: 'scheduleMode',
      type: 'select',
      defaultValue: 'queue',
      required: true,
      options: [
        { label: 'Publish Now', value: 'now' },
        { label: 'Add to Queue', value: 'queue' },
        { label: 'Schedule', value: 'scheduled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.scheduleMode === 'scheduled',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'bufferStatus',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'bufferPostIds',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'channel',
          type: 'text',
        },
        {
          name: 'postId',
          type: 'text',
        },
      ],
    },
    {
      name: 'errorLog',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'publishAction',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/PublishToBufferButton#PublishToBufferButton',
        },
      },
    },
  ],
}
