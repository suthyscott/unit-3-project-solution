import React from "react";
import styles from "./Details.module.css";
import moreStyles from '../homeComponents/Home.module.css'

const DetailImage = ({ image, title }) => {
  const backgroundString = `--background: url(${image})`
  return (
    <div
      // className={moreStyles.ad_banner}
      className={styles.banner}
      style={{
        backgroundImage: `url(${image})`,
        // background: `linear-gradient(190deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${image}) no-repeat`
      }}
    // style={{backgroundString}}
    >
      <div className={styles.ad_text}>
        <h1 id={styles.detail_banner_text}>{title}</h1>
      </div>
    </div>
  );
};

export default DetailImage;
