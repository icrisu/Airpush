import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import safe from 'undefsafe';
import { ROUTES } from '../../config';

import IconButton from 'material-ui/IconButton';
import CreateRoom from './CreateRoom';
import JoiningRoom from './JoiningRoom';
import MainChatRoom from './MainChatRoom';
import ChatMainView from './main-view/ChatMainView';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = { isJoiningRoom: false };
    }

    static defaultProps = {
        roomId: false, joinedRoomId: false
    }

    _renderChatRoomBackground() {
        return (this.props.roomId) ? ' chat-room-background' : '';
    }

    _render() {
        const isRoute_id = !_.isNil(safe(this.props, 'match.params.route_id'));
        if (this.props.roomId && isRoute_id && this.props.match.params.route_id != this.props.roomId) {
            return <Redirect to={{
                pathname: `${ROUTES.CHAT_ROOM}/${this.props.roomId}`
            }} /> 
        }
        if (this.props.location.pathname == ROUTES.CHAT_ROOM && this.props.roomId) {
            return <Redirect to={{
                pathname: `${ROUTES.CHAT_ROOM}/${this.props.roomId}`
            }} />              
        }
        if (this.props.roomId) {
            return(
                <div className="main-view">
                    <ChatMainView />
                    <MainChatRoom />
                </div>
            )
        } else {
            return <CreateRoom />;
        }        
    }

    render() {
        return(
            <div className={ `section-content-ui chat-section${this._renderChatRoomBackground()}` }>
                { this._render() }
            </div>
        )
    }
}

const mapStateToProps = ({ roomId, joinedRoomId }, ownProps) => {
    return {
        roomId, joinedRoomId
    }
}

ChatRoom.propTypes = {
    roomId: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    joinedRoomId: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]) 
}

export default connect(mapStateToProps)(ChatRoom);
