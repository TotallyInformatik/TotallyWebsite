import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { deprecate } from "util";
import { PublicProjectData, PublicProjectsData } from "./types";

/**
 * @param projects a object containing all of the public projects. For the json structure refer to firestore database
 * @returns the same list of projects, but sorted by date. If no date is given in the project, then it will be last.
 */
export function sortProjects(projects: PublicProjectsData): PublicProjectData[] {

  return Object.values(projects).sort((a: any, b: any) => {

    if (typeof a.date == "undefined") return 1;
    if (typeof b.date == "undefined") return -1;

    if (a.date.seconds > b.date.seconds) return 1;
    if (a.date.seconds < b.date.seconds) return -1;
    else return 0;

  });

}


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
 * 
 * @param {string[]} query a list of strings representing the query that was sent to the api
 * @returns firestore data of the document specified by the query if not private
 */
export async function getFirestoreDataFromApiQuery(query: string[] | string): Promise<DocumentData | undefined> {

  if (typeof query === "string") {
    query = [query];
  }

  // will not allow access to private links etc.
  if (query[0] == "private") return;


  const db = getDatabase();

  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, query.join("/")));

  return firebaseResult.data();

}

 /**
  * @returns {Promise} an object containing all my social media links 
  */
export async function getPublicLinks(): Promise<DocumentData | undefined> {
  
  const db = getDatabase();
  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "public/links"));

  return firebaseResult.data();

}

/**
 * 
 */
export async function getPublicProjects(): Promise<DocumentData | undefined> {

  const db = getDatabase();
  const firebaseResult: DocumentSnapshot = await getDoc(doc(db, "public/projects"));

  return firebaseResult.data();

}