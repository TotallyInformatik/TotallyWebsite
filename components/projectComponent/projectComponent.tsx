import Image from "next/image";
import React from "react";
import { getFirebaseImageFromQuery } from "../../lib/firebase";
import { PublicProjectData } from "../../lib/types";

import styles from "./projectComponent.module.css";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class ProjectComponent extends React.Component<{ data: PublicProjectData }, { imageUrl?: string }> {

  constructor(props: { data: PublicProjectData }) {
    super(props);

    this.state = {
      imageUrl: undefined
    };

    this.redirectToProject = this.redirectToProject.bind(this);

  }

  async getImageUrl() {
    if (this.props.data.imageFile != undefined) {
      this.setState({
        imageUrl: await getFirebaseImageFromQuery(this.props.data.imageFile)
      });
    }
  }

  redirectToProject() {
    window.location.href = this.props.data.url;
  }

  render() {
    return <section key={this.props.data.title} className={styles.projectItem} onClick={() => this.redirectToProject()}>
      {
        this.state.imageUrl != undefined ?
          <div className={styles.projectImage}>
            <Image 
              src={
                this.state.imageUrl
              } 
              width="1000" 
              height="800"
              alt={`Title Image for ${this.props.data.title}`} 
            />
          </div> : null
      }
      <SimpleBar autoHide={false} forceVisible="y" className={styles.simplebar}>
        {
          this.props.data.date != undefined ? 
            <time>{this.props.data.date}</time> : undefined
        }
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.description}</p>
      </SimpleBar>
    </section>;
  }

  componentDidMount() {
    this.getImageUrl();
  }

}

export default ProjectComponent;