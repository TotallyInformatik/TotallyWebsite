import React from "react"

import styles from "./progressComponent.module.css";

export default class ProgressComponent extends React.Component {
  
  private progressRef: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.progressRef = React.createRef();
    this.positionProgressComponent = this.positionProgressComponent.bind(this);
  }

  render() {
    return <div className={`${styles.progressComponent}`} ref={this.progressRef}>
      <p className="chinese">进步_</p>
    </div>;
  }

  positionProgressComponent() {

    const currentRef = this.progressRef.current;
    if (currentRef == null) return;

    const refHeight = currentRef!.clientHeight;

    const currentScrollPosition = window.scrollY;

    let body = document.body;
    let html = document.documentElement;

    const height = Math.max( body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight, html.offsetHeight );

    const documentSize = height - window.innerHeight;
    const relation = currentScrollPosition / documentSize;
    let top = (window.innerHeight - refHeight) * relation;
    this.progressRef.current!.style.top = `${top}px`;
  }

  componentDidMount() {
    window.addEventListener("scroll", () => this.positionProgressComponent());
    window.addEventListener("resize", () => this.positionProgressComponent());
  }

}