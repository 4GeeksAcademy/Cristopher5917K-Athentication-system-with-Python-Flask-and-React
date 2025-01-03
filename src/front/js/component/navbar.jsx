import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Navbar = () => {

const {actions, store}=useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{
						store.currentUser ?
						<button className="btn btn-danger" onClick={()=>actions.logOut()}>
						Log out</button>:
						<>
							<Link to="/login">
							<button className="btn btn-primary mx-2">Login</button>
							</Link>
							<Link to="/register">
							<button className="btn btn-primary">Register</button>
							</Link>
							
						</>
					}
					
				</div>
			</div>
		</nav>
	);
};

export default Navbar;