import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import AttachementIcon from 'material-ui/svg-icons/editor/attach-file';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ShareScreenIcon from 'material-ui/svg-icons/communication/screen-share';
import VideoCallIcon from 'material-ui/svg-icons/notification/ondemand-video';
import AudioCallIcon from 'material-ui/svg-icons/image/audiotrack';

import CreateRoom from './CreateRoom';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    static defaultProps = {
        chatRoom: false
    }

    onKeyUp(e) {
        console.log(e.target, e.key, e.keyCode);
    }

    _renderChatRoomBackground() {
        return (this.props.chatRoom) ? ' chat-room-background' : '';
    }

    _renderChatRoomBottomActions() {
        return(
            <div className="bottom-chat-bar">
                <div className="chat-main-control pull-left">
                <IconMenu style={{ marginTop: '-6px' }} tooltip="Attach file"
                    iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem primaryText="Screen share" leftIcon={ <ShareScreenIcon /> } />
                    <MenuItem primaryText="Video call" leftIcon={ <VideoCallIcon /> } />
                    <MenuItem primaryText="Audio call" leftIcon={ <AudioCallIcon /> } />
                </IconMenu>                  
                </div>                
                <input className="chat-room-input pull-left" onKeyUp={ this.onKeyUp } type="text" />
                <div className="chat-main-control pull-left">
                    <IconButton tooltip="Attach file" style={{ marginTop: '-6px' }} tooltipPosition="top-center" 
                        onClick={ e => console.log('send file') }>
                            <AttachementIcon />
                    </IconButton>                    
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }

    _render() {
        if (this.props.chatRoom) {
            return this._renderChatRoomBottomActions();
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

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

ChatRoom.propTypes = {
    chatRoom: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),    
}

export default ChatRoom;
