import { StringLike } from "@firebase/util"

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

export type PublicLinksData = {
  instagram: string,
  youtube: string,
  mail: string
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

export type GithubProfileData = {
  login: string, // basically the username
  html_url: string
  company: string,
  bio: string,
  public_repos: number
}

export type GithubRepoData = {
  name: string,
  html_url: string,
  description: string,
  language: string,
  updated_at: string
}

export type YouTubeProfileData = {
  id: string,
  statistics: {
    videoCount: string
  },
  brandingSettings: {
    channel: {
      title: string,
      description: string
    }
  }
}

export type YouTubePostData = {
  id: {
    kind: string,
    videoId: string
  },
  snippet: {
    publishedAt: string,
    title: string,
    description: string
  }
}


export type EmailingStatus = {
  sent: boolean,
  resultMessage: any,
}

export type EmailingApiResponse = {
  status: number,
  error?: string,
  message?: string,
  userMessage: string 
  // * string that is displayed to the user as a response 
}

export type ContactBody = {
  name: string,
  email: string,
  title: string,
  selfDescription: string,
  projectDescription: string
}