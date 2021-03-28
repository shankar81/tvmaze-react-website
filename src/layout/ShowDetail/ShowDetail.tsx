import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { BASE_URL } from "./../../utils/constants";
import classes from "./ShowDetail.module.scss";

type RouteParams = {
  id: string;
};

const ShowDetail: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const [details, setDetails] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    // Fetching show details
    fetch(`${BASE_URL}/shows/${props.match.params.id}`)
      .then((res) => res.json())
      .then((response) => {
        setDetails(response);
      });

    // Fetching episodes
    fetch(`${BASE_URL}/seasons/${props.match.params.id}/episodes`)
      .then((res) => res.json())
      .then((response) => {
        setEpisodes(response);
      });

    // Fetching images to set as background
    fetch(`${BASE_URL}/shows/${props.match.params.id}/images`)
      .then((res) => res.json())
      .then((response) => {
        // Filtering the images with type background
        let banners = response.filter((el: any) => el.type === "banner");
        if (banners.length === 0) {
          banners = response.filter((el: any) => el.type === "background");
        }
        if (banners.length === 0) {
          banners = response.filter((el: any) => el.type === "poster");
        }
        const container = document.getElementById("detail-container");

        if (container) {
          container.style.backgroundImage = `linear-gradient(
            to left,
            rgba(0, 0, 0, 0.3) 15%,
            rgba(0, 0, 0, 0.9) 80%
          ),
         url(${banners[0]?.resolutions?.original?.url})`;
        }
      });
  }, [props.match.params.id]);

  function goBack() {
    props.history.goBack();
  }

  return (
    <div id="detail-container" className={classes.container}>
      <div onClick={goBack} className={classes.back}>
        <svg className={classes.icon}>
          <use href="../sprite.svg#back" />
        </svg>
      </div>
      <h1 className={classes.title}>{details?.name}</h1>
      <p className={classes.desc}>
        {details?.summary?.replace(/(<([^>]+)>)/gi, "")}
      </p>

      {/* Rating */}
      <div className={classes.rating}>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            let svgClass = classes.star;
            const rating = details?.rating?.average || 0;
            if (index >= rating) {
              svgClass = classes.unstar;
            }
            return (
              <svg key={index} className={svgClass}>
                <use href="../sprite.svg#black-star-silhouette" />
              </svg>
            );
          })}
      </div>

      {episodes.length > 0 && (
        <>
          <h1 className={classes.subtitle}>
            Episodes (season {episodes[0]?.season}) ({episodes?.length})
          </h1>

          {/* Episodes */}
          <div className={classes.episodes}>
            {episodes.length > 0 &&
              episodes?.map((el, index) => {
                return (
                  <img
                    key={index}
                    src={el?.image?.medium}
                    alt={el.name}
                    className={classes.episode}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowDetail;
