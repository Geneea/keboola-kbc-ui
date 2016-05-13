React = require 'react'

TransformationsIndex = require('./react/pages/transformations-index/TransformationsIndex')
TransformationBucket = require('./react/pages/transformation-bucket/TransformationBucket')
TransformationDetail = require('./react/pages/transformation-detail/TransformationDetail')
TransformationGraph = require('./react/pages/transformation-graph/TransformationGraph')
Sandbox = require('./react/pages/sandbox/Sandbox')
InstalledComponentsActionCreators = require('./../components/InstalledComponentsActionCreators')
TransformationsActionCreators = require('./ActionCreators')
VersionsActionCreators = require('../components/VersionsActionCreators')
ProvisioningActionCreators = require('../provisioning/ActionCreators')
StorageActionCreators = require('../components/StorageActionCreators')
TransformationsIndexReloaderButton = require './react/components/TransformationsIndexReloaderButton'
TransformationBucketButtons = require './react/components/TransformationBucketButtons'
TransformationListButtons = require('./react/components/TransformationsListButtons').default
TransformationBucketsStore = require  './stores/TransformationBucketsStore'
TransformationsStore = require  './stores/TransformationsStore'
Versions = require('../../modules/components/react/pages/Versions').default

routes =
      name: 'transformations'
      title: 'Transformations'
      defaultRouteHandler: TransformationsIndex
      reloaderHandler: TransformationsIndexReloaderButton
      headerButtonsHandler: TransformationBucketButtons
      requireData: [
        ->
          TransformationsActionCreators.loadTransformationBuckets()
      ,
        ->
          InstalledComponentsActionCreators.loadComponents()
      ]
      childRoutes: [
        name: 'transformationBucket'
        path: 'bucket/:bucketId'
        title: (routerState) ->
          bucketId = routerState.getIn(['params', 'bucketId'])
          name = TransformationBucketsStore.get(bucketId).get 'name'
          "Bucket " + name
        defaultRouteHandler: TransformationBucket
        headerButtonsHandler: TransformationListButtons
        requireData: [
          (params) ->
            VersionsActionCreators.loadVersions('transformation', params.bucketId)
        ]
        childRoutes: [
          name: 'transformationVersions'
          path: 'versions'
          title: ->
            "Versions"
          defaultRouteHandler: Versions
        ,
          name: 'transformationDetail'
          path: 'transformation/:transformationId'
          title: (routerState) ->
            bucketId = routerState.getIn(['params', 'bucketId'])
            transformationId = routerState.getIn(['params', 'transformationId'])
            name = TransformationsStore.getTransformation(bucketId, transformationId).get 'name'
            "Transformation " + name
          defaultRouteHandler: TransformationDetail
          requireData: [
            ->
              StorageActionCreators.loadTables()
              StorageActionCreators.loadBuckets()
          ]
          childRoutes: [
            name: 'transformationDetailGraph'
            path: 'graph'
            title: (routerState) ->
              "Overview"
            defaultRouteHandler: TransformationGraph
          ]
        ]
      ,
        name: 'sandbox'
        title: ->
          "Sandbox"
        defaultRouteHandler: Sandbox
        requireData: [
          ->
            ProvisioningActionCreators.loadMySqlSandboxCredentials()
        ,
          ->
            ProvisioningActionCreators.loadRedshiftSandboxCredentials()
        ,
          ->
            StorageActionCreators.loadBuckets()
        ,
          ->
            StorageActionCreators.loadTables()

        ]
      ]

module.exports = routes
