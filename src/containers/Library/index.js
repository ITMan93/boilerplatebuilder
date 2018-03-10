import React, { Component, Fragment } from 'react';

import Header from 'components/Header';
import AddFolder from 'components/AddFolder';
import AddContent from 'components/AddContent';

import Wrapper from './Wrapper';

class Library extends Component {
  state = {
    visibleAddContent: false,
    visibleAddFolder: false
  };

  showAddContent = () => this.setState({ visibleAddContent: true });
  hideAddContent = () => this.setState({ visibleAddContent: false });

  showAddFolder = () => this.setState({ visibleAddFolder: true });
  hideAddFolder = () => this.setState({ visibleAddFolder: false });

  render() {
    const { visibleAddFolder, visibleAddContent } = this.state;

    return (
      <Fragment>
        <Header />
        <Wrapper className="main hbox space-between">
          <div>
            <div className="library-overview">
              <div className="section-header-block">
                <h1 className="header1">Library</h1>
                <i className="material-icons" title="Add content" onClick={this.showAddContent}>
                  add
                </i>
                <i className="material-icons" title="Add folder" onClick={this.showAddFolder}>
                  create_new_folder
                </i>
              </div>

              <div style={{ flex: '1 1 0%', overflowY: 'auto' }} />

              <div className="search-container">
                <i className="pro icon-search" ></i>
                <input placeholder="Search Content Blocks" className="inline-input" />
              </div>
            </div>

            {visibleAddContent && <AddContent onClose={this.hideAddContent} />}
            {visibleAddFolder && <AddFolder onClose={this.hideAddFolder} />}
          </div>

          <div className="main left-section-border">
            <div className="template-preview">
              <div className="template-preview-inner" />
            </div>
          </div>

          <button className="general-help-button">?</button>
        </Wrapper>
      </Fragment>
    );
  }
}

export default Library;
