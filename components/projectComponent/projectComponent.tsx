import { getImageSize } from "next/dist/server/image-optimizer";
import Image from "next/image";
import React from "react";
import { getFirebaseImageFromQuery } from "../../lib/firebase";
import { PublicProjectData } from "../../lib/types";

import styles from "./projectComponent.module.css";


class ProjectComponent extends React.Component<{ data: PublicProjectData }, { imageUrl?: string }> {

  constructor(props: { data: PublicProjectData }) {
    super(props);

    this.state = {
      imageUrl: undefined
    };

    this.getImageUrl();

  }

  async getImageUrl() {
    if (this.props.data.imageFile != undefined) {
      this.setState({
        imageUrl: await getFirebaseImageFromQuery(this.props.data.imageFile)
      });
    }
  }

  render() {
    return <section key={this.props.data.title} className={styles.projectItem}>
      <article>
        {
          this.props.data.date != undefined ? 
            <time>{this.props.data.date}</time> : undefined
        }
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.description}</p>
      </article>
      {
        this.state.imageUrl != undefined ?
          <div className={styles.projectImage}>
            <Image src={
              this.state.imageUrl
            } width="1000" height="1000" />
          </div> : null
      }
    </section>;
  }

}

export default ProjectComponent;