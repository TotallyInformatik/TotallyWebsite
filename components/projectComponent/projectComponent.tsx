import React from "react";
// TODO: put project component here


class ProjectComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <section key={value.title} className={styles.projectItem}>
      <article>
        {
          value.date != null ? <time>{Timestamp.fromMillis(value.date.seconds * 1000).toDate().toLocaleDateString()}</time> : null
        }
        <h3>{value.title}</h3>
        <p>{value.description}</p>
      </article>
      <img src="/images/planify.jpg" alt="" />
    </section>;
  }

}

export default ProjectComponent;