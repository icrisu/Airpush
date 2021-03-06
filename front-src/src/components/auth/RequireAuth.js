import React, { Component } from 'React';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MainMenu from '../menu/MainMenu';
import { ROUTES } from '../../config';
import AppSectionUI from '../AppSectionUI';
import TopBar from '../menu/TopBar';
import _ from 'lodash';


export default (WrappedComponent) => {

    class RequireAuth extends Component {
        
        static defaultProps = {
            authenticated: false
        }

        constructor(props) {
            super(props);    
        }

        render() {
            if ((this.props.authenticated === false || _.isNil(this.props.authenticated)) && !this.props.location.pathname.startsWith(`${ROUTES.SIGN_IN}`)) {
                return(
                    <Redirect to={{ pathname: `${ROUTES.SIGN_IN}${ this.props.location.search }` }} />
                )
            }
			if (this.props.authenticated && this.props.location.pathname.startsWith(`${ROUTES.SIGN_IN}`)) {
				return(
					<Redirect to={{ pathname: `${ROUTES.CHAT_ROOM}` }}/>
				);
            }     
            return(
                <div className="airpush-main">
                    <TopBar />
                    <AppSectionUI>
                        <WrappedComponent />
                    </AppSectionUI>
                </div>
            )
        }
    }

    RequireAuth.propTypes = {
        authenticated: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object
        ]),
    }

    const mapStateToProps = ({ authenticated }, ownProps) => {
        return {
            authenticated
        }
    }

    return connect(mapStateToProps)(RequireAuth);
}
