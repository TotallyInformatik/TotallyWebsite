import React from "react";
import Head from 'next/head';

import { sortProjects } from "../lib/firebase";

import ProgressComponent from "../components/progressComponent/progressComponent";

import styles from "./index.module.css";
import { PublicProjectsData } from "../lib/types";
import ProjectComponent from "../components/projectComponent/projectComponent";

class Home extends React.Component<{ data: PublicProjectsData }, {}> {

  constructor(props: { data: PublicProjectsData }) {
    super(props);
  }

  render() {
    //** This following line might work in development, but in production, secrets are only available to the node.js server */
    //console.log("testing environment variables: " + process.env.SECRET_API_KEY);

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
            <p>Enthusiastic and Entrepreneurial Software Developer and Student</p>
            <p>Established and Leads {"\""}Annette-Entwickelt-Software{"\""}</p>
          </article>
          <img src="/images/logo.png" alt="logo / profile pic"/>
        </section>
        <section className={styles.projectsSection}>
          <small className={`${styles.line} ${styles.lineStart}`}>我的创作</small>
          <h2 className={styles.fancyHeading}>My Work</h2>
          {
            sortProjects(this.props.data).map(
              (value) => {
                return <ProjectComponent key={value.title} data={value} />
              }
            )
          }

          <small className={`${styles.line} ${styles.lineEnd}`}>我的创作</small>
        </section>
      </main>

    </>;
  }

}

export default Home

export async function getStaticProps() {
 
  //* Note that a change in Environment Variables requires a full restart of the development server

  const response = await fetch("/api/firebase/public/projects");
  const data = await response.json();


  return {
    props: {
      data: data as PublicProjectsData
    }
  };
  
} 
