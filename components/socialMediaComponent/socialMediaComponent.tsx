import React, { ReactElement, ReactNode } from "react";

import styles from "./socialMediaComponent.module.css";

type SocialMediaPropType = { 
  icon: string, 
  title: string,
  description?: string,
  children: ReactNode,
  className: string
}

class SocialMediaComponent extends 
  React.Component<SocialMediaPropType> {

  constructor(props: SocialMediaPropType) {
    super(props);
  }

  render() {
    return <section className={`${this.props.className} ${styles.socialSubSection}`}>
      <i style={{
        backgroundImage: `url(${this.props.icon})`
      }}></i>
      
      <article>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
      </article>

      <section className={styles.postsSection}>
        {this.props.children}
      </section>

    </section>
  }

}

export default SocialMediaComponent;