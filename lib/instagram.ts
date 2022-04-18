
export namespace Instagram {

  export async function getUserProfile() {

    const requestUrl = 
      `https://graph.instagram.com/me
      ?fields=username,media_count
      &access_token=${process.env.SECRET_INSTAGRAM_ACCESS_TOKEN}`;

    const response: Response = await fetch(requestUrl, {
      method: "GET"
    });
  
    return response.json();
  
  }
  
  export async function getMostRecentPosts() {

    const requestUrl = 
      `https://graph.instagram.com/me/media
      ?fields=media_url,thumbnail_url,caption,permalink,timestamp
      &access_token=${process.env.SECRET_INSTAGRAM_ACCESS_TOKEN}`;

    const response: Response = await fetch(requestUrl, {
      method: "GET"
    });

    return response.json();

  }

}