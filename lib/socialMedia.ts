import { Octokit } from "@octokit/core";

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

  export async function getColorFromGithubLanguage(language: string) {

    fs.readFile("./githubColors.json", (err, data) => {

      if (err) throw err;
      
      const colorsData = data.toJSON();
      console.log(colorsData.data);

    });


  }

}

