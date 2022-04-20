import React from "react";

const Duration = require("duration-js");

import styles from "./githubRepoComponent.module.css";
import { githubLanguageColorData } from "../../lib/githubColors";


type GithubRepoComponentProp = {
  title: string,
  description: string,
  language: string,
  updated_at: string,
  html_url: string,
}
// * now property is the current time from Date.now()
// * is used to calculate updated_at uniformly

class GithubRepoComponent extends 
  React.Component<GithubRepoComponentProp> {

  private updated_atDisplayString: string = "";

  constructor(props: GithubRepoComponentProp) {
    super(props);
    this.configureUpdatedAt();
  }

  /**
   * * configures the date that is displayed at the bottom of a 
   * * github repository
   * 
   * assumption:
   * There are multiple types of dates and corresponding thresholds
   * 
   * -> updated seconds ago (< 1 minute)
   * -> updated minutes ago (< 1 hr)
   * -> updated hours ago (< 24 hrs)
   * -> updated yesterday
   * -> updated ... days ago (< a month)
   * -> updated on {date} (> a month)
   * 
   */
  configureUpdatedAt() {
    const date = new Date(this.props.updated_at).toDateString();
    this.updated_atDisplayString = date.split(" ").slice(1).join(" ");
  }

  render() {

    return <div className={styles.githubRepoComponent}>
      <section className={styles.descriptionSection}>
        <b><a href={this.props.html_url}>{this.props.title}</a></b>
        <p>{this.props.description}</p>
      </section>
      <section className={styles.metaSection}>
        <div className={styles.programmingLanguage}>
          <div className={styles.languageColor} style={{
            backgroundColor: githubLanguageColorData[this.props.language].color!
          }} />
          <small>{this.props.language}</small>
        </div>
        <small>Updated on {this.updated_atDisplayString}</small>
      </section>
    </div>
    
  }

}

export default GithubRepoComponent