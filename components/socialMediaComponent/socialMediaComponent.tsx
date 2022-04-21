import React, { ReactElement, ReactNode, ReactSVGElement } from "react";
import Home from "../../pages";

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
      
      <hr 
        className={`${styles.hr}`} 
      />
      <h3 
        className={`${styles.heading} ${Home.verticalRellaxString}`}
        data-rellax-speed="1.5"
        data-rellax-percentage="0.5"
      >
        <a href={this.props.socialMediaLink}>
          {this.props.title}
        </a>
      </h3>

      <article 
        className={`${styles.description} ${Home.verticalRellaxString}`}
        data-rellax-speed="1.5"
        data-rellax-percentage="0.5"
      >
        {this.props.profileInformation}
      </article>

      <h2 
        className={`fancyHeading ${styles.fancyHeading} transitionHeading`}
      >{this.props.title}</h2>
      <section className={styles.postsSection}>
        {this.props.children}
      </section>

    </section>
  }

}

export default SocialMediaComponent;