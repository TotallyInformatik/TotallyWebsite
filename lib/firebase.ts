import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";

/**
 * @returns {Firestore} the firestore Database where are links and projects should be located
 */
function getDatabase(): Firestore {

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
  
  return getFirestore(app);

} 


 /**
  * @returns {Promise} an object containing all my social media links 
  */
export async function getPublicLinks(): Promise<DocumentData | undefined> {
  
  const db = getDatabase();
  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "links/publicLinks"));

  return firebaseResult.data();

}

/**
 * 
 */
export async function getPublicProjects(): Promise<DocumentData | undefined> {

  const db = getDatabase();
  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "links/publicProjects"));

  return firebaseResult.data();

}