import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://website-totallyinformatik.vercel.app/`,
    });


    const links = [{ url: '/',  changefreq: 'daily', priority: 0.9  }]
    // Create each URL row
    links.forEach(link => {
      smStream.write({
        url: `${link.url}`,
        changefreq: `${link.changefreq}`,
        priority: link.priority
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}