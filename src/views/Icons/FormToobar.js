import React from 'react'
import {
  Button
} from 'components';

export default function FormToolbar (props) {
  let {isNewCase, canSubmit, edit, toggleEdit, confirmClose} = props

  let buttons = edit
    ? (<span>
      <Button color='danger' type='button' onClick={isNewCase ? confirmClose : toggleEdit}><span className='glyphicon glyphicon-remove' />Cancel</Button>
      <Button color='primary' type='submit' disabled={!canSubmit}><span className='glyphicon glyphicon-send' />Submit</Button>
    </span>)
    : (<Button color='primary' type='button' onClick={toggleEdit}><span className='glyphicon glyphicon-edit' />Edit</Button>)

  return (
    <div>
      <div className='eidsr-form__actions'>
        {buttons}
      </div>
    </div>
  )
}