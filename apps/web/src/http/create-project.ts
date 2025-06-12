import { api } from './ky'

interface CreateProject {
  org: string
  name: string
  description: string
}

type CreateProjectResponse = void

export async function createProject({ name, description, org }: CreateProject) {
  const result = await api
    .post(`organizations/${org}/projects`, {
      json: { name, description },
    })
    .json<CreateProjectResponse>()
}
