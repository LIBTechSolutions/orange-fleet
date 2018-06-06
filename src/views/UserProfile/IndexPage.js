import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { 
  withStyles, IconButton, Input, FormControl, AppBar, Typography,
  InputLabel, InputAdornment, TextField, Toolbar
} from 'material-ui';

import { Visibility, VisibilityOff } from 'material-ui-icons';
import {
  Button
} from 'components';

import logo from 'assets/img/Logo-Orange2.PNG';


class IndexPage extends React.Component {
  state = {
    password: '',
    showPassword: false
  };

  authenticate = (event) => {
    event.preventDefault()
    let elements = event.target.elements
    let username = elements.namedItem('email').value
    let password = elements.namedItem('password').value

    this.setState({loginAlertDeactivated: false})

    this.props.checkLogin(username, password)
  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    let {loginErrorVisible} = this.props
    let emailChangeHandlers = {}
    let loginAlert = ''

    if (loginErrorVisible) {
      let alertClasses = classNames('login-alert', 'alert-danger', {
        active: !this.state.loginAlertDeactivated
      })
      loginAlert = <span className={alertClasses}>Invalid Credentials, Please Try Again...</span>
      emailChangeHandlers.onChange = () => {
        this.setState({loginAlertDeactivated: true})
      }
    }

    return (
      <div className={classes.root} >
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
           
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            OLIB Fleet Management System
          </Typography>
          <img style={{ height: 50, width: 50 }}src={logo} alt="logo" className={classes.img}/>
        </Toolbar>
      </AppBar>
      <form action='' onSubmit={this.authenticate} style={indexStyles.loginStyle}>
      <div className='logo'>
            <h1>OLIB Fleet Management System</h1>
          </div>
          <div className='login'>
            {this.props.busy &&
              <i className="fas fa-circle-notch fa-spin fa-5x" style={{ position: 'relative' }}></i>
            }
      </div>
      <FormControl className={classNames(classes.margin)}>
        {loginErrorVisible && loginAlert}
          <InputLabel >Email</InputLabel>
          <Input
          {...emailChangeHandlers}
            name='email'
            required
            type='text'
            required
            autoFocus
            disabled={this.props.busy}
          />
        </FormControl> <br/>
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            name='password'
            required
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            disabled={this.props.busy}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl><br/>
        <Button color='primary' type='submit' disabled={this.props.busy}>Login</Button>
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const indexStyles = {
  style: {
    margin: 15
  },
  loginStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
 
 };


IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexPage);
