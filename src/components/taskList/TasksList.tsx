import { useSelector } from "react-redux";
import TaskColumn from "../taskColumn/TaskColumn";
import { usersSelector } from "../../features/selectors";
import "./TasksList.scss";

const TasksList = () => {
	const users = useSelector(usersSelector);

	return (
		<div className="tasksList">
			{users.map((user) => (
				<TaskColumn key={user.id} id={user.id} />
			))}
		</div>
	);
};

export default TasksList;
