import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import DocumentManageModal from './DocumentManageModal';
import DocumentDeleteModal from './DocumentDeleteModal';
import { connect } from 'react-redux'
import { getDocuments, createDocument, updateDocument, deleteDocument, searchDocument} from '../../api/modules/document'
import { epochToString } from '../../utils/timeHelper';
import './styles.scss'

class Documents extends Component {

  constructor(props) {
    super(props);
    this.sortBy = 'title';
    this.sortType = 1;
    this.state = {
      selectedDocumentIndex: -1,
      showDocumentManageModal: false,
      showDocumentDeleteModal: false,
      isEdit: false,
      documents: [],
      searchValue: '',
    }

  }

  componentWillReceiveProps(nextProps) {
    this.sortDocuments(nextProps.documents);
  }

  componentWillMount() {
    this.retrieveDocuments();
  }

  retrieveDocuments() {
    const { searchValue } = this.state;
    if (searchValue)
      this.props.searchDocument({searchValue});
    else
      this.props.getDocuments();

  }
  handleDocumentClick(index) {
    this.setState({selectedDocumentIndex: index});
  }

  openDocumentManageModal(isEdit = false) {
    this.setState({
      showDocumentManageModal: true,
      isEdit
    });

  }

  closeDocumentManageModal() {
    this.setState({
      showDocumentManageModal: false,
      isEdit: false,
    });
  }

  updateDocument(data) {
    let payload = data;

    const success = (res, action) => {
      this.retrieveDocuments();
      this.closeDocumentManageModal();
    };

    if (this.state.isEdit) {
      payload.id = this.state.documents[this.state.selectedDocumentIndex].id;
      this.props.updateDocument({
        body: payload,
        success
      });
    } else {
      this.props.createDocument({
        body: payload,
        success
      });
    }
  }

  openDocumentDeleteModal() {
    this.setState({
      showDocumentDeleteModal: true,
    });
  }

  closeDocumentDeleteModal() {
    this.setState({
      showDocumentDeleteModal: false,
    });
  }

  deleteDocument() {
    this.props.deleteDocument({
      id: this.state.documents[this.state.selectedDocumentIndex].id,
      success: (res, action) => {
        this.retrieveDocuments();
        this.closeDocumentDeleteModal();
        this.setState({
          selectedDocumentIndex: -1
        });
      }
    });
  }

  changeSortBy(sortBy) {
    if (this.sortBy === sortBy) {
      this.sortType = -this.sortType;
    }
    else {
      this.sortBy = sortBy;
      this.sortType = 1;
    }
    this.sortDocuments(this.state.documents);

  }

  sortDocuments(data) {
    let documents = data.slice();
    const compare = (a,b) => {
      if (a[this.sortBy] < b[this.sortBy])
        return this.sortType;
      if (a[this.sortBy] > b[this.sortBy])
        return -this.sortType;
      return 0;
    };

    documents.sort(compare);
    this.setState({documents});
  }

  handleSearch(e) {
    const searchValue = e.target.value;
    this.setState({searchValue});
    if (searchValue)
      this.props.searchDocument({searchValue});
    else
      this.props.getDocuments();
  }

