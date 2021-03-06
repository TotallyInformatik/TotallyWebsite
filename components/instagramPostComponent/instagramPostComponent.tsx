import Image from "next/image";
import React from "react";
import { InstagramPostData, InstagramProfileData } from "../../lib/types";
import { DotsThree } from "phosphor-react";

import styles from "./instagramPostComponent.module.css";
import Home from "../../pages";

/**
 * OEmbed is not available for plebs like me.
 * So guess this will be a good frontend practice to recreate an instagram post 
 * as a component (where I won't even be able to implement all parts because of lacking data)
 */

type InstagramPostProps = {
  postData: InstagramPostData, 
  profileData: InstagramProfileData
}

class InstagramPostComponent extends 
  React.Component<InstagramPostProps> {

  constructor(props: InstagramPostProps) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    window.location.href = this.props.postData.permalink;
  }

  render() {

    const logoSize = 30;
    const postSize = 400;

    let captionKey = 0;
    const caption = this.props.postData.caption;
    const captionList = caption.split("\n");

    return <div 
      className={`${Home.verticalRellaxString} ${styles.instagramPost}`} 
      data-rellax-speed="3"
      data-rellax-percentage="0.5"
    >
      <section 
        className={styles.mediaSection} 
        onClick={() => this.redirect()}
      >
        <img
          src={this.props.postData.media_url}
          width={postSize}
          height={postSize}
          alt={"Image for Instagram Post with ID " + this.props.postData.id}
        />
      </section>
      <section className={styles.captionSection}>
        <header>
          <div className={styles.headerContainer}>
            <div className={styles.profileIcon}>
              <Image  
                width={logoSize}
                height={logoSize}
                src="/images/logo.png"
                alt="logo"
              />
            </div>
            <b>{this.props.profileData.username}</b>
          </div>
          <DotsThree size={30} color="#1f1f1f" className={styles.dots} />
        </header>
        <main>
          <div className={styles.profileIcon}>
            <Image 
              width={logoSize}
              height={logoSize}
              src="/images/logo.png"
              alt="logo"
            />
          </div>
          <article>
            {
              captionList.map((value: string) => {
                captionKey++;
                return <p key={captionKey}>
                  {captionKey == 1 ? <b>{this.props.profileData.username} </b> : null}
                  {value}
                </p>;
              })
            }
          </article>
        </main>
      </section>
    </div>
  }

}

export default InstagramPostComponent;