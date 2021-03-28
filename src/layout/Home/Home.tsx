import React, { ChangeEvent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Search from "../../components/Search/Search";
import { BASE_URL } from "../../utils/constants";
import { debounce, parseDate } from "../../utils/heloper";
import classes from "./Home.module.scss";

type HomeParams = {};

const Home: React.FC<RouteComponentProps<HomeParams>> = ({ history }) => {
  const [query, setQuery] = useState<string>("");
  const [shows, setShows] = useState<Array<any>>();

  useEffect(() => {
    loadScheduledShows();
  }, []);

  function loadScheduledShows() {
    // Fetching data from API
    fetch(`${BASE_URL}/schedule?country=US&date=${parseDate(new Date())}`)
      .then((res) => res.json())
      .then((response) => setShows(response));
  }

  function searchShows(text: string) {
    // Searching shows as user types
    fetch(`${BASE_URL}/search/shows?q=${text}`)
      .then((res) => res.json())
      .then((response) => setShows(response));
  }

  function navigateToDetail(id: number) {
    history.push(`show/${id}`, { id });
  }

  function onChangeQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    if (e.target.value.length > 0) {
      // 0.2 Seconds Delay in API call while user types
      debounce(() => searchShows(e.target.value), 200);
    } else {
      loadScheduledShows();
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <Search query={query} onChangeText={onChangeQuery} />
      </div>

      <div className={classes.shows}>
        {shows?.map((el, index) => {
          return (
            <div
              onClick={() => navigateToDetail(el.show.id)}
              key={index}
              className={classes.show}
            >
              <img
                src={el?.show?.image?.medium}
                alt={el?.show?.name}
                className={classes.showImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
