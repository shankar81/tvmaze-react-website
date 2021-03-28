import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GlobalContext from "./context/GlobalContext";
import Home from "./layout/Home/Home";
import ShowDetail from "./layout/ShowDetail/ShowDetail";

function App() {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  function onChangeTheme() {
    setDarkMode((mode) => !mode);
  }

  return (
    <GlobalContext.Provider value={{ changeTheme: onChangeTheme, isDarkMode }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/show/:id" component={ShowDetail} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
