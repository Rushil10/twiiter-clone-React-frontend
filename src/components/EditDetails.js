import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Tooltip, Typography, withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.spreadThis,
    button:{
        float:'right'
    }
})

class EditDetails extends Component {
    state={
        bio:'',
        website:'',
        location:'',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio:credentials.bio ? credentials.bio:'',
            website:credentials.website ? credentials.website:'',
            location:credentials.location ? credentials.location:''
        })
    }
    
    handleOpen = () => {
        this.setState({open:true})
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({open:false})
    }

    componentDidMount(){
        const {credentials}=this.props
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio:this.state.bio,
            website:this.state.website,
            location:this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose()
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                    <form>
                        <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="A short bio about yourself"
                        className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth />
                        <TextField name="website" type="text" label="Website" placeholder="Your personal/professional website"
                        className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth />
                        <TextField name="location" type="text" label="Location" placeholder="Where You Live"
                        className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth />
                    </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials:state.user.credentials
})

export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails))
