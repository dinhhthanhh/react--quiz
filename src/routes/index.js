import PrivateRoutes from "../components/PrivateRoute";
import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Answer from  "../Pages/Answer";
import Quizz from "../Pages/Quizz";
import Result from "../Pages/Result";
import Topic from "../Pages/Topic";
import Logout from "../Pages/Logout";
import Error from "../Pages/Error404";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault/>,
        children: [
            {
                path: "/",
                element: <Home />
            },  
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'answer',
                        element: <Answer />
                    },
                    {
                        path: 'quiz/:id',
                        element: <Quizz />
                    },
                    {
                        path: 'result/:id',
                        element: <Result />
                    },
                    {
                        path: "/topic",
                        element: <Topic />
                    },
                ]
            }
        ],
        
    },
    {
        path: "*",
        element: <Error />
    }
];
