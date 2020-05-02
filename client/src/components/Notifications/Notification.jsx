import React, { Component } from 'react';
import {connect} from 'react-redux';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'


class Notification extends Component {

    createNotifiacion = (message, type, title, duration) =>{
        store.addNotification({
            title,
            message,
            type,                        // 'default', 'success', 'info', 'warning'
            container: 'top-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration
            },

        })
    }

    componentDidUpdate(prevProps){
        const {note} = this.props;
        if(note !== prevProps.note){

            this.createNotifiacion(note.msg, note.type, '', note.time);
        }
    }

    render() {
        return (
            <div/>
        );
    }
}

const mapStateToProps = state =>({
    note : state.notifications.note
})

export default connect(mapStateToProps)(Notification);