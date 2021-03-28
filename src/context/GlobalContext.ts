import React from "react";

const GlobalContext = React.createContext({
  isDarkMode: false,
  changeTheme: () => {},
});

export default GlobalContext;
