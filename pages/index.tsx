import React from "react";
import Head from 'next/head';

import { getFirestoreDataFromApiQuery, sortProjects } from "../lib/firebase";

import ProgressComponent from "../components/progressComponent/progressComponent";

import styles from "./index.module.css";
import { InstagramPostData, InstagramProfileData, PublicLinksData, PublicProjectsData } from "../lib/types";
import ProjectComponent from "../components/projectComponent/projectComponent";
import SocialMediaComponent from "../components/socialMediaComponent/socialMediaComponent";
import { Instagram } from "../lib/socialMedia";
import InstagramPostComponent from "../components/instagramPostComponent/instagramPostComponent";

type HomeData = { 
  projectsData: PublicProjectsData,
  linksData: PublicLinksData,
  instagramData: InstagramPostData[],
  instagramProfileData: InstagramProfileData
}

class Home extends 
  React.Component<HomeData, {}> {

  constructor(props: HomeData) {
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
            <p>Rui Zhang - 16 - Male - German</p>
            <p>Enthusiastic and Creative Student and Creator.</p>
            <p>Established and Leads {"\""}Annette-Entwickelt-Software{"\""}.</p>
          </article>
          <img src="/images/logo.png" alt="logo / profile pic"/>
        </section>

        <section className={styles.projectsSection}>
          <small className={`${styles.line} ${styles.lineStart} chinese`}>我的创作</small>
          <h1 className={`${styles.line} ${styles.bannerVertical} chinese`}>我的创作</h1>
          <div className={`${styles.line} ${styles.lineVertical}`} />
          <aside className={styles.headingAside}>
            <h1 className={styles.fancyHeading}>My Work</h1>
          </aside>
          <section className={styles.projectListSection}>
            <article>
              <h2>Projects</h2>
              <p>Publicly Available Applications and Websites.</p>
              <p>Built with Passion and Care.</p>
            </article>
            {
              sortProjects(this.props.projectsData).map(
                (value) => {
                  return <ProjectComponent key={value.title} data={value} />
                }
              )
            }
          </section>
          <small className={`${styles.line} ${styles.lineEnd}`}>我的创作</small>
        </section>

        <section className={styles.socialMediaSection}>
          <h1 className={styles.fancyHeading}>Social Media</h1>
          <h1 className={`${styles.chinese} chinese`}>网络媒体</h1>

          <h2>Follow Me</h2>
          <article>
            <p>My Social Media Accounts go into Detail About My Work.</p>
            <p>Explanations, Code Details, Valuable Lessons, etc.</p>
          </article>

          <SocialMediaComponent 
            className={styles.instagram}
            title="Instagram"
            socialMediaLink={this.props.linksData.instagram}
            profileInformation={
              <>
                <b><a href={this.props.linksData.instagram}>{this.props.instagramProfileData.username}</a></b>
                <p>16, Student | Passion: Math, Computer Science, Physics | Student prez at Annette Grammar | Leader of the Annette-Entwickelt-Software Group</p>
                <p>{this.props.instagramProfileData.media_count} Posts</p>
              </>
            }
          >
            {
              this.props.instagramData.map(
                (value) => {
                  return <InstagramPostComponent 
                    key={value.id}
                    postData={value}
                    profileData={this.props.instagramProfileData}
                  /> 
                }
              )
            }
          </SocialMediaComponent>

          <SocialMediaComponent 
            className={styles.github}
            title="Github"
            socialMediaLink={this.props.linksData.github}
            profileInformation={
              <>
                <b><a href={this.props.linksData.instagram}>Github PLACEHOLDER</a></b>
                <p>{this.props.instagramProfileData.media_count} Posts</p>
              </>
            }
          >
            {
            }
          </SocialMediaComponent>

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

  const projectsData = await getFirestoreDataFromApiQuery(["public", "projects"]) as PublicProjectsData;
  const linksData = await getFirestoreDataFromApiQuery(["public", "links"]) as PublicLinksData;

  const instagramData = await Instagram.getMostRecentPosts() as InstagramPostData[];
  const instagramProfileData = await Instagram.getUserProfile() as InstagramProfileData;

  return {
    props: {
      projectsData: projectsData,
      linksData: linksData,
      instagramData: instagramData,
      instagramProfileData: instagramProfileData
    }
  };
  
} 
