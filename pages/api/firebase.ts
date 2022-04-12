import { initializeApp  } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const firebaseConfig = {
    apiKey: process.env.SECRET_API_KEY,
    authDomain: process.env.SECRET_AUTH_DOMAIN,
    projectId: process.env.SECRET_PROJECT_ID,
    storageBucket: process.env.SECRET_STORAGE_BUCKET,
    messagingSenderId: process.env.SECRET_MESSAGING_SENDER_ID,
    appId: process.env.SECRET_APP_ID,
    measurementId: process.env.SECRET_MEASUREMENT_ID
  };

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);

  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "links/publicLinks"));

  if (req.method === "GET") {

    res.status(200).json({message: firebaseResult.data.toString()});

  }

}
