import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, ITask } from "../../../store/slice/taskSlice.ts";
import { usersSelector } from "../../../store/selectors.ts";

const CreateTaskForm = () => {
	const [taskName, setTaskName] = useState<string>("");
	const [selectedUserId, setSelectedUserId] = useState<string>("unassigned");
	const users = useSelector(usersSelector);
	const isDisabledBtn = taskName === "";

	const dispatch = useDispatch();

	const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskName(e.target.value);
	};

	const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedUserId(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const task: ITask = {
			id: uuidv4(),
			name: taskName,
			completed: false,
			userId: selectedUserId,
		};
		dispatch(addTask(task));
		setTaskName("");
	};

	return (
		<div>
			<h3>Create Task</h3>
			<form onSubmit={handleSubmit}>
				<input type="text" value={taskName} onChange={handleTaskNameChange} placeholder="Task name..." />
				<select onChange={handleUserChange} value={selectedUserId}>
					{users.map((user) => (
						<option value={user.id} key={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<button type="submit" disabled={isDisabledBtn}>
					Create Task
				</button>
			</form>
		</div>
	);
};

export default CreateTaskForm;
