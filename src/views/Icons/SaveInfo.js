import React from 'react'
import {
  Button
} from 'components';

export default function SaveInfo (props) {
  return (
    <div>
      <div>
        <Button color="primary" onClick={props.createInfo} round><i className='icon-add' />Book Vehicle</Button>
      </div>
    </div>
  )
}