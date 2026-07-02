import { bufferRequest } from './client'

export type BufferScheduleMode = 'now' | 'queue' | 'scheduled'

export type CreateBufferPostInput = {
  channelId: string
  text: string
  mode: BufferScheduleMode
  scheduledAt?: string
  mediaUrls?: string[]
}

type CreatePostResponse = {
  createPost:
    | {
        post: {
          id: string
        }
      }
    | {
        message: string
      }
}

const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on PostActionSuccess {
        post {
          id
        }
      }
      ... on MutationError {
        message
      }
    }
  }
`

function toBufferMode(mode: BufferScheduleMode) {
  switch (mode) {
    case 'now':
      return 'shareNow'
    case 'scheduled':
      return 'customScheduled'
    default:
      return 'addToQueue'
  }
}

export async function createBufferPost(input: CreateBufferPostInput) {
  const assets =
    input.mediaUrls?.map((url) => ({
      url,
      type: 'image',
    })) ?? []

  const variables = {
    input: {
      channelId: input.channelId,
      text: input.text,
      schedulingType: 'automatic',
      mode: toBufferMode(input.mode),
      ...(input.mode === 'scheduled' && input.scheduledAt
        ? { dueAt: input.scheduledAt }
        : {}),
      ...(assets.length > 0 ? { assets } : {}),
    },
  }

  const data = await bufferRequest<CreatePostResponse>(
    CREATE_POST_MUTATION,
    variables,
  )

  const result = data.createPost

  if ('message' in result) {
    throw new Error(result.message)
  }

  return result.post.id
}
