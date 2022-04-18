import { FirebaseApp, initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { PublicProjectData, PublicProjectsData } from "./types";

// TODO: write tests like a cool programmer


/**
 * @param projects a object containing all of the public projects. For the json structure refer to firestore database
 * @returns the same list of projects, but sorted by date. If no date is given in the project, then it will be last.
 */
export function sortProjects(projects: PublicProjectsData): PublicProjectData[] {

  return Object.values(projects).sort((a: PublicProjectData, b: PublicProjectData) => {

    if (typeof a.date == "undefined") return 1;
    if (typeof b.date == "undefined") return -1;

    //* if you look in firebase, the date is formated as dd.mm.yyyy (european)

    let dateList = a.date.split(".");
    let days = dateList[0]!;
    let month = dateList[1]!;
    let year = dateList[2]!;

    const comparisonValueForA = 
      Number.parseInt(
        year.concat(month, days)
      );


    let dateListb = b.date.split(".");
    let daysb = dateListb[0]!;
    let monthb = dateListb[1]!;
    let yearb = dateListb[2]!;

    const comparisonValueForB = 
      Number.parseInt(
        yearb.concat(monthb, daysb)
      );

    if (comparisonValueForB > comparisonValueForA) return 1;
    if (comparisonValueForB < comparisonValueForA) return -1;
    else return 0;

  });

}


function getFirebaseApp(): FirebaseApp {

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
  return app;

}

/**
 * @returns {Firestore} the firestore Database where are links and projects should be located
 */
 function getDatabase(): Firestore {
  
  const app = getFirebaseApp();
  return getFirestore(app);

} 

/**
 * 
 * @param {string} query a path leading to the desired image 
 * @returns the url which is used to download the image. 
 *          Can by inserted into a next image / img tag directly
 */
export async function getFirebaseImageFromQuery(query: string): Promise<string> {

  const app = getFirebaseApp();
  const storage = getStorage(app, "gs://totallylinks.appspot.com");
  const imageRef = ref(storage, query);
  let imageUrl: string = "none";
  await getDownloadURL(imageRef)
    .then((url) => {
      imageUrl = url;
    });

  return imageUrl;

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