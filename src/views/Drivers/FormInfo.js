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
                <InputLabel>Employee ID</InputLabel>
                <Input name='employeeID'
                  type='text'
                  value={props['employeeID']}
                  onChange={handleChange}
                />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Name</InputLabel>
              <Input name='name'
                type='text'
                value={props['name']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Title</InputLabel>
              <Input name='title'
                type='text'
                value={props['title']}
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
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Starting Place</InputLabel>
              <Input name='startPlace'
                type='text'
                value={props['startPlace']}
                onChange={handleChange}
              />
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel>Destination</InputLabel>
              <Input name='destination'
                type='text'
                value={props['destination']}
                onChange={handleChange}
              />
              </FormControl>
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
              <InputLabel>Purpose</InputLabel>
            <Input name='purpose'
              type='text'
              value={props['purpose']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
          <FormControl>
            <InputLabel>Date</InputLabel>
            <Input name='bookingDate'
              type='date'
              value={props['bookingDate']}
              onChange={handleChange}
            />
            </FormControl>
          </ItemGrid>
        </Grid>
        <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
        <FormControl>
          <InputLabel>Time Out</InputLabel>
          <Input name='timeout'
            type='time'
            value={props['timeout']}
            onChange={handleChange}
          />
          </FormControl>
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={6}>
        <FormControl>
          <InputLabel>Time in</InputLabel>
          <Input name='timein'
            type='time'
            value={props['timein']}
            onChange={handleChange}
          />
          </FormControl>
      </ItemGrid>
      </Grid>
      </div>
    )
  }
}
