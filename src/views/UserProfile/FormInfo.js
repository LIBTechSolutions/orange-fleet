'use strict'

import React from 'react'
import {
  Grid, Input, FormControl, InputLabel
} from 'material-ui';

import {
  ItemGrid
} from 'components';


export default class FormInfo extends React.Component {


  render() {
    let props = this.props
    let {edit} = props
    let handleChange = props.handleChange()

    return (
      <div disabled={!edit}>
          <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
            <InputLabel>Vehicles Type</InputLabel>
            <Input name='vehicleType'
              type='text'
              value={props['vehicleType']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
            <InputLabel>Make</InputLabel>
            <Input name='make'
              type='text'
              value={props['make']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
            <InputLabel>Model</InputLabel>
            <Input name='model'
              type='text'
              value={props['model']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Engine Number</InputLabel>
              <Input name='engineNumber'
                type='text'
                value={props['engineNumber']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Plate Number</InputLabel>
              <Input name='plateNumber'
                type='text'
                value={props['plateNumber']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
                <InputLabel>Reg Start Date</InputLabel>
              <Input name='registrationDate'
                type='date'
                value={props['registrationDate']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
                <InputLabel>Reg End Date</InputLabel>
              <Input name='expiryDate'
                type='date'
                value={props['expiryDate']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Department</InputLabel>
              <Input name='department'
                type='text'
                value={props['department']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>GPS Tracking</InputLabel>
              <Input name='tracking'
                type='text'
                value={props['tracking']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
          </Grid>
      </div>
    )
  }
}
