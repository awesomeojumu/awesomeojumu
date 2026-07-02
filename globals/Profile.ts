import type { GlobalConfig } from 'payload'
import { publicReadAdminWrite } from '@/lib/access'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile',
  admin: {
    group: 'Site',
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      defaultValue: 'Ayobami Ojumu',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'iam@awesomeojumu.com',
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Ogun State, Nigeria',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional portrait for the About page.',
      },
    },
    {
      name: 'availability',
      type: 'group',
      label: 'Availability badge',
      admin: {
        description:
          'Reused on Contact and optionally Home. Amber “live” indicator when enabled.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Available for new work',
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'live',
          options: [
            { label: 'Live', value: 'live' },
            { label: 'Limited', value: 'limited' },
            { label: 'Away', value: 'away' },
          ],
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue:
        'Google-certified Project Manager and front-end developer building projects with kingdom impact.',
    },
    {
      name: 'heroEyebrow',
      type: 'text',
      admin: {
        description: 'Short mono line above your name on the homepage hero.',
      },
      defaultValue: 'Project lead · Builder · Operator',
    },
    {
      name: 'heroIntro',
      type: 'textarea',
      admin: {
        description: 'One-line positioning statement on the homepage hero.',
      },
      defaultValue:
        'I reconcile messy data, scattered stakeholder demands, and ambiguous requirements into systems people can trust.',
    },
    {
      name: 'heroStats',
      type: 'array',
      maxRows: 3,
      admin: {
        description:
          'Homepage stat readouts (up to 3). Value counts up on first view.',
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
          admin: {
            description: 'Upper label, e.g. RECORDS',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Lower label, e.g. RECONCILED',
          },
        },
      ],
    },
    {
      name: 'heroPrimaryCta',
      type: 'text',
      defaultValue: 'See the work',
    },
    {
      name: 'heroSecondaryCta',
      type: 'text',
      defaultValue: 'Get in touch',
    },
    {
      name: 'featuredSectionLabel',
      type: 'text',
      defaultValue: 'Featured work',
    },
    {
      name: 'footerLine',
      type: 'text',
      defaultValue:
        'Ayobami Ojumu — project manager, front-end developer, builder.',
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© Ayobami Ojumu',
          admin: {
            description: 'Copyright line in mono at the bottom of the site.',
          },
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showSocialLinks',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'contactStrip',
      type: 'group',
      label: 'Homepage contact strip',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          defaultValue: 'Next step',
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            "Building something that needs clarity? Let's talk.",
        },
        {
          name: 'primaryLabel',
          type: 'text',
          defaultValue: 'Contact',
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          defaultValue: 'All work',
        },
      ],
    },
    {
      name: 'workPage',
      type: 'group',
      label: 'Work page',
      fields: [
        {
          name: 'lead',
          type: 'textarea',
          defaultValue:
            'Systems I’ve built, problems I’ve solved.',
        },
        {
          name: 'closingCta',
          type: 'group',
          label: 'Closing CTA',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Have something similar to build?',
            },
            {
              name: 'buttonLabel',
              type: 'text',
              defaultValue: 'Contact',
            },
          ],
        },
      ],
    },
    {
      name: 'wordsPage',
      type: 'group',
      label: 'Words page',
      fields: [
        {
          name: 'lead',
          type: 'textarea',
          defaultValue:
            'Essays, ideas, and practical solutions for project leaders and builders.',
        },
      ],
    },
    {
      name: 'contactPage',
      type: 'group',
      label: 'Contact page',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Contact',
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Get in touch',
        },
        {
          name: 'lead',
          type: 'textarea',
          defaultValue:
            'For consulting inquiries, ministry coordination, or product collaboration.',
        },
        {
          name: 'showAvailabilityBadge',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show the Profile availability badge on Contact.',
          },
        },
        {
          name: 'formEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'submitLabel',
          type: 'text',
          defaultValue: 'Send message',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          defaultValue:
            'Thanks — your message was received. I’ll get back to you soon.',
        },
        {
          name: 'inquiryTypes',
          type: 'array',
          label: 'Inquiry types',
          admin: {
            description:
              'Routes inquiries by intent. One inbox is fine — types help you triage in admin.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'Stable slug, e.g. planexi-consulting',
              },
            },
          ],
          defaultValue: [
            { label: 'Planexi consulting', value: 'planexi-consulting' },
            { label: 'RCI / ministry', value: 'rci-ministry' },
            { label: 'Product collaboration', value: 'product-collaboration' },
            { label: 'General', value: 'general' },
          ],
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'nameMeanings',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'meaning',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
