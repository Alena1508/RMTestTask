import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterByStatus, setSearchQuery, TasksFilters } from "../../store/slice/filterSlice.ts";
import { searchSelector } from "../../store/selectors";
import "./Filter.scss";

const Filter = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(searchSelector);
	const placeholderText = "Search...";
	const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilterByStatus(e.target.value));
	};
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.target.value));
	};

	return (
		<div className="filter">
			<div>
				<select onChange={handleFilterChange}>
					{Object.values(TasksFilters).map((o) => (
						<option key={o}>{o}</option>
					))}
				</select>
			</div>
			<div>
				<input type="search" value={searchValue} onChange={handleSearch} placeholder={placeholderText} />
			</div>
		</div>
	);
};

export default Filter;
