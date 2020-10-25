import React from "react";
import "./ProfileImage.scss";
import { getUrl } from "../services/api";

interface State {
  image: string;
}

class ProfileImage extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { image: "" };
  }

  componentDidMount(): void {
    fetch(getUrl("/bitmoji"))
      .then((res) => {
        return res.text();
      })
      .then((image) => {
        this.setState({ image: image });
      });
  }

  render(): JSX.Element {
    return (
      <img
        className="profile-image"
        data-testid="ProfileImage"
        src={this.state.image}
        alt="Bitmoji"
      />
    );
  }
}

export default ProfileImage;
