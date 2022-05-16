import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import newPlan from "../components/NewPlan";
import MyPlans from "../pages/MyPlans";
import PlanPage from "../pages/PlanPage";
import SharedPlans from "../pages/SharedPlans";
import TaskPage from "../pages/TaskPage";
import ProfilePage from "../pages/ProfilePage";
import Logout from "../auth/Logout";

export const publicRoutes = [
    {path: "/signup", component: Signup, exact: true},
    {path: "/signin", component: Signin, exact: true},
]

export const privateRoutes = [
    {path: "/new-plan", component: newPlan, exact: true},
    {path: "/plans", component: MyPlans, exact: true},
    {path: "/shared-plans", component: SharedPlans, exact: true},
    {path: "/plan/:id", component: PlanPage, exact: true},
    {path: "/task/:id", component: TaskPage, exact: true},
    {path: "/profile", component: ProfilePage, exact: true},
    {path: "/logout", component: Logout, exact: true}
]
