import "./App.css";
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
