import React, {PropTypes} from 'react';
import AuthorizationModal from './AuthorizationModal';
import Confirm from '../../../react/common/Confirm';
import {Loader} from 'kbc-react-components';
import EmptyState from '../../components/react/components/ComponentEmptyState';

export default React.createClass({

  propTypes: {
    componentId: PropTypes.string.isRequired,
    credentials: PropTypes.object,
    onResetCredentials: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isResetingCredentials: PropTypes.bool
  },

  getInitialState() {
    return {
      showModal: false
    };
  },

  render() {
    return (
      <div>
        {this.renderAuthorizationModal()}
        <h2> Authorization
        </h2>
        {this.isAuthorized() ? this.renderAuthorizedInfo() : this.renderAuth()}

      </div>
    );
  },

  renderAuth() {
    return (
      <EmptyState>
        <p>No Account authorized</p>
        <button
          onClick={this.showModal}
          className="btn btn-primary">
          Authorize
        </button>
      </EmptyState>
    );
  },

  renderAuthorizedInfo() {
    return (
      <div>
        Account authorized for {this.props.credentials.get('authorizedFor')}
        {!this.props.isResetingCredentials ?  (
           <Confirm
             text="Do you really want to reset the authorized account?"
             title="Reset Authorization"
             buttonLabel="Reset"
             onConfirm={this.props.onResetCredentials}>
             <a
               className="btn btn-link">
               Reset Authorization
             </a>
           </Confirm>
         ) : (
           <Loader/>
         )
        }

      </div>
    );
  },

  renderAuthorizationModal() {
    return (
      <AuthorizationModal
        componentId={this.props.componentId}
        id={this.props.id}
        show={this.state.showModal}
        onHideFn={this.hideModal}
      />
    );
  },

  isAuthorized() {
    const creds = this.props.credentials;
    console.log(creds);
    return  creds && creds.has('id');
  },

  hideModal() {
    this.setState(
      {showModal: false}
    );
  },

  showModal() {
    this.setState(
      {showModal: true}
    );
  }

});
