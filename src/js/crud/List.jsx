import * as React from 'react';
import PropTypes from 'prop-types';
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton
} from 'react-bootstrap-table';
import { rbtCss } from
'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'id',
      rows: [],
      columns: { 'id': 'Id', },
    }
  }

  componentDidMount() {
    this.context.requests.get(
      './'
    ).then(res => {
      this.setState({
        key: res.data.key,
        rows: res.data.items,
        columns: res.data.columns
      });
    });
  }

  handleDeleteButtonClick = (onClick) => {
    let dropRowKeys = this.refs.list_table.state.selectedRowKeys;
    if (confirm('Are you sure you want to delete?')) {
      this.context.requests.delete(
        './', {
          'params': {
            items: dropRowKeys
          }
        }
      ).then(res => {
        if (res.data.status === true) {
          this.refs.list_table.deleteRow(dropRowKeys);
        }
        this.componentDidMount();
      });
    }
  }

  createCustomDeleteButton = (onClick) => {
    return (
      <DeleteButton
        btnText='delete'
        btnContextual='btn-warning'
        className='sacrud-delete-btn'
        btnGlyphicon='glyphicon-edit'
        onClick={ () => this.handleDeleteButtonClick(onClick) }/>
    );
  }

  render() {
    const options = {
      deleteBtn: this.createCustomDeleteButton
    };
    const selectRowProp = {
      mode: 'checkbox',
      bgColor: ' #4fc3f7',
      clickToSelect: true,
      showOnlySelected: true,
    };
    let headerColumns = [];
    Object.keys(this.state.columns).map((key, index) => {
      let isKey = (key === this.state.key);
      headerColumns.push(
        <TableHeaderColumn dataField={ key } isKey={ isKey } dataSort={ true }>
          { this.state.columns[key] }
        </TableHeaderColumn>
      );
    });
    return (
      <BootstrapTable
        ref='list_table'
        options={ options }
        data={ this.state.rows }
        multiColumnSort={ 2 }
        selectRow={ selectRowProp }
        deleteRow
        pagination={ true }
        striped hover condensed>
        { headerColumns }
      </BootstrapTable>
    );
  }
}

List.contextTypes = {
  // AJAX
  requests: PropTypes.func,
}