  renderTable(selectedDocumentIndex) {
    const { documents } = this.state;

    return (
      <React.Fragment>
        {documents.map((doc, i) => {
          let className = i === selectedDocumentIndex ? 'selected' : i === selectedDocumentIndex - 1 ? 'before-selected' : '';
          return (
            <div className="overview-row" style={{cursor: 'pointer'}} key={i} onClick={() => this.handleDocumentClick(i)}>
              <div className={"overview-body flex0 " + className}>{doc.title}</div>
              <div className={"overview-body flex0 " + className}>{doc.client}</div>
              <div className={"overview-body flex0 " + className}>{doc.type}</div>
              <div className={"overview-body " + className} style={{width: 180}}>{doc.dueDate ? epochToString(doc.dueDate, 'MM/DD/YY') : ''}</div>
              <div className={"overview-body " + className} style={{width: 180}}>{epochToString(doc.lastModified, 'MM/DD/YY')}</div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  renderMainContent() {
    const { selectedDocumentIndex, searchValue } =  this.state;

    return (
      <div className="document-page">
        <div className="document-table">
          <div className="overview">

            <div className="overview-row">
              <div className="overview-header flex0">
                <span>Document Title</span>
                <i className="fas fa-sort sort" onClick={() => this.changeSortBy('title')}/>
              </div>
              <div className="overview-header flex0" >
                <span>Customer</span>
                <i className="fas fa-sort sort" onClick={() => this.changeSortBy('client')}/>
              </div>
              <div className="overview-header flex0">
                <span>Type</span>
                <i className="fas fa-sort sort" onClick={() => this.changeSortBy('type')}/>
              </div>
              <div className="overview-header" style={{width: 180}}>
                <span>Due</span>
                <i className="fas fa-sort sort" onClick={() => this.changeSortBy('dueDate')}/>
              </div>
              <div className="overview-header" style={{width: 180}}>
                <span>Changed</span>
                <i className="fas fa-sort sort" onClick={() => this.changeSortBy('lastModified')}/>
              </div>
            </div>

            <div className="overview-row">
              <div className={"overview-body flex0 " + (selectedDocumentIndex === 0 ? "before-selected" : "")}
                   style={{color: 'rgb(175, 175, 175)'}}>
                <i className="material-icons" style={{paddingRight: 10}} onClick={() => this.openDocumentManageModal()}>add</i>
                {selectedDocumentIndex !== -1 &&
                <React.Fragment>
                  <i className="material-icons" style={{paddingRight: 10}} onClick={() => this.openDocumentManageModal(true)}>edit</i>
                  <i className="material-icons" style={{paddingRight: 10}} onClick={ () => this.openDocumentDeleteModal()}>close</i>
                </React.Fragment>
                }
              </div>
            </div>

            {this.renderTable(selectedDocumentIndex)}

          </div>
        </div>

        <div className="top-section-border search-document-bar">
          <div>
            <i className="pro icon-search" style={{marginRight: 10, fontSize: 16}}/>
            <input placeholder="Search Document" className="inline-input" value={searchValue} onChange={this.handleSearch.bind(this)}/>
          </div>
          <button className="bottom-navigation-button disabled" disabled="disabled">Build Document</button>
        </div>
      </div>

    )
  }

  render() {
    const { showDocumentManageModal, showDocumentDeleteModal, isEdit, selectedDocumentIndex} = this.state;
    const { documents } = this.state;
    return (
      <div className="viewport vbox">
        <Header showBuilder={(selectedDocumentIndex !== -1)}/>
        {this.renderMainContent()}
        {showDocumentManageModal &&
          <DocumentManageModal
            title={isEdit ? documents[selectedDocumentIndex].title : ''}
            client={isEdit ? documents[selectedDocumentIndex].client : ''}
            type={isEdit ? documents[selectedDocumentIndex].type : ''}
            dueDate={isEdit ? documents[selectedDocumentIndex].dueDate: ''}
            isEdit={isEdit}
            onHide={this.closeDocumentManageModal.bind(this)}
            onSubmit={this.updateDocument.bind(this)}
          />
        }
        {showDocumentDeleteModal &&
        <DocumentDeleteModal
          title={documents[selectedDocumentIndex].title}
          onHide={this.closeDocumentDeleteModal.bind(this)}
          onDelete={this.deleteDocument.bind(this)}
        />
        }
        <button className="general-help-button">?</button>
      </div>
    )
  }
}

Documents.propTypes = {
  documents: PropTypes.array,
  getDocuments: PropTypes.func,
  createDocument: PropTypes.func,
  updateDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  searchDocument: PropTypes.func,
};

const mapStateToProps = ({document}) => {
  const { documents } = document
  return {documents}
};

const mapActionToProps = {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  searchDocument
};

export default connect(mapStateToProps, mapActionToProps)(Documents)
