import { NextApiRequest, NextApiResponse } from "next";
import { getFirestoreDataFromApiQuery } from "../../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "GET") {

    const { pid } = req.query;

    const result = await getFirestoreDataFromApiQuery(pid)
      .catch(() => {
        res.status(500).send("Error, Status Code 500");
      });

    if (result === undefined) {
      res.status(500).send("Error, Status Code 500");
    } else {
      res.status(200).json(result); 
    }
  }

}
