import React, { useEffect } from "react";
import Head from 'next/head';

const Rellax = require("rellax");
const ScrollOut = require("scroll-out");

import { getFirestoreDataFromApiQuery, sortProjects } from "../lib/firebase";
import { 
  InstagramPostData, 
  InstagramProfileData, 
  PublicLinksData, 
  PublicProjectsData, 
  GithubProfileData, 
  GithubRepoData, 
  YouTubeProfileData,
  YouTubePostData
} from "../lib/types";
import { Github, Instagram, YouTube } from "../lib/socialMedia";

import styles from "./index.module.css";

import ProjectComponent from "../components/projectComponent/projectComponent";
import SocialMediaComponent from "../components/socialMediaComponent/socialMediaComponent";
import InstagramPostComponent from "../components/instagramPostComponent/instagramPostComponent";
import ProgressComponent from "../components/progressComponent/progressComponent";
import GithubRepoComponent from "../components/githubRepoComponent/githubRepoComponent";
import SimpleBar from "simplebar-react";

type HomeData = { 
  projectsData: PublicProjectsData,
  linksData: PublicLinksData,
  instagramData: InstagramPostData[] | undefined,
  instagramProfileData: InstagramProfileData | undefined,
  githubProfileData: GithubProfileData | undefined,
  githubRepoData: GithubRepoData[] | undefined,
  youtubeProfileData: YouTubeProfileData | undefined,
  youtubePostsData: YouTubePostData[] | undefined
}

