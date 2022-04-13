import { initializeApp  } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getPublicLinks } from "./../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "GET") {

    const result = await getPublicLinks();

    if (result === undefined) {
      res.status(500).json({});
    } else {
      res.status(200).json(result); 
    }
  }

}
