export type PublicProjectData = {
  date?: {
    seconds: number,
    milliseconds: number
  },
  description: string,
  title: string,
  url: string
}

export type PublicProjectsData = {
  [key: string]: PublicProjectData
}
