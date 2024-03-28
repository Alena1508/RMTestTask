import CreateTaskForm from "../forms/createTaskForm/CreateTaskForm.tsx";
import CreateUserForm from "../forms/createUserForm/CreateUserForm.tsx";
import Filter from "../filter/Filter.tsx";
import TasksList from "../taskList/TasksList.tsx";

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
				<Filter />
			</div>
			<TasksList />
		</div>
	);
};

export default TodoList;
