import React from 'react';

interface Props {}

interface State {
  image: string;
}

class ProfileImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { image: '' };
  }

  componentDidMount() {
    fetch("/api/bitmoji").then(res => {
      return res.text()
    }).then((image) => {
      this.setState({ image: image })
    });
  }

  render() {
    return <img data-testid="ProfileImage" src={this.state.image} alt="Bitmoji" />
  }

}

export default ProfileImage;
