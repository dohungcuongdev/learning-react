import React, {useState} from 'react';
import AppBasicRouting from './AppBasicRouting';
import AppNestedRouting from './AppNestedRouting';
import AppRouteSwitchLinkNavLinkRedirect from './AppRouteSwitchLinkNavLinkRedirect';
import HandleRouterInFunctionExample from './HandleRouterInFunction';
import HandleHashRouterInFunctionExample from './HandleHashRouterInFunction';

function App() {
  const [example, setExample] = useState("AppBasicRouting");
  const selectExample = (
    <select value={example} onChange={(e) => {
      let lpn = window.location.pathname;
      let lh = window.location.href;
      if(lpn !== '/' || (lh.includes('#'))) {
        window.location.href='/';
      }
      setExample(e.target.value)
    }}>
      <option value="AppBasicRouting">AppBasicRouting</option>
      <option value="AppNestedRouting">AppNestedRouting</option>
      <option value="AppRouteSwitchLinkNavLinkRedirect">AppRouteSwitchLinkNavLinkRedirect</option>
      <option value="HandleRouterInFunctionExample">HandleRouterInFunctionExample</option>
      <option value="HandleHashRouterInFunctionExample">HandleHashRouterInFunctionExample</option>
    </select>
  )
  let exampleComponent = (() => {
    switch (example) {
      case "AppBasicRouting":
        return <AppBasicRouting />
      case "AppNestedRouting":
        return <AppNestedRouting />
      case "AppRouteSwitchLinkNavLinkRedirect":
        return <AppRouteSwitchLinkNavLinkRedirect />
      case "HandleRouterInFunctionExample":
        return <HandleRouterInFunctionExample />
      case "HandleHashRouterInFunctionExample":
        return <HandleHashRouterInFunctionExample />
      default:
        return <React.Fragment>No Component</React.Fragment>
    }
  })();
  return (
    <div className="App">
    <h4>Select other examples</h4>
    <p>Note: Since the examples include BrowserRouter and HashRouter, if the URL is not '[host]/' then select antoher example will redirect to '[host]/'</p>
    {selectExample}
    {exampleComponent}
    </div>
  );
}

export default App;
