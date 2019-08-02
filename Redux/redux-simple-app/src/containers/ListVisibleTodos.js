import { getTodosOnline, clearTodos } from '../actions/todos';
import { connect } from 'react-redux';
import ListTodos from '../components/ListTodos'
import { getVisibleTodos } from '../selectors/getVisibleTodos';

// use selector to improve performance
// like mapGetters in Vuex
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state),
        isOnlineMode: state.isOnlineMode
    };
}

// like mapMutations in Vuex
const mapDispatchToProps = dispatch => ({
    getTodosOnline: () => dispatch(getTodosOnline()),
    clearTodos: () => dispatch(clearTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos);