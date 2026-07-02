import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { publishedReadAccess, isAdmin } from '@/lib/access'
import { statusField } from '@/fields/status'
import { socialPublishingFields } from '@/fields/socialPublishing'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Content',
    description: 'Published work and case studies',
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder', 'displayType', 'status'],
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
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        description: 'Lower numbers appear first on the Work page.',
        position: 'sidebar',
      },
    },
    {
      name: 'displayType',
      type: 'select',
      required: true,
      defaultValue: 'case-study',
      options: [
        { label: 'Case Study', value: 'case-study' },
        { label: 'Mention', value: 'mention' },
      ],
      admin: {
        description:
          'Case studies get a detail page. Mentions appear as a short card only.',
        position: 'sidebar',
      },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the homepage featured work grid.',
      },
    },
    {
      name: 'homeFeatureOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the homepage featured grid.',
        condition: (_, siblingData) => Boolean(siblingData?.featuredOnHome),
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Short positioning line shown under the project title.',
      },
    },
    {
      name: 'oneLineOutcome',
      type: 'text',
      admin: {
        description:
          'Single-line outcome for Work grid cards, e.g. “14k records reconciled across 8 countries”.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'problemStatement',
      type: 'textarea',
      admin: {
        description: 'The problem or context this project addresses.',
      },
    },
    {
      name: 'whatIBuilt',
      type: 'array',
      label: 'What I Built',
      fields: [
        {
          name: 'item',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'whereItStands',
      type: 'textarea',
      admin: {
        description: 'Current status, traction, or delivery outcome.',
      },
    },
    {
      name: 'projectStage',
      type: 'select',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Beta', value: 'beta' },
        { label: 'In UAT', value: 'uat' },
        { label: 'Proposal / Awaiting Sign-off', value: 'proposal' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'In Development', value: 'in-development' },
        { label: 'Early Roots / Internship', value: 'early-roots' },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: {
        description: 'Optional live product or demo URL.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Optional long-form narrative. Card pages use structured fields above.',
      },
    },
    {
      name: 'outcomes',
      type: 'array',
      fields: [
        {
          name: 'metric',
          type: 'text',
          admin: {
            description: 'e.g. 400% enrollment increase',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'outcomeStats',
      type: 'array',
      label: 'Outcome stats',
      admin: {
        description:
          'Numeric highlights for case study pages — the numbers that actually matter.',
      },
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
        },
        {
          name: 'sublabel',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
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
