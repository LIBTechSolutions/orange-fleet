import React from 'react'

export default function FormToolbar (props) {
  let {isNewCase, canSubmit, edit, toggleEdit, confirmClose} = props

  let buttons = edit
    ? (<span>
      <button className='btn btn-danger' type='button' onClick={isNewCase ? confirmClose : toggleEdit}><span className='glyphicon glyphicon-remove' />Cancel</button>
      <button className='btn btn-success' type='submit' disabled={!canSubmit}><span className='glyphicon glyphicon-send' />Submit</button>
    </span>)
    : (<button className='btn btn-primary' type='button' onClick={toggleEdit}><span className='glyphicon glyphicon-edit' />Edit</button>)

  return (
    <div>
      <div className='eidsr-form__actions'>
        {buttons}
      </div>
    </div>
  )
}