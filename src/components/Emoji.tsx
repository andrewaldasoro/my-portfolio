import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class Emoji extends React.Component {
  public render: () => JSX.Element;

  private label: string | undefined;
  private symbol: string;
  private renderTooltip = (title: string) => (
    <Tooltip id={title + "-tooltip"}>{title}</Tooltip>
  );

  constructor(symbol: string, label?: string) {
    super({ symbol, label });
    this.symbol = symbol;
    this.label = label;

    this.render = () => (
      <OverlayTrigger
        overlay={this.renderTooltip(this.label ? this.label : "")}
      >
        <span
          className="emoji"
          role="img"
          aria-label={this.label ? this.label : ""}
          aria-hidden={this.label ? "false" : "true"}
        >
          {this.symbol}
        </span>
      </OverlayTrigger>
    );
  }
}

export default Emoji;
