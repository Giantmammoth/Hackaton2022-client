import logo from './logo.svg';
import './App.css';
import AccueilPage from './Pages/Accueil/AccueilPage';
import Barnav from './Components/Accueil/Barnav';
import * as ROUTES from './Routes'
import LibrairiePage from './Pages/Librairie/LibrairiePage';
import Signup from './Components/Signup/Signup';
import EmailVerify from './Components/EmailVerify/EmailVerify';
import Login from './Components/Login/Login';
import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./Redux/userSlice/apiCalls";
import {PrivateRoute} from "./PrivateRoute";
import DashboardPage from './Pages/Dashboard/DashboardPage';

function App() {

  const user = useSelector((state) => state.auth.user);
  
	const dispatch = useDispatch();
  const location = useLocation();


	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}
    
		if (user && token) {
			getUser(user._id , dispatch);
		}
	}, [dispatch, user]);

  return (
    <Fragment>
      
    {user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !=="/users/:id/verify/:token" && (
        <Fragment>
          <div className='navbarContainer' style={{height: '60vh'}}>
            <div className='navbarBackground' style={{height: '60vh'}}>
              <Barnav/>
            </div>
          </div>
          
        </Fragment>
      )}
    <Routes>
      <Route exact path={ROUTES.Accueil} element={<AccueilPage />} />
      <Route exact path={ROUTES.Login} element={<Login />} />

            <Route exact user={user} path={ROUTES.Dashboard} element={<PrivateRoute> <DashboardPage/> </PrivateRoute>}/>

      <Route path={ROUTES.Login} element={<Navigate replace to={ROUTES.Dashboard} />} />
      <Route path={ROUTES.Dashboard} element={<Navigate replace to={ROUTES.Login} />} />
      <Route path={ROUTES.SignUp} element={<Signup />} />
     
      <Route path={ROUTES.Verify} exact element={<EmailVerify />} />
    </Routes>
  </Fragment>
  );
}

export default App;
