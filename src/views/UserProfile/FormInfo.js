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
                <InputLabel>Registration Number</InputLabel>
                <Input name='regNumber'
                  type='number'
                  value={props['regNumber']}
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
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Vehicle Category</InputLabel>
              <Input name='vehicleCategory'
                type='text'
                value={props['vehicleCategory']}
                onChange={handleChange}
                />
                </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Plate Number</InputLabel>
              <Input name='plateNumber'
                type='number'
                value={props['plateNumber']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Engine Number</InputLabel>
              <Input name='engineNumber'
                type='number'
                value={props['engineNumber']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Engine Size</InputLabel>
              <Input name='engineSize'
                type='text'
                value={props['engineSize']}
                onChange={handleChange}
              />
              </FormControl>
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
              <InputLabel>Registration Date</InputLabel>
            <Input name='registrationDate'
              type='date'
              value={props['registrationDate']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
            <InputLabel>Expiration Date</InputLabel>
            <Input name='expiryDate'
              type='date'
              value={props['expiryDate']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
        </Grid>
        <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
        <FormControl>
          <InputLabel>Color</InputLabel>
          <Input name='color'
            type='text'
            value={props['color']}
            onChange={handleChange}
          />
          </FormControl>
      </ItemGrid>
      </Grid>
      </div>
    )
  }
}
