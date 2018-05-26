import React from 'react';
import FormToolbar from './FormToobar';
import {
    Grid, InputLabel,
} from 'material-ui';

import {
    ProfileCard, RegularCard, Button, CustomInput, ItemGrid
} from 'components';

import avatar from 'assets/img/faces/marc.jpg';
import FormInfo from './FormInfo';
import {completeInfo} from 'vehicleDetails'

class Form extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            canSubmit: false
      
          }
        this.submitInfo = this.submitInfo.bind(this)
        this.db = this.props.db
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
    
        let vehicleDetail = Object.assign({}, this.props.doc)
        completeInfo(vehicleDetail)
        this.props.saveInfo(vehicleDetail)
      }

    render(){
        let props = this.props;
        let {
            doc,
            updateDoc,
            toggleEdit,
            confirmClose,
            isNewCase,
            edit
          } = props
      

        return (
            <div>
            <form action='' onSubmit={this.submitInfo} ref={form => { this.form = form }}>
            <FormInfo
              handleChange={updateDoc}
              edit={edit}
              {...doc.vehicleInfo}
            />
            <FormToolbar
                isNewCase={isNewCase}
                canSubmit={this.state.canSubmit}
                edit={edit}
                toggleEdit={toggleEdit}
                confirmClose={confirmClose}
                {...doc.vehicleInfo} />
            </form>          
            </div>
        );
    }
}

export default Form;
