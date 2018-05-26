'use strict'

import React from 'react'
import classnames from 'classnames'

/**
 * Render an input with label
 * */
export default function Input (props) {
  const classes = classnames('input', props.className, {required: props.required})
  const value = ('value' in props)
    ? props.value
    : props.getValue(props.name)
  const label = ('label' in props)
    ? props.label
    : props.getLabel(props.name)

  return (
    <div className={classes}>
      <label>{label}</label>
      <input type={props.type || 'text'}
        value={value}
        {...getInputProps(props)}
      />
    </div>
  )
}

/**
 * Return any properties that are input attributes
 * */
function getInputProps (props) {
  const propNames = [
    'name', 'placeholder', 'min', 'max', 'pattern', 'onChange',
    'required', 'readOnly', 'disabled'
  ]

  return propNames.reduce((inputProps, prop) => {
    if (prop in props) inputProps[prop] = props[prop]
    return inputProps
  }, {})
}
