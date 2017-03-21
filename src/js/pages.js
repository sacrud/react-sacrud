import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./compponents/App";
import { Header } from './compponents/Header';
import { Dashboard } from './compponents/Dashboard';
import { Breadcrumbs } from './compponents/Breadcrumbs';

import { List } from './crud/List';

export class BasePages {
  constructor() {
    this.root = document.getElementById("ps-app");
    this.breadcrumbs = JSON.parse(this.root.dataset.breadcrumbs);
  }

  render(content) {
    ReactDOM.render(
      <App {...(this.root.dataset)} content={content} />,
      this.root
    );
  }
}

export class Pages extends BasePages {
  pageMain() {
    let content = (
      <div>
        <Header/>
        <Breadcrumbs data={this.breadcrumbs}/>
      </div>
    );
    this.render(content);
  }

  pageHome() {
    let content = (
      <div>
        <Header/>
        <Dashboard/>
      </div>
    );
    this.render(content);
  }
}

export class Crud extends BasePages {
  pageList() {
    let content = (
      <div>
        <Header/>
        <List/>
      </div>
    );
    this.render(content);
  }
}
