import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { getTasksByUserId, getUserNameByUserId } from "../../features/selectors";
import { deleteTask, moveTaskToUser, toggleComplete } from "../../features/taskSlice";
import { changeUserOrder, deleteUser } from "../../features/userSlice";
import Task from "../task/Task";
import "./TaskColumn.scss";

interface ITaskColumn {
	id: string;
}

interface IDragItem {
	dragId: string;
	type: string;
}

const TaskColumn = ({ id }: ITaskColumn) => {
	const ref = useRef<HTMLDivElement>(null);
	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
	const [toggleCompletedFlag, setToggleCompletedFlag] = useState<boolean>(true);
	const userTasks = useSelector(getTasksByUserId(id));
	const userName = useSelector(getUserNameByUserId(id));
	const hasUserTasks = userTasks.length !== 0;
	const isSelectedAllTasks = hasUserTasks && selectedTasks.length === userTasks.length;
	const dispatch = useDispatch();
	const isActionButtonDisabled = !selectedTasks.length;

	useEffect(() => {
		const usersTasksIds = userTasks.map((task) => task.id);
		if (selectedTasks.length > usersTasksIds.length) {
			setSelectedTasks(usersTasksIds);
		}
	}, [selectedTasks.length, userTasks]);

	const handleAllTasks = (isChecked: boolean) => {
		setSelectedTasks(isChecked ? userTasks.map((t) => t.id) : []);
	};

	const handleSelectTask = (isChecked: boolean, checkedId: string) => {
		const tasks = isChecked ? selectedTasks.filter((id) => id !== checkedId) : [...selectedTasks, checkedId];
		setSelectedTasks(tasks);
	};

	const handleToggleComplete = (isCompleted: boolean, tasksIds: string[]) => {
		const payload = {
			ids: tasksIds,
			completed: toggleCompletedFlag,
		};
		dispatch(toggleComplete(payload));
		setToggleCompletedFlag(!isCompleted);
	};

	const handleDeleteTask = (tasksIds: string[]) => {
		dispatch(deleteTask(tasksIds));
	};
	const handleDeleteUser = () => {
		dispatch(deleteUser(id));
	};

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "user",
			item: { dragId: id, type: "user" },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[],
	);
	const [, drop] = useDrop(
		() => ({
			accept: ["user", "task"],
			drop: ({ dragId, type }: IDragItem) => {
				if (type === "user") {
					return handleChangeUserOrder(dragId, id);
				}
				return addTaskToUserColumn(dragId);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[],
	);
	const addTaskToUserColumn = (dragId: string) => {
		dispatch(moveTaskToUser({ dragId, userId: id }));
	};
	const handleChangeUserOrder = (dragId: string, dropId: string) => {
		dispatch(changeUserOrder({ dragId, dropId }));
	};

	const opacity = isDragging ? 0.5 : 1;
	drag(drop(ref));
	return (
		<div className="taskColumn" ref={ref} style={{ opacity }}>
			<div className="taskColumnHeader">
				<h2>{userName}</h2>
				<button className="taskColumnBtn" onClick={handleDeleteUser}>
					X
				</button>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						onChange={(e) => handleAllTasks(e.target.checked)}
						checked={isSelectedAllTasks}
						disabled={!hasUserTasks}
					/>
					Select all
				</label>
				<div className="taskColumnActions">
					<button onClick={() => handleDeleteTask(selectedTasks)} disabled={isActionButtonDisabled}>
						Delete selected
					</button>
					<button
						onClick={() => handleToggleComplete(toggleCompletedFlag, selectedTasks)}
						disabled={isActionButtonDisabled}
					>
						Mark as {!toggleCompletedFlag ? `un` : ""}completed
					</button>
				</div>
			</div>
			{hasUserTasks ? (
				<>
					{userTasks.map((taskItem) => (
						<Task
							key={taskItem.id}
							name={taskItem.name}
							id={taskItem.id}
							isChecked={selectedTasks.includes(taskItem.id)}
							handleSelectTask={handleSelectTask}
							handleDeleteTask={handleDeleteTask}
							handleToggleComplete={handleToggleComplete}
							isCompleted={taskItem.completed}
						/>
					))}
				</>
			) : (
				<p className="noResultsText">No tasks found</p>
			)}
		</div>
	);
};

export default TaskColumn;
