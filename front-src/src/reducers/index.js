import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import MenuReducer from './MenuReducer';
import RoomReducer from './RoomReducer';
import NotificationReducer from './NotificationReducer';
import RoomCreated from './RoomCreated';
import Users from './Users';
import Messages from './Messages';
import JoinedRoomId from './JoinedRoomId';
import MediaSources from './MediaSources';
import ChatOpenState from './ChatOpenState';
import FullScreen from './FullScreen';
import InfoAlertReducer from './InfoAlertReducer';
import MediaSettings from './MediaSettings';

const rootReducers = combineReducers({
    authenticated: AuthReducer,
    menuOpen: MenuReducer,
    roomId: RoomReducer,
    notification: NotificationReducer,
    roomJustCreated: RoomCreated,
    users: Users,
    messages: Messages,
    joinedRoomId: JoinedRoomId,
    mediaSources: MediaSources,
    chatOpenState : ChatOpenState,
    fullScreen: FullScreen,
    infoAlertData: InfoAlertReducer,
    mediaSettings: MediaSettings,
    turn_a: () => {return {}}
});

export default rootReducers;

