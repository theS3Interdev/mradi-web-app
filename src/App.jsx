import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/use-auth-context';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard/dashboard';
import Create from './pages/create/create';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Project from './pages/projects/project';

const App = () => {
	const { authIsReady, user } = useAuthContext();

	return (
		<div className="app">
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}

					<div className="container">
						<Navbar />
						<Routes>
							<Route
								path="/"
								element={user ? <Dashboard /> : <Navigate to="/signin" />}
							/>
							<Route
								path="/create"
								element={user ? <Create /> : <Navigate to="/signin" />}
							/>
							<Route
								path="/projects/:id"
								element={user ? <Project /> : <Navigate to="signin" />}
							/>
							<Route path="/signin" element={user ? <Navigate to="/" /> : <Signin />} />
							<Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
						</Routes>
					</div>
				</BrowserRouter>
			)}
		</div>
	);
};

export default App;
