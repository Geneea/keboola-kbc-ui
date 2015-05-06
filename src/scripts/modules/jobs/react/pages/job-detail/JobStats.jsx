import React from 'react';
import {addons} from 'react/addons';
import Loader from '../../../../../react/common/Loader';

import {filesize} from '../../../../../utils/utils';
import TablesList from './TablesList';

export default React.createClass({
    propTypes: {
        stats: React.PropTypes.object.isRequired,
        isLoading: React.PropTypes.bool.isRequired
    },
    mixins: [addons.PureRenderMixin],

    dataSize() {
        return filesize(this.props.stats.getIn(['files', 'total', 'dataSizeBytes', 'total']));
    },

    filesCount() {
        return this.props.stats.getIn(['files', 'total', 'count']);
    },

    loader() {
       return this.props.isLoading ? <Loader/> : '';
    },

    render() {
        console.log('stats', this.props.stats.toJS());
        return (
            <div className="row clearfix">
                <div className="col-md-4">
                    <h4>
                        Imported Tables <small>{this.props.stats.getIn(['tables', 'import', 'totalCount'])} imports total</small> {this.loader()}
                    </h4>
                    <TablesList tables={this.props.stats.getIn(['tables', 'import'])}/>
                </div>
                <div className="col-md-4">
                    <h4>Exported Tables <small>{this.props.stats.getIn(['tables', 'export', 'totalCount'])} exports total</small></h4>
                    <TablesList tables={this.props.stats.getIn(['tables', 'export'])}/>
                </div>
                <div className="col-md-4">
                    <h4>Data Transfer</h4>
                    <span>{this.dataSize()} / {this.filesCount()} files</span>
                </div>
            </div>
        );
    }
});