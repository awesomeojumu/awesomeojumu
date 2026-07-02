const BUFFER_API_URL = 'https://api.buffer.com'

type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function bufferRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = process.env.BUFFER_ACCESS_TOKEN

  if (!token) {
    throw new Error('BUFFER_ACCESS_TOKEN is not configured.')
  }

  const response = await fetch(BUFFER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = (await response.json()) as GraphQLResponse<T>

  if (!response.ok || json.errors?.length) {
    const message =
      json.errors?.map((error) => error.message).join(', ') ||
      `Buffer API request failed with status ${response.status}`
    throw new Error(message)
  }

  if (!json.data) {
    throw new Error('Buffer API returned no data.')
  }

  return json.data
}
