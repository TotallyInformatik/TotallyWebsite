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


export type InstagramPostData = {
  media_url: string,
  caption: string,
  permalink: string,
  id: string  
}

export type InstagramProfileData = {
  username: string,
  media_count: number
}