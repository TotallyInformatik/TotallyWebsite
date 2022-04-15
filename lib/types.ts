export type PublicProjectData = {
  date?: string,
  description: string,
  title: string,
  url: string
}

export type PublicProjectsData = {
  [key: string]: PublicProjectData
}
