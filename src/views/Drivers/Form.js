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
import { getDrivers, completeInfo } from 'driverDetails'

class Form extends React.Component{
    constructor (props) {
        super(props)

        let driverDetail = getDriver(this.props)
        this.state = {
            canSubmit: false,
            driverDetail: driverDetail,

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
          const driverDetail = nextProps.docId
            ? this.props.driverDetails.find(({_id}) => _id === nextProps.docId)
            : getDrivers(nextProps)

          this.setState({
            driverDetail: driverDetail
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
            let driverDetail = {
              driverInfo: {
                [key]: {$set: value}
              }
            }

            if (typeof dependentProps === 'function') {
              let calculatedProps = dependentProps(value)
              for (let prop in calculatedProps) {
                driverDetail.driverInfo[prop] = {$set: calculatedProps[prop]}
              }
            } else {
              for (let prop in dependentProps) {
                driverDetail.driverInfo[prop] = {$set: dependentProps[prop](value)}
              }
            }

            return update(prevState, {driverDetail, hasChanged: {$set: true}})
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

        const driverDetail = completeInfo(this.state.driverDetail)
        this.props.saveInfo(driverDetail)
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

          let {driverDetail} = this.state


        return (
            <form action='' onSubmit={this.submitInfo} ref={form => { this.form = form }}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                 cardTitle="Driver"
                 cardSubtitle="Add new driver"
                 content={
                  <FormInfo
                    edit={edit}
                    handleChange={this.updateDoc}
                    {...driverDetail.driverInfo}
                  />
                 }
                 footer={
                  <FormToolbar
                  isNewCase={isNewCase}
                  canSubmit={this.state.canSubmit}
                  edit={edit}
                  toggleEdit={toggleEdit}
                  confirmClose={confirmClose}
                  {...driverDetail.driverInfo} />
                }
                />
              </ItemGrid>
            </Grid>
            </form>
        );
    }
}

export default Form;