class Home extends 
  React.Component<HomeData, {}> {

  private rellax: any;
  private scrollout: any;
  static verticalRellaxString: string = "rellax";
  

  constructor(props: HomeData) {
    super(props);
    this.sendProjectRequest = this.sendProjectRequest.bind(this);
  }

  componentDidMount() {

    window.onload = () => {
      this.rellax = new Rellax(`.${Home.verticalRellaxString}`);
      this.scrollout = new ScrollOut({
        once: true
      });
    }

    window.addEventListener("resize", () => {
      try {
        this.rellax.refresh();
      } catch (e) { /* ignored lol */ }
    });

  }

  componentWillUnmount() {
    
    try {
      this.rellax.destroy();
      this.scrollout.teardown();
    } catch (e) { /* ignored lol */ }
    
  }

  componentDidUpdate() {
    try {
      this.rellax.refresh();
      this.scrollout.update();
    } catch (e) { /* ignored lol */ }

    
  }

  render() {
    //** This following line might work in development, but in production, secrets are only available to the node.js server */
    //console.log("testing environment variables: " + process.env.SECRET_API_KEY);

    // TODO: add icons to self-introduction

    return <>
      <Head>
        <title>TotallyInformatik</title>
      </Head>
      <ProgressComponent />
      <main> 
        <section className={styles.landingSection}>

          <div 
            className={`${styles.landingName} transparent ${Home.verticalRellaxString}`} 
            data-rellax-speed="-5"
          >
            <h1 className={`fancyHeading ${styles.fancyHeading} transitionHeading`}>TotallyInformatik</h1>
          </div>
          <div 
            className={`${styles.landingChinese} transparent ${Home.verticalRellaxString}`} 
            data-rellax-speed="-7"
          >
            <h1 className="chinese">目前正在编程</h1>
            <h1 className="chinese">目前正在学习</h1>
            <h1 className="chinese">目前正在改善</h1>
          </div>

          <article>
            <h1 className={`${styles.priorityHeading} standardHeading`}>Totally<br/>Informatik</h1>
            <p>Rui Zhang - 16 - Male - German</p>
            <p>Enthusiastic and Creative Student, Creator and Programmer.</p>
            <p>Established and Leads {"\""}Annette-Entwickelt-Software{"\""}.</p>
          </article>
          <img 
            className={Home.verticalRellaxString} data-rellax-speed="-2"
            src="/images/logo.png" alt="logo / profile pic"
          />
        </section>

        <section className={styles.projectsSection}>
          <small className={`${styles.line} ${styles.lineStart} chinese`}>
            我的创作
          </small>
          <h1 
            className={`${styles.line} ${styles.bannerVertical} chinese ${Home.verticalRellaxString}`}
            data-rellax-speed="-2"
          >
            我的创作
          </h1>
          <div className={`${styles.line} ${styles.lineVertical}`} />
          <aside className={styles.headingAside}>
            <h1 className={`fancyHeading ${styles.fancyHeading} transitionHeading`}>My Work</h1>
          </aside>
          <section className={styles.projectListSection}>
            <article>
              <h2 className="standardHeading">Projects</h2>
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
          <h1 
            className={`fancyHeading ${styles.fancyHeading} transitionHeading ${Home.verticalRellaxString}`}
            data-rellax-speed="-10" data-rellax-percentage="0.1"
          >Online Social Media</h1>
          <h1 
            className={`${styles.chinese} chinese ${Home.verticalRellaxString}`}
            data-rellax-speed="-2" data-rellax-percentage="0.5"
          >网络媒体</h1>

          <h2 className="standardHeading">Follow Me</h2>
          <article>
            <p>My Social Media Accounts go into Detail About My Work.</p>
            <p>Explanations, Code Details, Valuable Lessons, etc.</p>
          </article>

          {
            this.props.githubProfileData != undefined && 
            this.props.githubRepoData != undefined ?
              <SocialMediaComponent 
                className={styles.github}
                title="Github"
                socialMediaLink={this.props.githubProfileData.html_url}
                profileInformation={
                  <>
                    <b>
                      <a href={this.props.githubProfileData.html_url}>
                        {this.props.githubProfileData.login}
                      </a>
                    </b>
                    <p>{this.props.githubProfileData.bio}</p>
                    <p>{this.props.githubProfileData.public_repos} Public Repos</p>
                  </>
                }
              >
                <SimpleBar autoHide={true} className={styles.simplebar} >
                  {
                    this.props.githubRepoData.map(
                      (value) => {
                        return <GithubRepoComponent 
                          key={value.name}
                          title={value.name}
                          description={value.description}
                          language={value.language}
                          updated_at={value.updated_at}
                          html_url={value.html_url}
                        />
                      }
                    )
                  }
                </SimpleBar>
              </SocialMediaComponent> : null
          }

          {
            this.props.instagramData != undefined && 
            this.props.instagramProfileData ?
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
                        profileData={this.props.instagramProfileData!}
                      /> 
                    }
                  )
                }
              </SocialMediaComponent> : null
          }

          {
            this.props.youtubeProfileData != undefined &&
            this.props.youtubePostsData != undefined ?
              <SocialMediaComponent
                className={styles.youtube}
                title="YouTube"
                socialMediaLink={this.props.linksData.youtube}
                profileInformation={
                  <>
                    <b><a href={this.props.linksData.youtube}>
                    {this.props.youtubeProfileData.brandingSettings.channel.title}
                    </a></b>
                    <p>
                      {this.props.youtubeProfileData.brandingSettings.channel.description}
                    </p>
                    <p>
                      {this.props.youtubeProfileData.statistics.videoCount} Videos
                    </p>
                  </>
                }
              >
                {
                  this.props.youtubePostsData.map((value) => {
                    return <iframe 
                      className={Home.verticalRellaxString}
                      data-rellax-speed="3"
                      data-rellax-percentage="0.5"
                      key={value.id.videoId}
                      src={`https://www.youtube.com/embed/${value.id.videoId}?`}  
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>;
                  })
                }
              </SocialMediaComponent> : null
          }

        </section>

        <section className={styles.contactSection}>

          <section 
            className={`${styles.fancySection} ${Home.verticalRellaxString}`}
            data-rellax-speed="-4"
            data-rellax-percentage="0.5"
          >
            <h1 className={`fancyHeading transitionHeading ${styles.fancyHeading}`}>Con</h1>
            <h1 className={`fancyHeading transitionHeading ${styles.fancyHeading}`}>tact</h1>
            <h1 className={`fancyHeading transitionHeading ${styles.fancyHeading}`}>Form</h1>
          </section>
          <h1 className="chinese">联系</h1>
          <small className={`chinese ${styles.line}`}>联系</small>

          <aside 
            className={`${Home.verticalRellaxString}`}
            data-rellax-speed="-2"
            data-rellax-percentage="0.2"
          >
            <h2 className="standardHeading">Have a Project / Idea?</h2>
            <b>Let me handle it.</b>
            <ul>
              <li>No Rules</li>
              <li>No Licenses</li>
              <li>No Payment</li>
              <li>Just what you want. Without the hassle.</li>
            </ul>
          </aside>
          <form className={styles.form} method="none" onSubmit={(e) => this.sendProjectRequest(e)}>
            <input name="name" id="name" placeholder="Full Name *" type="text" required></input>
            <input name="email" id="email" placeholder="Email Adress *" type="email" required></input>
            <input name="title" id="title" placeholder="Project Name / Title *" required></input>
            <textarea name="self-description" id="self-description" placeholder="Details About Yourself *" required></textarea>
            <textarea name="project-description" id="project-description" placeholder="Project / Idea Description: *" required></textarea>
            <sub>* required</sub>
            <section className={styles.flexBox}>
              <input 
                type="submit" 
                value="Send Request"
                className="standardHoverAnimation"
              />
              <label id="status"></label>
            </section>
          </form>
        </section>

      </main>
    </>;
  }

  /// fetching from own nextjs backend api to send email.
  async sendProjectRequest(e: React.FormEvent) {

    e.preventDefault();

    const statusElement = document.querySelector("#status");
    statusElement!.innerHTML = "";

    const nameInput: any = document.querySelector("#name");
    const emailInput: any = document.querySelector("#email");
    const titleInput: any = document.querySelector("#title");
    const selfDescriptionInput: any = document.querySelector("#self-description");
    const projectDescriptionInput: any = document.querySelector("#project-description");

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      title: titleInput.value,
      selfDescription: selfDescriptionInput.value,
      projectDescription: projectDescriptionInput.value
    }

    const result = await fetch(`/api/emailing/post`, {
      method: "POST",
      body: JSON.stringify(formData)
    });

    const resultJson = await result.json();

    if (resultJson.status == 200) {

      statusElement!.className = styles.statusSuccess;
      statusElement!.innerHTML = resultJson.userMessage;

    } else {
      
      statusElement!.className = styles.statusError;
      statusElement!.innerHTML = resultJson.userMessage;

    }

  }

}

