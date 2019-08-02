# References:

## https://www.taniarascia.com/getting-started-with-react/

### ADVANCED GUIDES:

Accessibility
Code-Splitting
Context
Error Boundaries
Forwarding Refs
Fragments
Higher-Order Components
Integrating with Other Libraries
JSX In Depth
Optimizing Performance
Portals
React Without ES6
React Without JSX
Reconciliation
Refs and the DOM
Render Props
Static Type Checking
Strict Mode
Typechecking With PropTypes
Uncontrolled Components
Web Components

### Should Read 

1/ Code-Splitting
- spliting the bundle, solve the problem bundle too large when using Webpack or Browserify. 
- React.lazy
- ...
- more details: https://reactjs.org/docs/code-splitting.html

2/ Context
- Problem: user and avatarSize are passed many times in the following code:
    <Page user={user} avatarSize={avatarSize} />
    // ... which renders ...
        <PageLayout user={user} avatarSize={avatarSize} />
            // ... which renders ...
            <NavigationBar user={user} avatarSize={avatarSize} />
                // ... which renders ...
                <Link href={user.permalink}>
                    <Avatar user={user} size={avatarSize} />
                </Link>
- Context can solve this problem passing props top-down many times
- more details: https://reactjs.org/docs/context.html 

3/ Higher-Order Components
- A higher-order component (HOC) is an advanced technique in React for reusing component logic.
- Use HOCs For Cross-Cutting Concerns
- Don’t Mutate the Original Component. Use Composition.
- more details: https://reactjs.org/docs/higher-order-components.html

4/ Integrating with Other Libraries
- such as: Jquery ...
- more details: https://reactjs.org/docs/integrating-with-other-libraries.html

5/ Optimizing Performance:
- Use the Production Build to improve Performance
- Profiling Components with the Chrome Performance Tab
- Profiling Components with the DevTools Profiler
- Avoid Reconciliation
- using shouldComponentUpdate In Action
- The Power Of Not Mutating Data
- Using Immutable Data Structures
- more details: https://reactjs.org/docs/optimizing-performance.html

6/ React Without ES6
- more details: https://reactjs.org/docs/react-without-es6.html

7/ React Without JSX
- we can use createElement instead of JSX
- more details: https://reactjs.org/docs/react-without-jsx.html

8/ Reconciliation
- more details: https://reactjs.org/docs/reconciliation.html

9/ Static Type Checking
- flow: by Facebook, provide data type for js
- typescript
- more details: https://reactjs.org/docs/static-type-checking.html

10/ Strict Mode
- Identifying unsafe lifecycles
- Warning about legacy string ref API usage
- Warning about deprecated findDOMNode usage
- Detecting unexpected side effects
- etecting legacy context API
- more details: https://reactjs.org/docs/strict-mode.html

11/ Typechecking With PropTypes
- As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. 
- more details: https://reactjs.org/docs/typechecking-with-proptypes.html

12/ Uncontrolled Components
- Can be used to handle to form with Ref
- In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
- To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.
- Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.
- more details: https://reactjs.org/docs/uncontrolled-components.html