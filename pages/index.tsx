import type { NextPage } from 'next'
import Head from 'next/head';

import { initializeApp  } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, Firestore, getDoc, getFirestore } from "firebase/firestore";

import ProgressComponent from "../components/progressComponent/progressComponent";

import styles from "./index.module.css";

const Home: NextPage = () => {

  test();

  return <>
    <Head>
      <title>TotallyInformatik</title>
    </Head>

    <ProgressComponent />
    <main>
      <section className={styles.landingSection}>
        <div className={`${styles.landingChinese} transparent`}>
          <h1 className="chinese">目前正在编程</h1>
          <h1 className="chinese">目前正在学习</h1>
          <h1 className="chinese">目前正在改善</h1>
        </div>
        <div className={`${styles.landingName} transparent`}>
          <h1>TotallyInformatik</h1>
        </div>
        <article>
          <h1>Totally<br/>Informatik</h1>
          <p>Rui Zhang - 16 - Male</p>
          <p>Enthusiastic and Entrepreneurial Software Developer and Student</p>
        </article>
        <img src="/images/logo.png" alt="logo / profile pic"/>
      </section>
      <section className={styles.projectsSection}>
        <h2>My Work</h2>
      </section>
    </main>

  </>;
}

export default Home


/*
export async function getStaticProps() {


}
*/