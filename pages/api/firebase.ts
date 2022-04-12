import { initializeApp  } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "GET") {

    const firebaseConfig = {
      apiKey: "AIzaSyCWR_WJB4Nqs44rA4HgYSvFnujVd5wNvcs",
      authDomain: "totallylinks.firebaseapp.com",
      projectId: "totallylinks",
      storageBucket: "totallylinks.appspot.com",
      messagingSenderId: "71338439134",
      appId: "1:71338439134:web:28c53a7c4b60b06db66d4f",
      measurementId: "G-YGP6S4WJ4Y"
    };
  
    // Initialize Firebase
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
  
    const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "links/publicLinks"));

    if (firebaseResult === undefined) {
      res.status(204).json({});
    } else {
      res.status(200).json(firebaseResult.data()); 
    }
  }

}
