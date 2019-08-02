import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; // use withRouter to access props.history
import { AppProvider } from './contexts/AppContext'
import BasicExample from './router-example/Basic';
import ParamsExample from './router-example/URLParameters';
import AuthExample from './router-example/RedirectsAuth';
import CustomLinkExample from './router-example/CustomLink';
import PreventingTransitionsExample from './router-example/PreventingTransitions';
import NoMatchExample from './router-example/NoMatch404';
import RecursiveExample from './router-example/RecusivePaths';
import SidebarExample from './router-example/SideBar';
import AnimationExample from './router-example/AnimatedTransitions';
import AmbiguousExample from './router-example/AmbiguousMatch';
import RouteConfigExample from './router-example/RouteConfig';
import ModalGallery from './router-example/ModalGallery';
import StaticRouterExample from './router-example/StaticRouteContext';
import ParamsQueryExample from './router-example/QueryParameters';

function App({ history }) {
  const [example, setExample] = useState("BasicExample");
  const [isSomeDataHidden, setIsSomeDataHidden] = useState(false);
  const selectExample = (
    <select value={example} onChange={(e) => {
      history.push('/')
      setExample(e.target.value)
    }}>
      <option value="BasicExample">BasicExample</option>
      <option value="ParamsExample">ParamsExample</option>
      <option value="AuthExample">AuthExample</option>
      <option value="CustomLinkExample">BasicExample</option>
      <option value="PreventingTransitionsExample">ParamsExample</option>
      <option value="NoMatchExample">AuthExample</option>
      <option value="RecursiveExample">BasicExample</option>
      <option value="SidebarExample">ParamsExample</option>
      <option value="AnimationExample">AnimationExample</option>
      <option value="AmbiguousExample">AmbiguousExample</option>
      <option value="RouteConfigExample">RouteConfigExample</option>
      <option value="ModalGallery">ModalGallery</option>
      <option value="StaticRouterExample">StaticRouterExample</option>
      <option value="ParamsQueryExample">ParamsQueryExample</option>
    </select>
  )
  let exampleComponent = (() => {
    switch (example) {
      case "BasicExample":
        return <BasicExample />
      case "ParamsExample":
        return <ParamsExample />
      case "AuthExample":
        return <AuthExample />
      case "CustomLinkExample":
        return <CustomLinkExample />
      case "PreventingTransitionsExample":
        return <PreventingTransitionsExample />
      case "NoMatchExample":
        return <NoMatchExample />
      case "RecursiveExample":
        return <RecursiveExample />
      case "SidebarExample":
        return <SidebarExample />
      case "AnimationExample":
        return <AnimationExample />
      case "AmbiguousExample":
        return <AmbiguousExample />
      case "RouteConfigExample":
        return <RouteConfigExample />
      case "ModalGallery":
        return <ModalGallery />
      case "StaticRouterExample":
        return <StaticRouterExample />
      case "ParamsQueryExample":
        return <ParamsQueryExample />
      default:
        return <React.Fragment>No Component</React.Fragment>
    }
  })();
  return (
    <AppProvider value={setIsSomeDataHidden}>
      <div className="App">
        <h1>{!isSomeDataHidden && example}</h1>
        {exampleComponent}
        {!isSomeDataHidden && <hr/>}
        {!isSomeDataHidden && <h4>Select other examples</h4>}
        {!isSomeDataHidden && selectExample}
      </div>
    </AppProvider>
  );
}

export default withRouter(App); // use withRouter to access props.history, this component cannot be use outside <Router />
