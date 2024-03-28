import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoList from "./components/toDoList/TodoList.tsx";
import { persistor, store } from "./store/store.ts";
import "./App.scss";

const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<div className="app">
						<TodoList />
					</div>
				</PersistGate>
			</Provider>
		</DndProvider>
	);
};

export default App;
