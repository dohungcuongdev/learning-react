import React from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from "react-router-dom";
import Home from "./common-components/Home";
import About from "./common-components/About";
import Contact from "./common-components/Contact";
import Always from "./common-components/Always";
import NoMatch from "./common-components/NoMatch";

export default function AppRouteSwitchLinkNavLinkRedirect() {
    const someVariable = true;

    return (
        <BrowserRouter>
            {/* when location = { pathname: '/about' } */}
            <Route path='/about' component={About} /> {/* renders <About/> */}
            <Route path='/contact' component={Contact} /> {/* enders null */}
            <Route component={Always} /> {/* enders <Always/> */}

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                {/* when none of the above match, <NoMatch> will be rendered */}
                <Route component={NoMatch} />
            </Switch>

            <Switch>
                {/* these are good */}
                <Route exact path="/" component={Home} />
                <Route
                    path="/about"
                    render={props => <About {...props} extra={someVariable} />}
                />
                {/* do not do this */}
                <Route
                    path="/contact"
                    component={props => <Contact {...props} extra={someVariable} />}
                />
            </Switch>
            <ul>
                {/* <a href='/'>Home</a> */}
                <li><Link to="/">Home</Link></li>

                {/* <a href='/'>About</a> */}
                <li><Link to="/about">About</Link></li>

                {/* <a href='/'>Contact</a> */}
                <li><Link to="/contact">Contact</Link></li>

                {/* location = { pathname: '/react' } - check activedNavLink style in index.css */}
                <li>
                    <NavLink to="/react" activeClassName="activedNavLink">
                        React
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/react-native" activeClassName="activedNavLink">
                        React Native
                    </NavLink>
                </li>
                {/* <a href='/react' className='hurray'>React</a> */}

                {/* call this to redirect to anywhere - for example, in this case when first load page, redirect to about */}
                <Redirect to="/about" />

                <Switch>
                    <Route exact path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Redirect from="/react" to="/about" />
                </Switch>
            </ul>
        </BrowserRouter>
    );
};