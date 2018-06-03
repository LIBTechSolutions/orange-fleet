import React from 'react';
import {
    Grid, withStyles, Table, TableBody, TableHead, TableRow, TableCell, Paper
} from 'material-ui';

import {
    RegularCard, ItemGrid, Button
} from 'components';

class TableList extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          startIndex: 0
        }
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
      }
    
      getEndIndex () {
        return this.state.startIndex + this.props.limit
      }
    
      nextPage () {
        this.setState((prevState, props) => {
          return {startIndex: Math.min(props.docs.length - 1, prevState.startIndex + props.limit)}
        })
      }
    
      previousPage () {
        this.setState((prevState, props) => {
          return {startIndex: Math.max(0, prevState.startIndex - props.limit)}
        })
      }
    
      hasPreviousPage () {
        return this.state.startIndex > 0
      }
    
      hasNextPage () {
        return this.state.startIndex + this.props.limit < this.props.docs.length
      }

    render(){

        const docs = this.props.limit
        ? this.props.docs.slice(this.state.startIndex, this.getEndIndex())
        : this.props.docs
          const pagination = this.props.limit
            ? (
                <div>
                    <Button color='primary' type='button' onClick={this.previousPage} disabled={!this.hasPreviousPage()}>Previous</Button>
                    <Button className='btn' type='button' onClick={this.nextPage} disabled={!this.hasNextPage()}>Next</Button>
                </div>
            )
           : null

        let props = this.props;
        let { viewDoc, classes } = props;

        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Vehicle Details"
                        cardSubtitle="Details of vehicles"
                        content={
                            <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                    <CustomTableCell>vehicle ID</CustomTableCell>
                                    <CustomTableCell>Registration Number</CustomTableCell>
                                    <CustomTableCell numeric>Model</CustomTableCell>
                                    <CustomTableCell numeric>Vehicle Category</CustomTableCell>
                                    <CustomTableCell numeric>Expiry Date</CustomTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {docs.map((vehicleDetail) => <DataRow key={vehicleDetail._id} vehicleDetail={vehicleDetail} {...props} />)}
                                </TableBody>
                            </Table>
                            </Paper>
                        }
                        footer={pagination}
                    />
                </ItemGrid>
            </Grid>
        );
    }
}

function DataRow (props) {
    let {vehicleDetail, viewDoc, selectedInfo, classes} = props
    
    return (
        <TableRow className={classes.row} onClick={viewDoc(vehicleDetail._id)}>
        <CustomTableCell component="th" scope="row">
          {vehicleDetail.vehicleInfo.vehicleID}
        </CustomTableCell>
        <CustomTableCell component="th" scope="row">
          {vehicleDetail.vehicleInfo.regNumber}
        </CustomTableCell>
        <CustomTableCell numeric>{vehicleDetail.vehicleInfo.model}</CustomTableCell>
        <CustomTableCell numeric>{vehicleDetail.vehicleInfo.vehicleCategory}</CustomTableCell>
        <CustomTableCell numeric>{vehicleDetail.vehicleInfo.expiryDate}</CustomTableCell>
      </TableRow>
    )
  }


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

  export default withStyles(styles)(TableList);