export default Home

// * getStaticProps because I can't afford calling the api every time a user requests the website
// * no funding. Am poor.
export async function getStaticProps() {
 
  //* Note that a change in Environment Variables requires a full restart of the development server

  //* NOTE that you should not fetch from your own api in a server-side function such as getStaticProps. 
  //* Just use the functions you've written, it will be exaclty as safe, since this runs on the server-side 

  const projectsData = await getFirestoreDataFromApiQuery(["public", "projects"]) as PublicProjectsData;
  const linksData = await getFirestoreDataFromApiQuery(["public", "links"]) as PublicLinksData;

  const instagramData = await Instagram.getMostRecentPosts() as InstagramPostData[];
  const instagramProfileData = await Instagram.getUserProfile() as InstagramProfileData;

  const githubProfileData = await Github.getUserProfile() as GithubProfileData;
  const githubRepoData = await Github.getRepositories() as GithubRepoData[];

  const youtubeProfileData = (await YouTube.getUserProfile()).items[0] as YouTubeProfileData;
  const youtubePostsData = (await YouTube.getMostRecentPosts()).items as YouTubePostData[];

  return {
    props: {
      projectsData: projectsData,
      linksData: linksData,
      instagramData: instagramData,
      instagramProfileData: instagramProfileData,
      githubProfileData: githubProfileData,
      githubRepoData: githubRepoData,
      youtubeProfileData: youtubeProfileData,
      youtubePostsData: youtubePostsData
    }
  };
  
} 
