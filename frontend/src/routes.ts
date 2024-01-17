import AddEventPage from "./views/AddEvent";
import EventPage from "./views/Event";
import Home from "./views/Home";

export const routes = Object.freeze([
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/event/:id",
    component: EventPage,
  },
  {
    path: "/event/add",
    component: AddEventPage,
  }
]);