import React, {PropTypes} from 'react';
import _ from 'underscore';
import Select from 'react-select';
import {fromJS} from 'immutable';
import RoutesStore from '../../../../../stores/RoutesStore';


export default React.createClass({
  propTypes: {
    transformation: PropTypes.object.isRequired,
    transformations: PropTypes.object.isRequired,
    requires: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onEditChange: PropTypes.func.isRequired,
    bucketId: PropTypes.string.isRequired
  },

  onValueClick: function(value) {
    const props = this.props;
    return RoutesStore.getRouter().transitionTo('transformationDetail', {
      config: props.bucketId,
      row: value.value
    });
  },

  render() {
    return (
      <div>
        <h2 style={{lineHeight: '32px'}}>
          Requires
        </h2>
        <div className="form-group">
          <Select
            name="packages"
            value={this.props.requires.toArray()}
            options={this.getSelectOptions(this.props.transformations, this.props.transformation)}
            multi={true}
            disabled={this.props.isSaving}
            onChange={this.handleValueChange}
            placeholder="Add required transformation..."
            isLoading={this.props.isSaving}
            noResultsText="No transformations found"
            onValueClick={this.onValueClick}
            />
          <span className="help-block">
            These transformations are processed before this transformation starts.
          </span>
        </div>
      </div>
    );
  },

  getSelectOptions: function(transformations, currentTransformation) {
    return _.sortBy(_.map(_.filter(transformations.toArray(), function(transformation) {
      return parseInt(transformation.get('phase'), 10) === parseInt(currentTransformation.get('phase'), 10) && transformation.get('backend') === currentTransformation.get('backend') && transformation.get('id') !== currentTransformation.get('id');
    }), function(transformation) {
      return {
        label: transformation.get('name'),
        value: transformation.get('id')
      };
    }), function(option) {
      return option.label.toLowerCase();
    });
  },

  handleValueChange(newArray) {
    const values = fromJS(newArray).map((item) => item.get('value'));
    this.props.onEditChange(values);
  }

});
