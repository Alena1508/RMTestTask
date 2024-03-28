import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/searchSlice";
import { searchSelector } from "../../features/selectors";

const SearchTask = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(searchSelector);
	const placeholderText = "Search...";

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.target.value));
	};

	return (
		<div>
			<input type="search" value={searchValue} onChange={handleSearch} placeholder={placeholderText} />
		</div>
	);
};

export default SearchTask;
