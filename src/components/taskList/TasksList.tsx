import { useSelector } from "react-redux";
import UserColumn from "../userColumn/UserColumn.tsx";
import { usersSelector } from "../../store/selectors";
import "./TasksList.scss";

const TasksList = () => {
	const users = useSelector(usersSelector);

	return (
		<div className="tasksList">
			{users.map((user) => (
				<UserColumn key={user.id} id={user.id} />
			))}
		</div>
	);
};

export default TasksList;
