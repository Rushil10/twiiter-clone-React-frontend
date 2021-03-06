import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import { connect } from 'react-redux';
import {submitComment} from '../redux/actions/dataActions'
import { Button, Grid, TextField, withStyles } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator:{
        border:'none',
        margin:4,
    },
    visibleSeparator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom:20
    },
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    expandButton: {
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop:50,
        marginBottom:50
    }
})

class CommentForm extends Component {
    state={
        body:'',
        errors:{}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({errors : nextProps.UI.errors});
        }

        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''})
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screenId,{body:this.state.body})
    }
    render() {
        const{classes,authenticated} = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on Screen"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null

        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screenId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI:state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm))
