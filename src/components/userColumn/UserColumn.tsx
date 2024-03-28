import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { getTasksByUserId, getUserNameByUserId } from "../../store/selectors";
import { deleteTask, moveTaskToUser, toggleComplete } from "../../store/slice/taskSlice.ts";
import { changeUserOrder, deleteUser } from "../../store/slice/userSlice.ts";
import Task from "../task/Task.tsx";
import "./UserColumn.scss";

interface IUserColumn {
	id: string;
}

interface IDragItem {
	dragId: string;
	type: string;
}

const UserColumn = ({ id }: IUserColumn) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const userTasks = useSelector(getTasksByUserId(id));
	const userName = useSelector(getUserNameByUserId(id));

	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
	const [toggleCompletedFlag, setToggleCompletedFlag] = useState<boolean>(true);

	const usersTasksIds = userTasks.map((task) => task.id);
	const actualSelectedIds = selectedTasks.filter((id) => usersTasksIds.includes(id));
	const isActionButtonDisabled = !actualSelectedIds.length;
	const hasUserTasks = userTasks.length !== 0;
	const isSelectedAllTasks = hasUserTasks && actualSelectedIds.length === userTasks.length;

	useEffect(() => {
		// update selected ids when task moved or deleted
		if (actualSelectedIds.length < selectedTasks.length)
			setSelectedTasks(selectedTasks.filter((id) => usersTasksIds.includes(id)));
	}, [userTasks.length]);

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
				return handleAddTaskToUserColumn(dragId);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[],
	);
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
	const handleAddTaskToUserColumn = (dragId: string) => {
		dispatch(moveTaskToUser({ dragId, userId: id }));
		// setSelectedTasks(selectedTasks.filter((id) => id !== dragId));
	};
	const handleChangeUserOrder = (dragId: string, dropId: string) => {
		dispatch(changeUserOrder({ dragId, dropId }));
	};
	const opacity = isDragging ? 0.5 : 1;

	drag(drop(ref));
	return (
		<div className="userColumn" ref={ref} style={{ opacity }}>
			<div className="userColumnHeader">
				<h2>{userName}</h2>
				<button className="userColumnBtn" onClick={handleDeleteUser}>
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
				<div className="userColumnActions">
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

export default UserColumn;
