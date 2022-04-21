import Image from "next/image";
import React from "react";
import { getFirebaseImageFromQuery } from "../../lib/firebase";
import { PublicProjectData } from "../../lib/types";

import styles from "./projectComponent.module.css";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class ProjectComponent extends React.Component<{ data: PublicProjectData }, { imageUrl?: string }> {

  private displayedDate: string = "";

  constructor(props: { data: PublicProjectData }) {
    super(props);

    this.state = {
      imageUrl: undefined
    };

    this.redirectToProject = this.redirectToProject.bind(this);

    this.configureDisplayedDate();

  }

  async getImageUrl() {
    if (this.props.data.imageFile != undefined) {
      this.setState({
        imageUrl: await getFirebaseImageFromQuery(this.props.data.imageFile)
      });
    }
  }

  configureDisplayedDate() {
    if (this.props.data.date == undefined) return;

    const dateList = this.props.data.date.split(".");
    const date = new Date(parseInt(dateList[2]), parseInt(dateList[1]), parseInt(dateList[0]));
    this.displayedDate = date.toDateString().split(" ").slice(1).join(" ");

  }

  redirectToProject() {
    window.location.href = this.props.data.url;
  }

  render() {
    return <section 
      key={this.props.data.title} 
      className={`${styles.projectItem}`} 
      onClick={() => this.redirectToProject()}
      data-scroll
    >
      {
        this.state.imageUrl != undefined ?
          <div className={styles.projectImage}>
            <Image 
              src={
                this.state.imageUrl
              } 
              width="1000" 
              height="500"
              alt={`Title Image for ${this.props.data.title}`} 
              objectFit="cover"
            />
          </div> : null
      }
      <SimpleBar autoHide={true} className={styles.simplebar}>
        {
          this.props.data.date != undefined ? 
            <time>{this.displayedDate}</time> : undefined
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