import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./common-components/Home";
import About from "./common-components/About";

function AppNestedRouting() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

// when the url matches `/topics` this component renders
function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* here's a nested Route,
        match.url helps us make a relative path */}
      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />

      {/*
      exact: bool
        When true, will only match if the path matches the location.pathname exactly.<Route exact path="/one" component={About} />
        path	location.pathname	exact	matches?
        /one	/one/two	true	no
        /one	/one/two	false	yes

        E.g: 
          <Route exact path="/users" component={User} /> You must enter exactly to URL {your-app-domain}/users, if enter {your-app-domain}/users/cuong, this won't match
          <Route path="/users" component={User} />  This will match when we reach the URL {your-app-domain}/users and whatever URL having the same path E.g: {your-app-domain}/users/cuong, {your-app-domain}/hungcuong
      */}
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default AppNestedRouting;