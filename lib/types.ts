export type PublicProjectData = {
  date?: string,
  imageFile?: string,
  description: string,
  title: string,
  url: string
}

export type PublicProjectsData = {
  [key: string]: PublicProjectData
}
