/*
 <HashRouter> that uses the hash portion of the URL (i.e. window.location.hash) to keep your UI in sync with the URL.IMPORTANT NOTE: Hash history does not support location.key or location.state. In previous versions we attempted to shim the behavior but there were edge-cases we couldn’t solve. Any code or plugin that needs this behavior won’t work. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with <BrowserHistory> instead.
 basename: string
- The base URL for all locations. A properly formatted basename should have a leading slash (#), but no trailing slash.
BrowserRouter
It uses history API, i.e. it's unavailable for legacy browsers (IE 9 and lower and contemporaries). Client-side React application is able to maintain clean routes like example.com/react/route but needs to be backed by web server. Usually this means that web server should be configured for single-page application, i.e. same index.html is served for /react/route path or any other route on server side. On client side, window.location.pathname is parsed by React router. React router renders a component that it was configured to render for /react/route.
Additionally, the setup may involve server-side rendering, index.html may contain rendered components or data that are specific to current route.

HashRouter
It uses URL hash, it puts no limitations on supported browsers or web server. Server-side routing is independent from client-side routing.
Backward-compatible single-page application can use it as example.com/#/react/route. The setup cannot be backed up by server-side rendering because it's / path that is served on server side, #/react/route URL hash cannot be read from server side. On client side, window.location.hash is parsed by React router. React router renders a component that it was configured to render for /react/route, similarly to BrowserRouter.
Most importantly, HashRouter use cases aren't limited to SPA. A website may have legacy or search engine-friendly server-side routing, while React application may be a widget that maintains its state in URL like example.com/server/side/route#/react/route. Some page that contains React application is served on server side for /server/side/route, then on client side React router renders a component that it was configured to render for /react/route, similarly to previous scenario.
 
SERVER SIDE: HashRouter uses a hash symbol in the URL, which has the effect of all subsequent URL path content being ignored in the server request (ie you send "www.mywebsite.com/#/person/john" the server gets "www.mywebsite.com". As a result the server will return the pre # URL response, and then the post # path will be handled by parsed by your client side react application.

CLIENT SIDE: BrowserRouter will not append the # symbol to your URL, however will create issues when you try to link to a page or reload a page. If the explicit route exists in your client react app, but not on your server, reloading and linking(anything that hits the server directly) will return 404 not found errors.
*/

import React, { useState } from "react";
import { HashRouter as Router, Route, Link, withRouter } from "react-router-dom"; // use withRouter to access props.history

function HandleHashRouterInFunctionExample() {
    return (
        <Router>
            <HandleHashRouterInFunctionWrapper />
        </Router>
    )
}

const HandleHashRouterInFunctionWrapper = withRouter(HandleHashRouterInFunction);

function HandleHashRouterInFunction({ history }) {

    history.listen((location, action) => {
        // location is an object like window.location
        console.log(action, location.pathname, location.state);
    });
    return (
        <>
            <div>
                <h3>Implementation of Params and Query like Vuejs and Angular</h3>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <button onClick={() => history.replace('/home')}>Home using history.replace</button>
                    <br />
                    <button onClick={() => history.push('/home')}>Home using history.push</button>
                    <li><Link to="/params/">Params missing id and name</Link></li>
                    <li><Link to="/params/1">Params missing name</Link></li>
                    <li><Link to="/params/1/cuong">Params</Link></li>
                    <li><Link to="/query">Query missing age and city</Link></li>
                    <li><Link to="/query?city=23">Query missing age</Link></li>
                    <li><Link to="/query?age=23&city=HCM">Query</Link></li>
                    <li><Link to="/params-and-query/1/cuong/?age=23&city=HCM">Params And Query</Link></li>
                </ul>

                <Route exact path="/home" component={Home} />
                <Route exact path="/params/:id/:name" component={Params} />
                <Route path="/query" component={Query} />
                <Route path="/params-and-query/:id/:name" component={ParamsAndQuery} />
                <br />
                <Route component={Handle} />
            </div>
        </>
    );
}

const Home = ({ location }) => {
    return (
        <div>
            <h2>Home</h2>
            <p>{location.pathname}</p>
        </div>
    );
}

const Params = ({ location, match }) => {
    let params = match.params;
    return (
        <div>
            <h2>Params</h2>
            <p>{location.pathname}</p>
            <p>{params.id}</p>
            <p>{params.name}</p>
        </div>
    );
}

const Query = ({ location }) => {
    let query = new URLSearchParams(location.search);
    return (
        <div>
            <h2>Query</h2>
            <p>{query.get("age")}</p>
            <p>{query.get("city")}</p>
        </div>
    );
}

const ParamsAndQuery = ({ location, match }) => {
    let params = match.params;
    let query = new URLSearchParams(location.search);
    return (
        <div>
            <h2>Params And Query</h2>
            <p>{params.id}</p>
            <p>{params.name}</p>
            <p>{query.get("age")}</p>
            <p>{query.get("city")}</p>
        </div>
    );
}

const isNull = (value) => {
    return typeof value === 'undefined' || value == null
}

const isBlank = (value) => {
    return typeof value === 'undefined' || value == null || value === '';
}

const getSubUrlWithParam = param => {
    if (isBlank(param)) {
        return '';
    }
    return '/' + param;
}

const getSearchQuery = (names, ...queries) => {
    let fullQuery = {};
    for(let [index, query] of queries.entries()) {
        if (!isBlank(query)) {
            fullQuery[names[index]] = query;
        }
    }
    return "?" + new URLSearchParams(fullQuery).toString();
}

const Handle = ({ history, match }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [handleResult, setHandleResult] = useState('');
    const go = () => {
        history.push({
            pathname: '/handle'+getSubUrlWithParam(id)+getSubUrlWithParam(name),
            search: getSearchQuery(['age', 'city'], age, city),
            state: { id, name }
        })
    }
    history.listen((location, action) => {
        let state = location.state;
        if(isNull(state)) {
            state = {id:'',name:''}
        }
        let query = new URLSearchParams(location.search);
        setHandleResult((
            <span>
                <p>location: {location.pathname}</p>
                <p>id: {state.id}</p>
                <p>name: {state.name}</p>
                <p>age: {query.get("age")}</p>
                <p>city: {query.get("city")}</p>
            </span>
        ))
    });
    return (
        <div>
            <input onChange={(e) => setId(e.target.value)} value={id} placeholder="id" />
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="name" />
            <input onChange={(e) => setAge(e.target.value)} value={age} placeholder="age" />
            <input onChange={(e) => setCity(e.target.value)} value={city} placeholder="city" />
            <button onClick={() => go()}>Go And Handle</button>
            <h5>Handle Result: {handleResult}</h5>
        </div>
    )
}

export default HandleHashRouterInFunctionExample; // use withRouter to access props.history, this component cannot be use outside <Router />