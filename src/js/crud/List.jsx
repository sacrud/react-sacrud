import * as React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { rbtCss } from 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class List extends React.Component {
  render() {
    let products = [{
        id: 1,
        name: "Product1",
        price: 120
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }];
    return (
      <BootstrapTable data={products} striped hover>
          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
