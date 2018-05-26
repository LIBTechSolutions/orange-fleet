'use strict'

import React from 'react'

export default function FormInfo (props) {
  let {edit} = props
  let handleChange = props.handleChange()

  return (
    <fieldset >
      <legend>Vehicle Details</legend>
      <div className='form-row'>
        <input name='regNumber'
          type='number'
          value={props['regNumber']}
          onChange={handleChange}
          label='Registration Number'
        />
        <input name='model'
           type='text'
           value={props['model']}
           onChange={handleChange}
           label='Model'
        />
        <div className='hidden'>
          <input name='vehicleCategory'
             type='text'
             value={props['vehicleCategory']}
             onChange={handleChange}
             label='Vehicle Category'
        />
        </div>
        <input name='plateNumber'
           type='number'
           value={props['plateNumber']}
           onChange={handleChange}
           label='Plate Number'
        />
      </div>
      <div className='form-row grid3'>
        <input name='engineNumber'
           type='number'
           value={props['engineNumber']}
           onChange={handleChange}
           label='Engine Number'
        />
        <input name='engineSize'
           type='text'
           value={props['engineSize']}
           onChange={handleChange}
           label='Engine Size'
        />
      </div>
      <div className='form-row grid3'>
        <input name='registrationDate'
           type='date'
           value={props['registrationDate']}
           onChange={handleChange}
           label='Registration Date'
        />
      </div>
      <div className='form-row grid3'>
        <input name='expiryDate'
           type='date'
           value={props['expiryDate']}
           onChange={handleChange}
           label='Expiration Date'
        />
      </div>
      <div className='form-row grid3'>
        <input name='color'
           type='text'
           value={props['color']}
           onChange={handleChange}
           label='Color'
        />
      </div>
    </fieldset>
  )
}
