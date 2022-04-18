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

class InstagramPostComponent extends React.Component<{postData: InstagramPostData, profileData: InstagramProfileData}> {

  render() {
    return <div className={styles.instagramPost}>
      <section className={styles.mediaSection}>
        <Image
          src={this.props.postData.media_url}
          objectFit="contain"
        />
      </section>
      <section className={styles.captionSection}>
        <header>
          <i className={styles.profileIcon}></i>
          <p>{this.props.profileData.username}</p>
        </header>
        <SimpleBar autoHide={false}>
          <i className={styles.profileIcon}></i>
          <p>
            <span>{this.props.profileData.username}</span>
            {this.props.postData.caption}
          </p>
        </SimpleBar>
      </section>
    </div>
  }

}

export default InstagramPostComponent;