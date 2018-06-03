import React from 'react';
import {
    withStyles, Grid
} from 'material-ui';
import {
    AirportShuttle, FlightTakeoff, DirectionsCar, Warning, DateRange,  
    LocalOffer, Update, ArrowUpward, AccessTime, 
    Accessibility, LocalTaxi, LocalGasStation
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid
} from 'components';

import {
    dailySalesChart ,
    emailsSubscriptionChart,
    completedTasksChart
} from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

class Dashboard extends React.Component{
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render(){
        const complete = this.props.idsrCases.filter(vehicleDetail => !!vehicleDetail.vehicleInfo && !!vehicleDetail.complete && !vehicleDetail.vehicleInfo.employeeID)
        const completeRequest = this.props.idsrCases.filter(vehicleDetail => !!vehicleDetail.vehicleInfo && !!vehicleDetail.complete && !vehicleDetail.vehicleInfo.regNumber)
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={AirportShuttle}
                            iconColor="orange"
                            title="Total Vehicles"
                            description={complete.length}
                            statIcon={LocalTaxi}
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={FlightTakeoff}
                            iconColor="green"
                            title="Trip Requests"
                            description={completeRequest.length}
                            statIcon={LocalTaxi}
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={DirectionsCar}
                            iconColor="red"
                            title="Vehicles Out"
                            description={completeRequest.length}
                            statIcon={LocalTaxi}
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={LocalGasStation}
                            iconColor="blue"
                            title="Fuel Requests"
                            description="fuel"
                            statIcon={LocalTaxi}
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={
                                        dailySalesChart.animation
                                    }
                                />
                            }
                            chartColor="green"
                            title="Daily Requests"
                            text={
                                <span>
                                    <span className={this.props.classes.successText}><ArrowUpward className={this.props.classes.upArrowCardCategory}/> 55%</span> increase in request.
                                </span>
                            }
                            statIcon={LocalTaxi}
                        />
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
