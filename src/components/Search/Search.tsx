import React, { ChangeEventHandler } from "react";
import classes from "./Search.module.scss";

type SearchProps = {
  query: string;
  onChangeText: ChangeEventHandler<HTMLInputElement>;
};

const Search: React.FC<SearchProps> = ({ onChangeText, query }) => {
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        value={query}
        onChange={onChangeText}
        type="text"
        placeholder="Search shows"
      />
    </div>
  );
};

export default Search;
