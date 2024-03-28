import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addUser, IUser } from "../../../store/slice/userSlice.ts";

const CreateUserForm = () => {
	const [userName, setUserName] = useState<string>("");
	const dispatch = useDispatch();
	const isDisabledBtn = userName === "";
	const user: IUser = {
		id: uuidv4(),
		name: userName,
	};

	const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		dispatch(addUser(user));
		setUserName("");
	};

	return (
		<div>
			<h3>Create User</h3>
			<form onSubmit={handleSubmit}>
				<input type="text" value={userName} onChange={handleUserNameChange} placeholder="User name..." />
				<button disabled={isDisabledBtn}>Create User</button>
			</form>
		</div>
	);
};

export default CreateUserForm;
