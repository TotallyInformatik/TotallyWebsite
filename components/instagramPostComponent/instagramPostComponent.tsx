import Image from "next/image";
import React from "react";
import SimpleBar from "simplebar-react";
import { InstagramPostData, InstagramProfileData } from "../../lib/types";

import styles from "./instagramPostComponent.module.css";

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
      className={styles.instagramPost} 
    >
      <section 
        className={styles.mediaSection} 
        onClick={() => this.redirect()}
      >
        <Image
          src={this.props.postData.media_url}
          objectFit="contain"
          width={postSize}
          height={postSize}
        />
      </section>
      <section className={styles.captionSection}>
        <header>
          <div className={styles.profileIcon}>
            <Image  
              width={logoSize}
              height={logoSize}
              src="/images/logo.png"
            />
          </div>
          <b>{this.props.profileData.username}</b>
        </header>
        <main>
          <div className={styles.profileIcon}>
            <Image 
              width={logoSize}
              height={logoSize}
              src="/images/logo.png"
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