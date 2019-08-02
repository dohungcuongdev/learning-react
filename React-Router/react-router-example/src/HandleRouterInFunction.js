import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"; // use withRouter to access props.history

function HandleRouterInFunctionExample() {
    return (
        <Router>
            <HandleRouterInFunctionWrapper />
        </Router>
    )
}

const HandleRouterInFunctionWrapper = withRouter(HandleRouterInFunction);

function HandleRouterInFunction({ history }) {

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

const isBlank = value => {
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

export default HandleRouterInFunctionExample; // use withRouter to access props.history, this component cannot be use outside <Router />