#. General: Store and State
- Both Vuex and Redux have a single store object which maintains all the application state variables

### How Vuex does it
- Vuex is tightly coupled with VueJS hence there is less boilerplate code for Vuex to get started with.

<script>
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './main.css';
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
</script>

- Vuex state is mutable, hence we can directly create state variables and assign values to them.

<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  }
});
</script>

### How Redux does it
- Redux is framework agnostic, It is not specific to React. Hence we need to import few other libraries for it to work.

<script>
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(
    reducer
    );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
</script>

- Redux uses Reducers, which are pure functions that take the previous state and action, and return the next state. we’ll talk more about this below.

<script>
var initialState = [];
const todos = (state = initialState, action) => {
  
};

export default todos;
</script>


#. Differences Vuex vs Redux
### 1. Using these states in our application
- [mapState() + mapGetters + state + getters] vs mapStateToProps()

### 2. Modifying the State
- mutation vs reducers

### 3. Modifying the State from our Components
- mapMutations() vs mapDispatchToProps()

### 4. Making Async Calls
- 

#. Explain differences:
## 1. Using these states in our application
- Now that we were able to create a state with one TODO item hardcoded, Let’s see how we can use this in our application.

### How Vuex does it
- Vue has a mapState() helper function to map the states from our Vuex store to our components. These mapped variables can then be accessed directly like normal state variables, though we cannot modify these variables directly. 

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  computed: {
    ...mapGetters(['completedList']),
    ...mapState({
      todoList: state => state.todos
    })
   }
}
</script>

<script>
export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    completedList(state) {
      return state.todos.filter(todos => todos.completed === true);
    }
  }
})
</script>

- If we need to perform some operation on our state variables and get the computed value to use in various components, we can make use of Vuex’s getters by using this in our template:

<li v-for="(item, index) in todoList" 
  :key="item.id" 
  :class="{ completed: item.completed}"
>

### How Redux does it
- Redux has mapStateToProps() method which is passed to a higher order component connect provided by react-redux library. These states are now accessible as props in our component.

<script>
//component
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return { todos: state };
}
export default connect(mapStateToProps)(App);
</script>

- Redux doesn’t provide any similar feature to getters, we can write our own utility methods in a separate file and import them wherever necessary by using this in the template:

<script>
renderList() {
    return this.props.todos.map(item => {
        return (
            <li key={item.id}
            className={"todo " + (item.completed ? "completed" : "")}
            onClick={() => this.props.toggleCompletion(item.id)}>
            </li>
        )
    })
}
</script>

## 2. Modifying the State
- A state variable should not be modified directly. We use special methods to modify/update them so that it can be tracked properly.

### How Vuex does it
- The only way to actually change state in a Vuex store is by committing a mutation. Vuex mutations are very similar to events; each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will receive the state as the first argument.

<script>
//store.js
export default {
    mutations: {
        addItem(state, payload) {
            state.todos.push({id:GLOBAL_ID++, title: payload, completed: false});
        },
        togglecompletion(state, id) {
            state.todos.forEach( item => {
                if(item.id === id) 
                item.completed = !item.completed;
            })
        },
        removeItem(state, index) {
            state.todos.splice(index, 1);
        }
    }
}
</script>

- Mutations also take payload as an optional second argument, If we have to pass more data then we can either send array or objects in payload.

### How Redux does it
- In Redux the state modification methods are also written in reducers.

<script>
//reducer/index.js
const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: GLOBAL_ID++,
          title: action.title,
          completed: false
        }
      ];
    case "TOGGLE_COMPLETION":
      console.log('action', action);
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_ITEM":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};
</script>

- Reducers maintain both state and their modification methods, These methods are called by dispatching actions. These actions also take payload to send data from our application to our Redux store. (Remember, in Redux states are immutable)

<script>
//actions/index.js
let nextTodoId = 0;
export const addItem = title => {
  return {
    type: "ADD_ITEM",
    id: nextTodoId++,
    title
  };
};
export const toggleCompletion = id => {
  return {
    type: "TOGGLE_COMPLETION",
    id
  };
};
export const removeItem = id => {
  return {
    type: "REMOVE_ITEM",
    id
  }
};

</script>

- We also create a new file to store all our actions, This is not a compulsion but it makes our code look more organized. Rather than doing it in the later part of the code, let’s do that now.

