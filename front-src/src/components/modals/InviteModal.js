import React from 'react';
import BaseAlert from './BaseAlert';
import FlatButton from 'material-ui/FlatButton';

class InviteModal extends BaseAlert {
    open(nodes) {
        super.open(nodes);
    }
    _getActions() {
        let actions = [];
        if (this.props.onAccept) {
            actions.push(<FlatButton label="OK" primary={true} onClick={() => super.handleAccept()}/>)
        }
        if (this.props.onCancel && !this.props.hideCancelButton) {
            actions.push(<FlatButton label="Cancel" primary={false} onClick={() => super.handleClose()}/>)
        }        
        return actions;
    }    
    render() {
        return super.render();
    }
}

export default InviteModal;
