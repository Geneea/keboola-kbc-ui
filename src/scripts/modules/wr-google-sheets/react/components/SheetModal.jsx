import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import {Modal, TabbedArea, TabPane} from 'react-bootstrap';
import WizardButtons from './WizardButtons';
import InputTab from './InputTab';
import SpreadsheetTab from './SpreadsheetTab';
import SheetTab from './SheetTab';
import StorageTablesStore from '../../../components/stores/StorageTablesStore';

export default React.createClass({
  propTypes: {
    email: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    isSavingFn: PropTypes.func.isRequired,
    onHideFn: PropTypes.func,
    onSaveFn: PropTypes.func.isRequired,
    localState: PropTypes.object.isRequired,
    updateLocalState: PropTypes.func.isRequired,
    prepareLocalState: PropTypes.func.isRequired
  },

  render() {
    const step = this.localState(['step'], 1);
    const storageTables = StorageTablesStore.getAll();

    return (
      <Modal
        bsSize="large"
        show={this.props.show}
        onHide={this.props.onHideFn}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.localState(['currentSheet', 'title'], false) ? 'Edit Sheet' : 'Add Sheet'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            minHeight: '250px'
          }}
        >
          <TabbedArea activeKey={step} defaultActiveEventKey={1} animation={false}>
            <TabPane tab="Source" eventKey={1} disabled={step !== 1}>
              <InputTab
                onSelect={this.updateInputMapping}
                tables={storageTables}
                mapping={this.localState(['currentMapping'], Map())}
              />
            </TabPane>
            <TabPane tab="Destination" eventKey={2} disabled={step !== 3}>
              <SpreadsheetTab
                onSelectExisting={(data) => {
                  this.updateLocalState(['sheet'].concat('fileId'), data[0].id);
                  this.updateLocalState(['sheet'].concat('title'), data[0].name);
                }}
                onSelectFolder={(data) => {
                  this.updateLocalState(['sheet'].concat(['folder', 'id']), data[0].id);
                  this.updateLocalState(['sheet'].concat(['folder', 'title']), data[0].name);
                }}
                onChangeTitle={(e) => this.updateLocalState(['sheet'].concat('title'), e.target.value)}
                onSwitchType={(e) => this.updateLocalState(['uploadType'], e.target.value)}
                valueTitle={this.sheet('title', '')}
                valueFolder={this.sheet(['folder', 'title'], '/')}
                type={this.localState('uploadType', 'new')}
              />
            </TabPane>
            <TabPane tab="Options" eventKey={3} disabled={step !== 3}>
              <SheetTab
                onChangeSheetTitle={(e) => this.updateLocalState(['sheet'].concat('sheetTitle'), e.target.value)}
                onChangeAction={(e) => this.updateLocalState(['sheet', 'action'], e.target.value)}
                valueSheetTitle={this.sheet('sheetTitle')}
                valueAction={this.sheet('action')}
              />
            </TabPane>
          </TabbedArea>
        </Modal.Body>
        <Modal.Footer>
          <WizardButtons
            onNext={this.handleNext}
            onPrevious={this.handlePrevious}
            onSave={this.handleSave}
            onCancel={this.props.onHideFn}
            isSaving={this.props.isSavingFn(this.sheet('id'))}
            isNextDisabled={this.isStepValid(step)}
            isSaveDisabled={this.isSavingDisabled()}
            isPreviousDisabled={step === 1}
            showNext={step < 3}
            showSave={step === 3}
          />
        </Modal.Footer>
      </Modal>
    );
  },

  isStepValid(step) {
    const tableIdEmpty = !!this.sheet(['tableId']);
    const titleEmpty = !!this.sheet(['title']);
    const sheetTitleEmpty = !!this.sheet(['sheetTitle']);
    const action = !!this.sheet(['action']);

    if (step === 1) {
      return !tableIdEmpty;
    } else if (step === 2) {
      return !tableIdEmpty || !titleEmpty;
    } else if (step === 3) {
      return !tableIdEmpty || !titleEmpty || !sheetTitleEmpty || !action;
    }
  },

  isSavingDisabled() {
    const hasChanged = !this.sheet(null, Map()).equals(this.localState('currentSheet'));
    const titleEmpty = !!this.sheet(['title']);
    const sheetTitleEmpty = !!this.sheet(['sheetTitle']);
    return !hasChanged || !titleEmpty || !sheetTitleEmpty;
  },

  localState(path, defaultVal) {
    return this.props.localState.getIn([].concat(path), defaultVal);
  },

  sheet(path, defaultValue) {
    if (path) {
      return this.localState(['sheet'].concat(path), defaultValue);
    } else {
      return this.localState(['sheet'], defaultValue);
    }
  },

  updateInputMapping(value) {
    this.updateLocalState(['currentMapping'], value);
    this.updateLocalState(['sheet', 'tableId'], value.get('source'));
  },

  updateLocalState(path, newValue) {
    return this.props.updateLocalState([].concat(path), newValue);
  },

  handleSave() {
    const sheet = this.sheet();
    const mapping = this.localState('currentMapping');
    this.props.onSaveFn(sheet, mapping).then(
      () => this.props.onHideFn()
    );
  },

  handleNext() {
    const step = this.localState(['step']);
    const nextStep = (step >= 3) ? 3 : step + 1;
    this.updateLocalState(['step'], nextStep);
  },

  handlePrevious() {
    const step = this.localState(['step']);
    const nextStep = (step <= 1) ? 1 : step - 1;
    this.updateLocalState(['step'], nextStep);
  },

  switchType() {
    const currentType = this.localState(['modalType']);
    let nextModalType = 'sheetInNew';
    if (currentType === 'sheetInNew') {
      nextModalType = 'sheetInExisting';
    }
    this.updateLocalState(['modalType'], nextModalType);
  }
});