## 3. Modifying the State from our Components
### How Vuex does it
- Vuex provides a helper method mapMutations() to access our mutations in the components.

<script>
export default {
    methods: {
        ...mapMutations([
            'addItem', 
            'togglecompletion',
            'removeItem',
        ])
    }
}
</script>

- After mapping, these methods can then be accessed like normal component methods by using these mutations in our component:

<template>
    <button class="destroy" @click.stop="removeTodo(index)"></button>
</template>
<script>
export default {
    methods: {
        removeTodo: function(index) {
            this.removeItem(index);
        }
    }
}
</script>

### How Redux does it
- Similar to mapStateToProps() Redux provides us with another helper called mapDispatchToProps() passed to our HOC.
<script>
    const mapDispatcherstoProps = dispatch =>  {
    return {
        toggleCompletion: (id) => dispatch(toggleCompletion(id)),
        removeItem: (id) => dispatch(removeItem(id)),
        addItem: (title)=> dispatch(addItem(title)),
        addItemFromWeb: ()=> dispatch(addItemFromWeb())   
    }
}
export default connect(mapStateToProps, mapDispatcherstoProps)(App);
</script>

- This method gets dispatch as an argument, this dispatch method is used to commit our actions. These actions are now mapped to local methods which are available through props, as such:

<script>
<button className="destroy" 
    onClick={() => this.props.removeItem(item.id)}
/>
</script>

- Now our TO DO LIST App is completely functional, we can add items, check completed items and remove items.

## Making Async Calls
- Expanding our TO DO LIST application, let’s say we want to load the list for a user stored in the server, we cannot make a call to the server directly from our Vuex mutations or Redux actions as they are synchronous methods. We need special ways to achieve this.

### How Vuex does it
- Mutations are pure synchronous functions, we cannot cause side effects in our mutations. To make Async calls, Vuex has actions. Actions are similar to mutations but instead of mutating the state, actions commit mutations.

<script>
//store.js
export default {
    actions: {
        addItemFromWeb(context) {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => {
            console.log(response);
            context.commit('addItem', response.data.title)
        })
        .catch((error) => console.log(error));
        }
    }
}
</script>

- In the above example, we make use of axios library to make HTTP call.

- To use these actions in our components, Vuex provides us with mapActions() helper method.

<button @click="addItemFromWeb"> Async Add </button>
<script>
export default {
    methods: {
            ...mapActions([
            'addItemFromWeb'
        ])
    }
}
</script>

### How Redux does it
- Redux does not provide any out of the box solution as Vuex does, hence we need Middlewares to make Async calls.

- To achieve this we use a middleware called redux-thunk. This middleware is very simple it checks whether the action is a function. If it is, then that function is invoked with dispatch. If not, the reducers are called directly.

<script>
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(
   reducer,
   applyMiddleware(thunk),
);
</script>

- Now in actions.js we create our async function:

<script>
export const addItemFromWeb = () => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) =>{
            console.log(response);
            dispatch(addItem(response.data.title));
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
</script>

## Application Management and Scaling
- As our application grows we would have more states to manage, we cannot have a single store.js file for Vuex or a single reducer.js file for Redux, we need to modularise our application.

### How Vuex does it
- Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules.

<script>
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
</script>

- Inside a module’s mutations and getters, the first argument received will be the module’s local state.
Each module can be written in separate files which can be imported in store.js

### How Redux does it
- We can split our root reducer into multiple reducers and then combine them together. Each reducer will be responsible for managing the states within them.

<script>
import { combineReducers } from 'redux' 
import todos from './todos' 
import counter from './counter'
  
let reducers = combineReducers({
todo: todos,
ctr: counter
})
const store = createStore(reducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
</script>

- Redux library provides us with a feature called combineReducers to combine all our reducers into a single reducer. (Note that we cannot directly access the states present in one reducer in another) data required for a reducer should be passed by the component through actions.


## Conclusion
- We compared two very popular state management libraries, both inspired by Flux architecture, both have the same end goal but takes a different path to achieve it.

#. References:
- https://medium.com/javascript-in-plain-english/similarities-and-differences-between-vuex-and-redux-by-developing-an-application-be3df0164b22

# Code
- https://github.com/dohungcuongdev/vuex-todos
- https://github.com/dohungcuongdev/redux-todos