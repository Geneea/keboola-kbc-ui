React = require 'react'
is3rdParty = require('../../../is3rdParty').default

{div, label, ul, li, p, span, strong, address, a, br, em, table, tbody, tr, td, h2} = React.DOM

module.exports = React.createClass
  displayName: 'appUsageInfo'
  propTypes:
    component: React.PropTypes.object.isRequired

  renderFeatures: ->
    features = []

    if (is3rdParty(@props.component))
      features.push tr {key: "3rdParty"},
        td null,
          em {className: "fa fa-cloud fa-fw kbcLicenseIcon"}
        td null,
          'This is a 3rd party ' + @getAppType()

    if (@props.component.get("flags").contains("appInfo.fullAccess"))
      features.push tr {key: "fullAccess"},
        td null,
          em {className: "fa fa-exclamation-triangle"}
        td null,
          'This ' + @getAppType() + ' will have full access to the project including all its data.'


    if (@props.component.get("flags").contains("appInfo.fee"))
      features.push tr {key: "fee"},
        td null,
          em {className: "fa fa-money fa-fw kbcLicenseIcon"}
        td null,
          'There is an extra charge to use this ' + @getAppType()

    if (@props.component.get("flags").contains("appInfo.redshiftOnly"))
      features.push tr {key: "redshift"},
        td null,
          em {className: "fa fa-database fa-fw kbcLicenseIcon"}
        td null,
          'Redshift backend is required to use this ' + @getAppType()

    if (@props.component.get("flags").contains("appInfo.dataIn"))
      features.push tr {key: "dataIn"},
        td null,
          em {className: "fa fa-cloud-download fa-fw kbcLicenseIcon"}
        td null,
          "This #{@getAppType()} extracts data from outside sources"

    if (@props.component.get("flags").contains("appInfo.dataOut"))
      features.push tr {key: "dataOut"},
        td null,
          em {className: "fa fa-cloud-upload fa-fw kbcLicenseIcon"}
        td null,
          "This #{@getAppType()} sends data outside of Keboola Connection"

    if (is3rdParty(@props.component))
      features.push tr {key: "responsibility"},
        td null,
          em {className: "fa fa-life-ring fa-fw kbcLicenseIcon"}
        td null,
          "Support for this #{@getAppType()} is provided by its author, not Keboola"

    if (!is3rdParty(@props.component))
      features.push tr {key: "responsibility"},
        td null,
          em {className: "fa fa-life-ring fa-fw kbcLicenseIcon"}
        td null,
          "Support for this #{@getAppType()} is provided by Keboola"

    if (@props.component.getIn(['vendor', 'licenseUrl']))
      features.push tr {key: "license"},
        td null,
          em {className: "fa fa-file-text-o fa-fw kbcLicenseIcon"}
        td null,
          'You agree to '
          a {href: @props.component.getIn(['vendor', 'licenseUrl'])},
            'vendor\'s license agreement'

    return features

  render: ->
    table {className: "kbcLicenseTable"},
      tbody null,
        @renderFeatures()


  getAppType: ->
    switch @props.component.get("type")
      when "extractor"
        "extractor"
      when "writer"
        "writer"
      when "application"
        "application"
      else
        "component"
