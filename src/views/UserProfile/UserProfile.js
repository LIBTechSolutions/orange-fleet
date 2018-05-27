import React from 'react'
import update from 'immutability-helper'
import Form from './Form'
import SaveInfo from './SaveInfo'
import {getVehicles} from 'vehicleDetails'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as CaseActions from 'actions/cases'

class UserProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      doc: getVehicles(this.props),
      edit: false,
      savedStatusVisible: false,
      confirmCloseDialogVisible: false,
      registration: false
    }

    // this.viewDoc = this.viewDoc.bind(this)
    this.updateDoc = this.updateDoc.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.createInfo = this.createInfo.bind(this)
    this.confirmClose = this.confirmClose.bind(this)
    this.cancelClose = this.cancelClose.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.saveInfo = this.saveInfo.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.setState({
      registration: false
    })
  }

  viewDoc (doc) {
    return (e) => {
      this.setState({
        doc,
        isNewCase: false,
        edit: false,
        hasChanged: false,
        savedStatusVisible: false
      })
    }
  }

  toggleEdit () {
    this.setState((prevState, props) => {
      return {edit: !prevState.edit}
    })
  }

  confirmClose (e) {
    if (this.state.hasChanged) {
      e.preventDefault()
      this.setState({
        confirmCloseDialogVisible: true
      })
    } else {
      return this.closeForm(e)
    }
  }

  cancelClose (e) {
    e.preventDefault()

    this.setState({
      confirmCloseDialogVisible: false
    })
  }

  closeForm (e) {
    e.preventDefault()
    this.setState({
      doc: getVehicles(this.props),
      hasChanged: false,
      confirmCloseDialogVisible: false,
      registration: false
    })
  }

  createInfo () {
    this.setState({
      doc: getVehicles(this.props),
      isNewCase: true,
      hasChanged: false,
      edit: true,
      savedStatusVisible: false,
      registration: true
    })
  }

  saveInfo (doc) {
    let action = this.state.isNewCase
      ? this.props.actions.insertCase
      : this.props.actions.updateCase

    action(doc)

    this.setState({
      doc,
      hasChanged: false,
      // savedStatusVisible: true,
      edit: false,
      registration: false
    })
  }

  updateDoc (dependentProps) {
    return (e) => {
      let key = e.target.name
      let value = e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value

      this.setState((prevState, props) => {
        let doc = {
          vehicleInfo: {
            [key]: {$set: value}
          }
        }

        if (typeof dependentProps === 'function') {
          let calculatedProps = dependentProps(value)
          for (let prop in calculatedProps) {
            doc.vehicleInfo[prop] = {$set: calculatedProps[prop]}
          }
        } else {
          for (let prop in dependentProps) {
            doc.vehicleInfo[prop] = {$set: dependentProps[prop](value)}
          }
        }

        return update(prevState, {doc, hasChanged: {$set: true}})
      })
    }
  }

  render () {
    return (
      <div id='dashboard'>
        <SaveInfo
          createInfo={this.createInfo}
          selectedInfo={this.state.doc}
          {...this.props} />
        {this.state.registration
        ? <div>
          <Form
            updateDoc={this.updateDoc}
            toggleEdit={this.toggleEdit}
            confirmClose={this.confirmClose}
            cancelClose={this.cancelClose}
            closeForm={this.closeForm}
            createInfo={this.createInfo}
            saveInfo={this.saveInfo}
            isNewCase={this.state.isNewCase}
            hasChanged={this.state.hasChanged}
            {...this.state}
            {...this.props} />
        </div> : null }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    updatedCase: state.caseData.updated,
    idsrCases: state.caseData.idsrCases,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(CaseActions, dispatch)
  }
}

export default connect(
  mapDispatchToProps,
  mapDispatchToProps
)(UserProfile);
