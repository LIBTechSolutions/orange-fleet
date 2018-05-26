import React from 'react';
import UserProfile from './UserProfile'

import DashboardPage from "../Dashboard/Dashboard.jsx";

import TableList from "../TableList/TableList.jsx";
import Typography from "../Typography/Typography.jsx";
import Icons from "../Icons/Icons.jsx";
import Maps from "../Maps/Maps.jsx";
import NotificationsPage from "../Notifications/Notifications.jsx";
import IndexPage from './IndexPage'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as VehicleActions from 'actions/vehicles'

import PropTypes from 'prop-types';
import {
    withStyles,
} from 'material-ui';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import {
    Header, Footer, Sidebar
} from 'components';

import appRoutes from 'routes/app';
// import AppContainer from 'appcontainer/app'

import { appStyle } from 'variables/styles';

import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/Logo-Orange.png';

import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';




// export default function App (props) {
//     return (
//         <DashboardPage {...props} />
//     )
// }






class App extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        mobileOpen: false,
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute(){
        return this.props.location.pathname !== "/maps";
    }
    // componentDidMount(){
    //     if(window.innerWidth > 991)
    //     {
    //         // eslint-disable-next-line
    //         const ps = new PerfectScrollbar(this.refs.mainPanel);
    //     }
    // }
    // componentDidUpdate(){
    //     this.refs.mainPanel.scrollTop = 0;
    // }

    DashboardPageComponent = (props) => {
        return (
            <DashboardPage {...props} />
        )
    }

    UserProfileComponent = (props) => {
        return (
            <UserProfile {...props} />
        )
    }

    TableListComponent = (props) => {
        return (
            <TableList {...props} />
        )
    }

    TypographyComponent = (props) => {
        return (
            <Typography {...props} />
        )
    }

    IconsComponent = (props) => {
        return (
            <Icons {...props} />
        )
    }

    MapsComponent = (props) => {
        return (
            <Maps {...props} />
        )
    }

    NotificationsPageComponent = (props) => {
        return (
            <NotificationsPage {...props} />
        )
    }

    // IndexPageComponent (props) {
        
    //     return <IndexPage initialized={props.initialized}
    //             busy={props.busy}
    //             checkLogin={props.checkLogin}
    //             loginErrorVisible={props.loginErrorVisible} />
    // }


    render(){

        let loginPage = (<IndexPage initialized={this.props.initialized}
                        busy={this.props.busy}
                        checkLogin={this.props.checkLogin}
                        loginErrorVisible={this.props.loginErrorVisible} />)

        // const loginRoutes = [
        //     { path: "/login", sidebarName: "Dashboard", navbarName: "Fleet Dashboard", icon: Dashboard, component: this.IndexPageComponent, ...this.props  }
        // ]

        const appRoutes = [
            { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Fleet Dashboard", icon: Dashboard, component: this.DashboardPageComponent  },
            { path: "/user", sidebarName: "User Profile", navbarName: "Profile", icon: Person, component: this.UserProfileComponent, ...this.props },
            { path: "/table", sidebarName: "Table List", navbarName: "Table List", icon: ContentPaste, component: this.TableListComponent },
            { path: "/typography", sidebarName: "Typography", navbarName: "Typography", icon: LibraryBooks, component: this.TypographyComponent },
            { path: "/icons", sidebarName: "Icons", navbarName: "Icons", icon: BubbleChart, component: this.IconsComponent },
            { path: "/maps", sidebarName: "Maps", navbarName: "Map", icon: LocationOn, component: this.MapsComponent },
            { path: "/notifications", sidebarName: "Notifications", navbarName: "Notifications", icon: Notifications, component: this.NotificationsPageComponent },
            { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
        ];

        const switchRoutes = (<Switch>
            {
                appRoutes.map((prop,key) => {
                    if(prop.redirect)
                        return (
                            <Redirect from={prop.path} to={prop.to} key={key} {...this.props}/>
                        );
                    return (
                        <Route path={prop.path} component={prop.component} key={key} {...this.props}/>
                    );
                })
            }
            </Switch>);

        const { classes, ...rest } = this.props;

            let renderComponent = (
                <div className={classes.wrapper}>
                <Sidebar
                    routes={appRoutes}
                    logoText={"Orange Fleet"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    {...rest}
                    {...this.props}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        routes={appRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {
                        this.getRoute() ?(
                                <div className={classes.content}>
                                    <div className={classes.container}>
                                        {switchRoutes}
                                    </div>
                                </div>
                            ):(
                                <div className={classes.map}>
                                    {switchRoutes}
                                </div>
                            )
                    }
                    {this.getRoute() ? (<Footer />):(null)}
                </div>
            </div>
            )

            let content = (loginPage)

            if (this.props.loggedIn) {
                content = (renderComponent)
              }
            


        return (
            <div>
                {content}
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

// function mapStateToProps (state) {
//     return {
//       vehicleDetails: state.vehicleDetails
//     }
//   }
  
//   function mapDispatchToProps (dispatch) {
//     return {
//       actions: bindActionCreators(VehicleActions, dispatch)
//     }
//   }

// export default connect(
//     mapDispatchToProps,
//     mapDispatchToProps
// )(
    export default withStyles(appStyle, { withTheme: true })(App);


