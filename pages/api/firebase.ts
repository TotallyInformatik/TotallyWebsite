import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NextApiRequest, NextApiResponse } from "next";

export function handler(req: NextApiRequest, res: NextApiResponse) {

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web /setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  if (req.method === "GET") {

  }

}
