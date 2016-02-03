import React, {PropTypes} from 'react';
import {DragDropMixin} from 'react-dnd';
import _ from 'underscore';

export default React.createClass({
  mixins: [DragDropMixin],
  propTypes: {
    toggleHide: PropTypes.func.isRequired,
    phase: PropTypes.object.isRequired,
    onPhaseMove: PropTypes.func.isRequired,
    onBeginDrag: PropTypes.func.isRequired,
    onEndDrag: PropTypes.func.isRequired
  },

  statics: {
    configureDragDrop: (register) => {
      register('phase', {
        dragSource: {beginDrag: (phaseRow) => {
          // TODO this.props.onBeginDrag(phaseRow.props.phase.get('id'));
          return {item: phaseRow.props.phase};
        }
        },
        dropTarget: {over: (phaseRow, phase) => {
          // TODO this.props.onEndDrag(phaseRow.props.phase.get('id'));
          phaseRow.props.onPhaseMove(phase.get('id'), phaseRow.props.phase.get('id'));
        }}});
    }
  },

  render() {
    const isDragging = this.getDragState('phase').isDragging;
    const style = {
      cursor: 'move',
      opacity: isDragging ? 0.5 : 1
    };
    const props = _.extend({style: style}, this.dragSourceFor('phase'), this.dropTargetFor('phase'));
    return (
      <tr {...props}
        onClick={this.props.toggleHide}>
        <td className="kb-orchestrator-task-drag text-center">
          <i className="fa fa-bars" />
        </td>
        <td colSpan="7">
          <div className="text-center">
            <strong>
              {this.props.phase.get('id')}
            </strong>
          </div>
        </td>
      </tr>
    );
  }

  /* <TasksEditTableRow
     task=this.props.task
     component: @props.components.get(task.get('component'))
     disabled: @props.disabled
     key: task.get('id')
     onTaskDelete: @props.onTaskDelete
     onTaskUpdate: @props.onTaskUpdate
     onTaskMove: @props.onTaskMove
     isParallelismEnabled: @props.isParallelismEnabled */


});
