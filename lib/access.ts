import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => Boolean(req.user)

export const adminOnly = {
  create: isAdmin,
  delete: isAdmin,
  read: isAdmin,
  update: isAdmin,
}

export const publishedReadAccess: Access = ({ req }) => {
  if (req.user) return true

  return {
    status: {
      equals: 'published',
    },
  }
}

export const publicReadAdminWrite = {
  create: isAdmin,
  delete: isAdmin,
  read: () => true,
  update: isAdmin,
}

export const adminFieldAccess: FieldAccess = ({ req }) => Boolean(req.user)
