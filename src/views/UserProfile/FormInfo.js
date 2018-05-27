'use strict'

import React from 'react'
import {
  Grid
} from 'material-ui';

import {
  ItemGrid
} from 'components';


export default function FormInfo (props) {
  let {edit} = props
  let handleChange = props.handleChange()

  return (
    <div>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='regNumber'
            type='number'
            value={props['regNumber']}
            onChange={handleChange}
            label='Registration Number'
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='model'
            type='text'
            value={props['model']}
            onChange={handleChange}
            label='Model'
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='vehicleCategory'
             type='text'
             value={props['vehicleCategory']}
             onChange={handleChange}
             label='Vehicle Category'
            />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='plateNumber'
            type='number'
            value={props['plateNumber']}
            onChange={handleChange}
            label='Plate Number'
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='engineNumber'
            type='number'
            value={props['engineNumber']}
            onChange={handleChange}
            label='Engine Number'
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <input name='engineSize'
            type='text'
            value={props['engineSize']}
            onChange={handleChange}
            label='Engine Size'
          />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={6}>
        <input name='registrationDate'
           type='date'
           value={props['registrationDate']}
           onChange={handleChange}
           label='Registration Date'
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={6}>
        <input name='expiryDate'
           type='date'
           value={props['expiryDate']}
           onChange={handleChange}
           label='Expiration Date'
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={6}>
        <input name='color'
           type='text'
           value={props['color']}
           onChange={handleChange}
           label='Color'
        />
     </ItemGrid>
    </div>
  )
}
