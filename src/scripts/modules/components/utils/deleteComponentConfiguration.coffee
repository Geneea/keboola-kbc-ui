componentHasApi = require './hasComponentApi'
NonApiComponents = require('./createComponentConfiguration').COMPONENTS_WITHOUT_API

installedComponentsApi = require '../InstalledComponentsApi'
syrupApi = require '../SyrupComponentApi'

module.exports = (componentId, configurationId) ->
  if componentHasApi(componentId)
    syrupApi
    .createRequest(componentId, 'DELETE', "configs/#{configurationId}")
    .promise()
    .then ->
      installedComponentsApi.deleteConfiguration componentId, configurationId
  else
    installedComponentsApi.deleteConfiguration componentId, configurationId
