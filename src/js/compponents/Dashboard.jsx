import axios from 'axios';
import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from './Card'

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      widgets: []
    }
  }

  componentDidMount() {
    this.context.requests.get(
      this.context.urlApiHome
    ).then(res => {

      let title = res.data.title;
      let resources = res.data.resources;
      let rowLength = res.data.dashboard_row_len;

      this.setState({
        title: title,
        widgets: Object.keys(resources).map((key, index) => {
          let items = resources[key];
          let md = (rowLength < 5) ? 12 / rowLength : 4;
          return (
            <Col key={key} xs={6} md={md} style={{paddingTop: 20}}>
              <Card key={key} title={key} items={items} />
            </Col>
          )
        })
      });

    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <Grid>
          <Row>
              {this.state.widgets}
          </Row>
        </Grid>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  // AJAX
  requests: React.PropTypes.func,

  // API URL's
  urlApiHome: React.PropTypes.string
}
