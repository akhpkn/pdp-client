import Signup from "../user/Signup";
import Signin from "../user/Signin";
import newPlan from "../plan/NewPlan";
import MyPlans from "../pages/MyPlans";
import PlanPage from "../pages/PlanPage";
import SharedPlans from "../pages/SharedPlans";
import TaskPage from "../pages/TaskPage";
import ProfilePage from "../pages/ProfilePage";
import TeamPage from "../pages/TeamPage";

export const routes = [
    {path: "/signup", component: Signup, exact: true},
    {path: "/signin", component: Signin, exact: true},
    {path: "/new-plan", component: newPlan, exact: true},
    {path: "/plans", component: MyPlans, exact: true},
    {path: "/shared-plans", component: SharedPlans, exact: true},
    {path: "/plan/:id", component: PlanPage, exact: true},
    {path: "/task/:id", component: TaskPage, exact: true},
    {path: "/profile", component: ProfilePage, exact: true},
    {path: "/team", component: TeamPage, exact: true}
]
