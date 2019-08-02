import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function CustomLinkExample() {
    return (
        <Router>
            <div>
                <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
                <OldSchoolMenuLink to="/about" label="About" />
                
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>
    );
}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => (
                <div className={match ? "active" : ""}>
                    {match ? "> " : ""}
                    <Link to={to}>{label}</Link>
                </div>
            )}
        />
    );
    /*
        This will display like this:
        - If nvaigate URL /about:
          <Route path="/about">
            <div className="active">
                >
                <Link to="/about">About</Link>
            </div>
          </Route>
        - The reason we use Route to bound the Link is that 
        the Route will display the logic based on the current route 
        in this case is '/about, if '/about' is navigated then we display 
        all the div with thi Link inside and we will be able to access 
        the prop match like component
    */
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

export default CustomLinkExample;
