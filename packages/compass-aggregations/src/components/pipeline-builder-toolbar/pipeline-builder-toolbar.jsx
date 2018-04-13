import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextButton, IconButton } from 'hadron-react-buttons';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import styles from './pipeline-builder-toolbar.less';

/**
 * The pipeline builder toolbar component.
 */
class PipelineBuilderToolbar extends PureComponent {
  static displayName = 'PipelineBuilderToolbarComponent';

  static propTypes = {
    savedPipelinesListToggle: PropTypes.func.isRequired,
    getSavedPipelines: PropTypes.func.isRequired,
    savedPipeline: PropTypes.object.isRequired,
    copyToClipboard: PropTypes.func.isRequired,
    newPipeline: PropTypes.func.isRequired,
    clonePipeline: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    saveCurrentPipeline: PropTypes.func.isRequired
  }

  onNameChange = (evt) => {
    this.props.nameChanged(evt.target.value);
  }

  handleSavedPipelinesOpen = () => {
    this.props.getSavedPipelines();
    this.props.savedPipelinesListToggle(1);
  }

  handleSavedPipelinesClose = () => {
    this.props.savedPipelinesListToggle(0);
  }

  /**
   * Renders the pipeline builder toolbar.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const clickHandler = this.props.savedPipeline.isListVisible
      ? this.handleSavedPipelinesClose
      : this.handleSavedPipelinesOpen;
    const openPipelinesClassName = classnames({
      'btn': true,
      'btn-xs': true,
      'btn-default': true
    });
    const savePipelineClassName = classnames({
      'btn': true,
      'btn-xs': true,
      'btn-default': true,
      [ styles['pipeline-builder-toolbar-save-pipeline-button'] ]: true
    });
    const inputClassName = classnames({
      [ styles['pipeline-builder-toolbar-name']]: true
    });

    return (
      <div className={classnames(styles['pipeline-builder-toolbar'])}>
        <IconButton
          title="Toggle Saved Pipelines"
          className={openPipelinesClassName}
          iconClassName="fa fa-folder-open-o"
          clickHandler={clickHandler} />
        <div className={classnames(styles['pipeline-builder-toolbar-add-wrapper'])}>
          <input
            placeholder="Enter a pipeline name..."
            onChange={this.onNameChange}
            className={inputClassName}
            type="text"
            value={this.props.name} />
        </div>
        <TextButton
          text="Save Pipeline"
          disabled={this.props.name.trim() === ''}
          className={savePipelineClassName}
          clickHandler={this.props.saveCurrentPipeline} />
        <DropdownButton bsStyle="default" title="..." noCaret pullRight id="agg-pipeline-actions">
          <MenuItem onClick={this.props.copyToClipboard}>Copy Pipeline to Clipboard</MenuItem>
          <MenuItem onClick={this.props.clonePipeline}>Clone Pipeline</MenuItem>
          <MenuItem onClick={this.props.newPipeline}>New Pipeline</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

export default PipelineBuilderToolbar;
