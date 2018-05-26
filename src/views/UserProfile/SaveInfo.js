import React from 'react'

export default function SaveInfo (props) {
  return (
    <div>
      <div>
        <button className='button red' onClick={props.createInfo}><i className='icon-add' />Add new vehicle</button>
      </div>
    </div>
  )
}