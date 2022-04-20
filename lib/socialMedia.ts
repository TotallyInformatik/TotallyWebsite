import { Octokit } from "@octokit/core";
import { google } from "googleapis";

export namespace Instagram {

  export async function getUserProfile() {

    const requestUrl = 
      `https://graph.instagram.com/me?fields=username,media_count&access_token=${process.env.SECRET_INSTAGRAM_ACCESS_TOKEN}`;

    const response: Response = await fetch(requestUrl, {
      method: "GET"
    });
  
    return response.json();
  
  }
  
  export async function getMostRecentPosts() {

    const requestUrl = 
      `https://graph.instagram.com/me/media?fields=media_url,caption,permalink&access_token=${process.env.SECRET_INSTAGRAM_ACCESS_TOKEN}`;

    const response: Response = await fetch(requestUrl, {
      method: "GET"
    });

    const posts: [] = (await response.json()).data;
    const postCount = 4;
    const mostRecentPosts = posts.slice(0, postCount);

    return mostRecentPosts;

  }

}

export namespace Github {

  export async function getUserProfile() {

    const octokit = new Octokit({ auth: process.env.SECRET_GITHUB_API_TOKEN });

    const response = await octokit.request("GET /user", {
      accept: "application/vnd.github.v3+json"
    });

    return response.data;

  }

  export async function getRepositories() {

    const octokit = new Octokit({ auth: process.env.SECRET_GITHUB_API_TOKEN });
    
    const response = await octokit.request("GET /user/repos", {
      accept: "application/vnd.github.v3+json",
      visibility: "public",
      affiliation: "owner",
      sort: "updated"
    });

    return response.data;

  }

}

export namespace YouTube {

  export async function getMostRecentPosts() {

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.SECRET_YOUTUBE_API_KEY}&channelId=UCrY2gIg_7vrlKUp9Cim6LBA&part=snippet,id&order=date&maxResults=4`,
      {
        method: "GET"
      }
    )

    return res.json();

  }

  export async function getUserProfile() {

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,brandingSettings&id=UCrY2gIg_7vrlKUp9Cim6LBA&key=${process.env.SECRET_YOUTUBE_API_KEY}`,
      {
        method: "GET"
      }
    )

    return res.json();

  }

}