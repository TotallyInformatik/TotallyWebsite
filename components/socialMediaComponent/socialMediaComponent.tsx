import React, { ReactElement, ReactNode, ReactSVGElement } from "react";

import styles from "./socialMediaComponent.module.css";

type SocialMediaPropType = { 
  title: string,
  children: ReactNode,
  profileInformation?: ReactNode,
  className?: string,
  socialMediaLink: string
}

class SocialMediaComponent extends 
  React.Component<SocialMediaPropType> {

  constructor(props: SocialMediaPropType) {
    super(props);
  }

  render() {
    return <section className={`${this.props.className} ${styles.socialSubSection}`}>
      
      <hr className={styles.hr} />
      <h3 className={styles.heading}><a href={this.props.socialMediaLink}>{this.props.title}</a></h3>

      <article className={styles.description}>
        {this.props.profileInformation}
      </article>

      <h2 className={`fancyHeading ${styles.fancyHeading}`}>{this.props.title}</h2>
      <section className={styles.postsSection}>
        {this.props.children}
      </section>

    </section>
  }

}

export default SocialMediaComponent;