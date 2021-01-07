import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default class Emoji extends React.Component {
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

export const EmojiRE = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;
