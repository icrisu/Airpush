import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import AttachementIcon from 'material-ui/svg-icons/editor/attach-file';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ShareScreenIcon from 'material-ui/svg-icons/communication/screen-share';
import VideoCallIcon from 'material-ui/svg-icons/notification/ondemand-video';
import AudioCallIcon from 'material-ui/svg-icons/image/audiotrack';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onKeyUp(e) {
        console.log(e.target, e.key, e.keyCode);
    }
    renderChatActions() {

    }

    render() {
        return(
            <div className="section-content-ui chat-section">
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
            </div>                
        )
    }
}

export default ChatRoom;
