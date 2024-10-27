import { VISIBILITY_FILTERS } from "../core/utilis/constants";
import { useSelector } from "react-redux";

const getTodosByVisibilityFilter = (store, visibilityFilter) => {
const allTodos = useSelector((store) => store.todoList.value);
switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
}

export default getTodosByVisibilityFilter;