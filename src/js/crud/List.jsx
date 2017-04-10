import * as React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { rbtCss } from 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'id',
      rows: [],
      columns: {'id': 'Id', }
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

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      bgColor: ' #4fc3f7',
      clickToSelect: true,
      showOnlySelected: true
    };
    let headerColumns = [];
    Object.keys(this.state.columns).map((key, index) => {
      let isKey = (key === this.state.key);
      console.log(isKey, this.state.key, key);
      headerColumns.push(
        <TableHeaderColumn dataField={ key } isKey={ isKey } dataSort={ true }>
          { this.state.columns[key] }
        </TableHeaderColumn>
      );
    });
    return (
      <BootstrapTable
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
  requests: React.PropTypes.func,
}
