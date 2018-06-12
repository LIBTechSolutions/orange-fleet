import React from 'react';
import update from 'immutability-helper'

import FormToolbar from './FormToobar';
import {
    Grid, InputLabel
} from 'material-ui';

import {
    ProfileCard, RegularCard, Button, CustomInput, ItemGrid
} from 'components';

import avatar from 'assets/img/faces/marc.jpg';
import FormInfo from './FormInfo';
import { getVehicles, completeInfo } from 'vehicleDetails'

class Form extends React.Component{
    constructor (props) {
        super(props)

        let vehicleDetail = getVehicles(this.props)
        this.state = {
            canSubmit: false,
            vehicleDetail: vehicleDetail,

          }
        this.submitInfo = this.submitInfo.bind(this)
        this.updateDoc = this.updateDoc.bind(this)
        this.db = this.props.db
      }

      componentWillReceiveProps (nextProps) {
        // If a case in our state is updated by anything other than
        // saving it in the form page, reload it from list of cases
        if (!this.props.edit &&
            (nextProps.updateDoc === nextProps.docId ||
             this.props.docId !== nextProps.docId)) {
          const vehicleDetail = nextProps.docId
            ? this.props.vehicleDetails.find(({_id}) => _id === nextProps.docId)
            : getVehicles(nextProps)

          this.setState({
            vehicleDetail: vehicleDetail
          })
        }
      }

      updateDoc (dependentProps) {
        return (e) => {
          let key = e.target.name
          let value = e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value

          this.setState((prevState, props) => {
            let vehicleDetail = {
              vehicleInfo: {
                [key]: {$set: value}
              }
            }

            if (typeof dependentProps === 'function') {
              let calculatedProps = dependentProps(value)
              for (let prop in calculatedProps) {
                vehicleDetail.vehicleInfo[prop] = {$set: calculatedProps[prop]}
              }
            } else {
              for (let prop in dependentProps) {
                vehicleDetail.vehicleInfo[prop] = {$set: dependentProps[prop](value)}
              }
            }

            return update(prevState, {vehicleDetail, hasChanged: {$set: true}})
          })
          this.props.toggleHasChanged()
        }
      }

      componentDidUpdate (prevProps, prevState) {
        const canSubmit = this.canSubmit()
        if (prevState.canSubmit !== canSubmit) {
          this.setState({canSubmit})
        }
      }

      canSubmit () {
        return this.form
          ? this.props.edit && this.props.hasChanged && this.form.checkValidity()
          : false
      }

      submitInfo (event) {
        event.preventDefault()

        const vehicleDetail = completeInfo(this.state.vehicleDetail)
        this.props.saveInfo(vehicleDetail)
      }

    render(){
      let props = this.props
      let {
        user,
        toggleEdit,
        confirmClose,
        isNewCase,
        edit,
        savedStatusVisible,
        confirmCloseDialogVisible
      } = props

          let {vehicleDetail} = this.state


        return (
            <form action='' onSubmit={this.submitInfo} ref={form => { this.form = form }}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                 cardTitle="Vehicle"
                 cardSubtitle="Add new vehicle"
                 content={
                  <FormInfo
                    edit={edit}
                    handleChange={this.updateDoc}
                    {...vehicleDetail.vehicleInfo}
                  />
                 }
                 footer={
                  <FormToolbar
                  isNewCase={isNewCase}
                  canSubmit={this.state.canSubmit}
                  edit={edit}
                  toggleEdit={toggleEdit}
                  confirmClose={confirmClose}
                  {...vehicleDetail.vehicleInfo} />
                }
                />
              </ItemGrid>
            </Grid>
            </form>
        );
    }
}

export default Form;
