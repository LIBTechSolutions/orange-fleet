import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import UserProfile  from "views/UserProfile/UserProfile";
// import AppContainer from 'appcontainer/app'
import App from '../App'
// import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Fleet Dashboard", icon: Dashboard, component: DashboardPage, ...this.props  },
    { path: "/user", sidebarName: "User Profile", navbarName: "Profile", icon: Person, component: App, ...this.props },
    // { path: "/table", sidebarName: "Table List", navbarName: "Table List", icon: ContentPaste, component: TableList, ...this.props },
    { path: "/typography", sidebarName: "Typography", navbarName: "Typography", icon: LibraryBooks, component: Typography, ...this.props },
    // { path: "/icons", sidebarName: "Icons", navbarName: "Icons", icon: BubbleChart, component: Icons, ...this.props },
    { path: "/maps", sidebarName: "Maps", navbarName: "Map", icon: LocationOn, component: Maps, ...this.props },
    { path: "/notifications", sidebarName: "Notifications", navbarName: "Notifications", icon: Notifications, component: NotificationsPage, ...this.props },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
