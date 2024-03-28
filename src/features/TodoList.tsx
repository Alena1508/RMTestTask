import CreateTaskForm from "../components/createTaskForm/CreateTaskForm";
import CreateUserForm from "../components/createUserForm/CreateUserForm";
import SearchTask from "../components/searchTask/SearchTask";
import TasksList from "../components/taskList/TasksList";
import TasksFilter from "../components/tasksFilter/TasksFilter";

import "./Todo.scss";

const TodoList = () => {
	return (
		<div className="todoApp">
			<h2 className="todoAppTitle">Todo App</h2>
			<div className="todoForms">
				<CreateTaskForm />
				<CreateUserForm />
			</div>
			<div className="todoFilters">
				<TasksFilter />
				<SearchTask />
			</div>
			<TasksList />
		</div>
	);
};

export default TodoList;
