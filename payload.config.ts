import path from 'path'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Certifications } from './collections/Certifications'
import { ContactInquiries } from './collections/ContactInquiries'
import { Education } from './collections/Education'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { SocialPosts } from './collections/SocialPosts'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { BufferSettings } from './globals/BufferSettings'
import { Profile } from './globals/Profile'
import { Purpose } from './globals/Purpose'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      title: 'Ayobami Ojumu CMS',
      description: 'Content management for awesomeojumu.com',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Media,
    Tags,
    Projects,
    Posts,
    ContactInquiries,
    Certifications,
    Skills,
    Education,
    SocialPosts,
    Users,
  ],
  globals: [Profile, Purpose, BufferSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/awesomeojumu',
  }),
  sharp,
  plugins: [
    payloadCloudinaryPlugin({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      },
      folder: process.env.CLOUDINARY_FOLDER || 'awesomeojumu',
      clientUploads: true,
      useFilename: true,
    }),
  ],
})
