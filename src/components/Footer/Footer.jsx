import React from 'react';
import PropTypes from 'prop-types';
import {
    List, ListItem, withStyles
} from 'material-ui';

import { footerStyle } from 'variables/styles';

class Footer extends React.Component{
    render(){
        const { classes } = this.props;
        return (
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.left}>
                        <List className={classes.list}>
                            <ListItem className={classes.inlineBlock}>
                                <h3 href="#home" className={classes.block}>Developed by Techsol Inc</h3>
                            </ListItem>
                        </List>
                    </div>
                    <p className={classes.right}>
                        <span>
                            &copy; {1900 + (new Date()).getYear()} <a href="http://www.orange.com.lr" className={classes.a}>Orange Liberia</a>, fleet management
                        </span>
                    </p>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
