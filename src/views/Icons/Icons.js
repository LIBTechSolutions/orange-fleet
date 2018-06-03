import React from 'react'
import PropTypes from 'prop-types';
import Form from './Form'
import SaveInfo from './SaveInfo'
import TablePage from '../BookList/TablePage'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
 Modal, withStyles, Typography
} from 'material-ui';

import * as CaseActions from 'actions/cases'

class UserProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      docId: null,
      edit: false,
      savedStatusVisible: false,
      open: false
    }

    this.viewDoc = this.viewDoc.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.createInfo = this.createInfo.bind(this)
    this.confirmClose = this.confirmClose.bind(this)
    this.cancelClose = this.cancelClose.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.saveInfo = this.saveInfo.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.toggleHasChanged = this.toggleHasChanged.bind(this)
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  viewDoc (docId) {
    return (e) => {
      this.setState({
        docId,
        isNewCase: false,
        edit: false,
        hasChanged: false,
        savedStatusVisible: false,
        open: true
      })
    }
  }

  toggleEdit () {
    this.setState((prevState, props) => {
      return {edit: !prevState.edit}
    })
  }

  toggleHasChanged () {
    this.setState({hasChanged: true})
  }

  confirmClose (e) {
    if (this.state.hasChanged) {
      e.preventDefault()
      this.setState({confirmCloseDialogVisible: true})
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
      docId: null,
      hasChanged: false,
      confirmCloseDialogVisible: false,
      open: false
    })
  }

  createInfo (e) {
    e.preventDefault()
    this.setState({
      docId: null,
      isNewCase: true,
      hasChanged: false,
      edit: true,
      savedStatusVisible: false,
      open: true
    })
  }

  saveInfo (studentDetail) {
    let action = this.state.isNewCase
      ? this.props.actions.insertCase
      : this.props.actions.updateCase

    action(studentDetail, true)

    this.setState({
      docId: studentDetail._id,
      hasChanged: false,
      savedStatusVisible: true,
      edit: false
    })
  }

  
  render () {

    const { classes } = this.props;

    return (
        <div>
          <SaveInfo
            createInfo={this.createInfo}
            {...this.props} />

          <TablePage
            viewDoc={this.viewDoc}
            createInfo={this.createInfo}
            selectedInfo={this.state.docId}
            {...this.props}/>
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
          <div style={getModalStyle()} className={classes.paper}>
            
            <Form
              toggleEdit={this.toggleEdit}
              confirmClose={this.confirmClose}
              cancelClose={this.cancelClose}
              closeForm={this.closeForm}
              createInfo={this.createInfo}
              saveInfo={this.saveInfo}
              toggleHasChanged={this.toggleHasChanged}
              {...this.state}
              {...this.props} />
              
            </div>
            </Modal>
          </div>
    )
  }
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
