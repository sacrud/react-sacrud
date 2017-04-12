import axios from 'axios';
import urljoin from 'url-join'
import * as React from 'react';
import PropTypes from 'prop-types';

import mainCSS from '../../css/main.scss'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

// console.log("Version: " + VERSION);

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.requests = axios.create({
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    }),

    this.API_HOME = 'home'
    this.API_SETTINGS = 'settings'

    this.state = {
      urlHome: '',
      urlStatic: ''
    }
  }

  componentDidMount() {
    this.requests.get(
      urljoin(this.props.url_api, this.API_SETTINGS)
    ).then(res => {
      this.setState({
        urlHome: res.data.url_home,
        urlStatic: res.data.url_static
      });
    });
  }

  getChildContext() {
    return {
      // AJAX
      requests: this.requests,

      // View URL's
      urlHome: this.state.urlHome,
      urlStatic: this.state.urlStatic,

      // API URL's
      urlApi: this.props.url_api,
      urlApiHome: urljoin(this.props.url_api, this.API_HOME),
      urlApiSettings: urljoin(this.props.url_api, this.API_SETTINGS)
    }
  }

  render() {
    return (
      <div className="app">
        {this.props.content}
      </div>
    );
  }
}

App.childContextTypes = {
  // AJAX
  requests: PropTypes.func,

  // View URL's
  urlHome: PropTypes.string,
  urlStatic: PropTypes.string,

  // API URL's
  urlApi: PropTypes.string,
  urlApiHome: PropTypes.string,
  urlApiSettings: PropTypes.string
}
