React = require 'react'
createStoreMixin = require '../../../../react/mixins/createStoreMixin'
goodDataWriterStore = require '../../store'
actionCreators = require '../../actionCreators'
RoutesStore = require '../../../../stores/RoutesStore'

{ButtonGroup, Button, DropdownButton, MenuItem} = require 'react-bootstrap'

Confirm = require '../../../../react/common/Confirm'
PureRenderMixin = require('react/addons').addons.PureRenderMixin


{button, span} = React.DOM

module.exports = React.createClass
  displayName: 'GoodDataWriterTableButtons'
  mixins: [createStoreMixin(goodDataWriterStore), PureRenderMixin]

  componentWillReceiveProps: ->
    @setState(@getStateFromStores())

  getStateFromStores: ->
    configId = RoutesStore.getCurrentRouteParam('config')
    tableId = RoutesStore.getCurrentRouteParam('table')

    table: goodDataWriterStore.getTable(configId, tableId)
    configurationId: configId

  _handleResetExportStatus: ->
    actionCreators.saveTableField @state.configurationId,
      @state.table.get 'id'
      'isExported'
      false

  _handleResetTable: ->
    actionCreators.resetTable @state.configurationId,
      @state.table.get 'id'

  render: ->
    resetExportStatusText = React.DOM.span null,
      'Are you sure you want to reset export status of '
      React.DOM.strong null, @state.table.getIn ['data', 'name']
      ' dataset?'

    resetTableText = React.DOM.span null,
      'You are about to remove dataset in the GoodData project belonging
      to the table and reset its export status.
      Are you sure you want to reset table '
      React.DOM.strong null, @state.table.getIn ['data', 'name']
      ' ?'

    React.createElement ButtonGroup, null,
      React.createElement DropdownButton, null,
        React.createElement MenuItem, null,
          React.createElement Confirm,
            title: 'Reset export status'
            text: resetExportStatusText
            buttonLabel: 'Reset'
            buttonType: 'success'
            onConfirm: @_handleResetExportStatus
          ,
            React.DOM.span null, 'Reset export status'
        React.createElement MenuItem, null,
          React.createElement Confirm,
            title: 'Reset table'
            text: resetTableText
            buttonLabel: 'Reset'
            buttonType: 'success'
            onConfirm: @_handleResetTable
          ,
            React.DOM.span null, 'Reset table'
      React.createElement Button, null,
        span ClassName: 'fa fa-upload fa-fw'
        ' Upload table'
