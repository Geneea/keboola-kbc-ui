React = require('react')
createStoreMixin = require('../../../../react/mixins/createStoreMixin')
JobsStore = require('../../stores/JobsStore')
Loader = React.createFactory(require('kbc-react-components').Loader)
ActionCreators = require('../../ActionCreators')
RoutesStore = require('../../../../stores/RoutesStore')

JobDetailReloaderButton = React.createClass
  displayName: 'JobDetailReloaderButton'
  mixins: [createStoreMixin(JobsStore)]

  _getJobId: ->
    RoutesStore.getCurrentRouteIntParam 'jobId'

  getStateFromStores: ->
    job: JobsStore.get @_getJobId()
    jobLoading: JobsStore.getIsJobLoading(@_getJobId())

  render: ->
    React.DOM.span null,
      if @state.jobLoading
        React.DOM.span null,
          ' '
          Loader()


module.exports = JobDetailReloaderButton
