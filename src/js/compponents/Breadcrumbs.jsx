import * as React from "react";
import { Breadcrumb } from "react-bootstrap";

export class Breadcrumbs extends React.Component {
  render() {
    let breadcrumbs = this.props.data.map(
      (item, index) => {
        let active = item.active
          ? item.active
          : (index + 1 === this.props.data.length) ? true : false;
        return (
          <Breadcrumb.Item active={active} key={item.name} id={item.name} href={item.url}>
            {item.name}
          </Breadcrumb.Item>
        );
      }
    );
    return (
      <Breadcrumb>
        {breadcrumbs}
      </Breadcrumb>
    );
  }
}
