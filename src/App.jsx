import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard/dashboard';
import Create from './pages/create/create';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Project from './pages/projects/project';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="container">
					<Navbar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/create" element={<Create />} />
						<Route path="/projects/:id" element={<Project />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
