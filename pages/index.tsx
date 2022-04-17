import React from "react";
import Head from 'next/head';

import { getFirestoreDataFromApiQuery, sortProjects } from "../lib/firebase";

import ProgressComponent from "../components/progressComponent/progressComponent";

import styles from "./index.module.css";
import { PublicProjectsData } from "../lib/types";
import ProjectComponent from "../components/projectComponent/projectComponent";
import Image from "next/image";

class Home extends React.Component<{ data: PublicProjectsData }, {}> {

  constructor(props: { data: PublicProjectsData }) {
    super(props);
  }

  render() {
    //** This following line might work in development, but in production, secrets are only available to the node.js server */
    //console.log("testing environment variables: " + process.env.SECRET_API_KEY);

    console.log(sortProjects(this.props.data));

    return <>
      <Head>
        <title>TotallyInformatik</title>
      </Head>
      <ProgressComponent />
      <main> 
        <section className={styles.landingSection}>

          <div className={`${styles.landingName} transparent`}>
            <h1 className={styles.fancyHeading}>TotallyInformatik</h1>
          </div>
          <div className={`${styles.landingChinese} transparent`}>
            <h1 className="chinese">目前正在编程</h1>
            <h1 className="chinese">目前正在学习</h1>
            <h1 className="chinese">目前正在改善</h1>
          </div>

          <article>
            <h1>Totally<br/>Informatik</h1>
            <p>Rui Zhang - 16 - Male</p>
            <p>Enthusiastic and Creative Student and Creator</p>
            <p>Established and Leads {"\""}Annette-Entwickelt-Software{"\""}</p>
          </article>
          <img src="/images/logo.png" alt="logo / profile pic"/>
        </section>

        <section className={styles.projectsSection}>
          <small className={`${styles.line} ${styles.lineStart}`}>我的创作</small>
          <aside className={styles.headingAside}>
            <h2 className={styles.fancyHeading}>My Work</h2>
          </aside>
          <section className={styles.projectListSection}>
            {
              sortProjects(this.props.data).map(
                (value) => {
                  return <ProjectComponent data={value} />
                }
              )
            }
          </section>
          <small className={`${styles.line} ${styles.lineEnd}`}>我的创作</small>
        </section>
      </main>

    </>;
  }

}

export default Home

export async function getStaticProps() {
 
  //* Note that a change in Environment Variables requires a full restart of the development server

  //* NOTE that you should not fetch from your own api in a server-side function such as getStaticProps. 
  //* Just use the functions you've written, it will be exaclty as safe, since this runs on the server-side 

  const data = await getFirestoreDataFromApiQuery(["public", "projects"]) as PublicProjectsData;
  
  return {
    props: {
      data: data
    }
  };
  
} 
