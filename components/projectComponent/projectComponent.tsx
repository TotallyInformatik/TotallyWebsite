import { Timestamp } from "firebase/firestore";
import React from "react";
import { PublicProjectData } from "../../lib/types";

import styles from "./projectComponent.module.css";


class ProjectComponent extends React.Component<{data: PublicProjectData}> {

  constructor(props: {data: PublicProjectData}) {
    super(props);
  }

  render() {
    return <section key={this.props.data.title} className={styles.projectItem}>
      <article>
        {
          this.props.data.date != null ? 
            <time>{this.props.data.date}</time> : null
        }
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.description}</p>
      </article>
      <img src="/images/planify.jpg" alt="" />
    </section>;
  }

}

export default ProjectComponent;