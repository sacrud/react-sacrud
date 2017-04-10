import * as React from "react";

import styles from '../../css/card.scss';

class Row extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.url} id={this.props.id}>{this.props.name}</a>
        <br />
      </div>
    )
  }
}

export class Card extends React.Component {
  render() {
    return (
      <div className="w3-card-4">
        <header className="w3-container w3-blue">
          <h4>{this.props.title}</h4>
        </header>

        <div className="w3-container">
          {this.props.items.map(
            item => <Row key={item.id}
              id={item.id}
              url={item.url}
              name={item.name} />
          )}
        </div>

        <footer className="w3-container w3-blue">
          {this.props.footer ? <h5>this.props.footer</h5> : ''}
        </footer>
      </div>
    );
  }
}
