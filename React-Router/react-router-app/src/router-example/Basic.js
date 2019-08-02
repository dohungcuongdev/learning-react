import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function BasicExample() {
    return (
        <Router>
            <div>
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

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Topics({ match }) {
    //console.log(match)
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
        /*
            path - (string) The path pattern used to match. Useful for building nested <Route>s
            url - (string) The matched portion of the URL. Useful for building nested <Link>s
            Consider the route "/users/:userId". match.path would be "/users/:userId" while match.url would have the :userId value filled in, e.g. "users/5".
        */
    );
}

function Topic({ match }) {
    //console.log(match)
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}

export default BasicExample;
