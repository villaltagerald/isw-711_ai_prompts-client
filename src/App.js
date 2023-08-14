import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import React,{useEffect,useState} from 'react';

import './App.css';
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error';
import Unauthorized from './Pages/Unauthorized/Unauthorized';
//COMPONENTES GENERALES
import { Registration } from './Pages/Registration/Registration';
import { Login } from './Pages/Login/Login';
//Autenticacion en dos pasos
import { AutentificarFA } from './Pages/AutentificarFA/AutentificarFA';
//COMPONENTES DE USUARIOS
import { NewUser } from './Pages/NewUser/NewUser';
import { UserViews } from './Pages/UserViews/UserViews';
import { UserView } from './Pages/UserView/UserView';
import { UserEdit } from './Pages/UserEdit/UserEdit';
import { UserProfile } from './Pages/UserProfile/UserProfile';
import { Verification } from './Pages/Verification/Verification';
import { RegistrationSuccess } from './Pages/RegistrationSuccess/RegistrationSuccess';
//COMPONENTES DE PROMPTS
import { PromptViews } from './Pages/PromptViews/PromptViews';
import { PromptCreate } from './Pages/PromptCreate/PromptCreate';
import { PromptView } from './Pages/PromptView/PromptView';
import { PromptEdit } from './Pages/PromptEdit/PromptEdit';
//RESET PASSWORD
import { ResetPassword } from './Pages/ResetPassword/ResetPassword';
import { NewPassword } from './Pages/NewPassword/NewPassword';


function App() {
  const user = useSelector((state) => state.user);

  function requireAuth({ Component, role }) {
    return function AuthenticatedRoute(props) {
      const token = sessionStorage.getItem('tokenSesion');
      if (token) {
        if (role.includes(user.role)) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        return <Navigate to="/login" replace />;
      }
    };
  }

  const PublicRoute = (Component) => {
    return function AuthenticatedRoute(props) {
      const token = sessionStorage.getItem('tokenSesion');
      if (token) {
        return <Navigate to="/" replace />;
      } else {
        return <Component {...props} />;
      }
    };
  };

  const PrivateHome = requireAuth({ Component: Home, role: ['users', 'prompts'] });
  const PrivateUnauthorized = requireAuth({ Component: Unauthorized, role: ['users', 'prompts'] });
  //COMPONENTES DE USUERIOS
  const PrivateNewUser = requireAuth({ Component: NewUser, role: ['users'] });
  const PrivateUserEdit = requireAuth({ Component: UserEdit, role: ['users'] });
  const PrivateUserViews = requireAuth({ Component: UserViews, role: ['users'] });
  const PrivateUserView = requireAuth({ Component: UserView, role: ['users'] });
  //COMPONENTES DE PROMPTS
  const PrivatePromptViews = requireAuth({ Component: PromptViews, role: ['prompts'] });
  const PrivatePromptView = requireAuth({ Component: PromptView, role: ['prompts'] });
  const PrivatePromptCreate = requireAuth({ Component: PromptCreate, role: ['prompts'] });
  const PrivatePromptEdit = requireAuth({ Component: PromptEdit, role: ['prompts'] });
  const PrivateUserProfile = requireAuth({ Component: UserProfile, role: ['prompts'] });

  const PublicLogin = PublicRoute(Login);
  const PublicRegistration =PublicRoute(Registration);
  const PublicRegistrationSuccess =PublicRoute(RegistrationSuccess);
  const PublicVerification =PublicRoute(Verification);
  const PublicResetPassword =PublicRoute(ResetPassword);
  const PublicNewPassword =PublicRoute(NewPassword);
  const PublicAutenticarFA=PublicRoute(AutentificarFA);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateHome />,
      errorElement: <Error />,
      children: [
        {
          path: "/userviews",
          element: <PrivateUserViews />,
        },
        {
          path: "/userview/:userId",
          element: <PrivateUserView />,
        },
        {
          path: "/useredit/:userId",
          element: <PrivateUserEdit />,
        },
        {
          path: "/usernew",
          element: <PrivateNewUser />,
        },
        {
          path: "/userprofile",
          element: <PrivateUserProfile />,
        },
        {
          path: "/promptviews",
          element: <PrivatePromptViews />,
        },
        {
          path: "/promptview/:promptId",
          element: <PrivatePromptView />,
        },
        {
          path: "/promptedit/:promptId",
          element: <PrivatePromptEdit />,
        },
        {
          path: "/promptnew",
          element: <PrivatePromptCreate />,
        },
      ],
    },
    {
      path: "/signup",
      element: <PublicRegistration />,
    },{
      path: "/signup_successfully",
      element: <PublicRegistrationSuccess />,
    },
    {
      path: "/login",
      element: <PublicLogin />,
    },
    {
      path: "/autenticartwofa/:userid",
      element: <PublicAutenticarFA />,
    },
    {
      path: "/verification/:validationCode",
      element: <PublicVerification />,
    },
    {
      path: "/reset-password",
      element: <PublicResetPassword />,
    },
    {
      path: "/reset-password/:resetcode",
      element: <PublicNewPassword />,
    },
    {
      path: "/unauthorized",
      element: <PrivateUnauthorized />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;