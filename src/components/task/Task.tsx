import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { reorderTask } from "../../features/taskSlice";
import "./Task.scss";

interface ITaskItem {
	name: string;
	id: string;
	isChecked: boolean;
	handleSelectTask: (isChecked: boolean, checkedId: string) => void;
	handleDeleteTask: (id: string[]) => void;
	handleToggleComplete: (isCompleted: boolean, id: string[]) => void;
	isCompleted: boolean;
}

const Task = ({
	name,
	id,
	isChecked,
	handleSelectTask,
	handleDeleteTask,
	handleToggleComplete,
	isCompleted,
}: ITaskItem) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "task",
			item: { dragId: id, type: "task" },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[],
	);
	const [, drop] = useDrop(
		() => ({
			accept: "task",
			drop: (item: { dragId: string }) => {
				handleMoveTask(item.dragId, id);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[],
	);
	const handleMoveTask = (dragId: string, dropId: string) => {
		dispatch(reorderTask({ dragId, dropId }));
	};

	const opacity = isDragging ? 0.5 : 1;
	drag(drop(ref));

	return (
		<div className="task" style={{ opacity }} ref={ref}>
			<label>
				<input type="checkbox" checked={isChecked} onChange={() => handleSelectTask(isChecked, id)} />
				<div className="taskName">{name}</div>
			</label>
			<div className="taskActions">
				<button className="taskBtn" onClick={() => handleDeleteTask([id])}>
					X
				</button>
				<label>
					<input type="checkbox" onChange={() => handleToggleComplete(isCompleted, [id])} checked={isCompleted} />
					is completed
				</label>
			</div>
		</div>
	);
};

export default Task;
