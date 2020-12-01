import React from "react";

export default function subscribe(stateToProps, dispatchToProps) {
  return (Element) => {
    return class extends React.Component {
      componentDidMount() {
        document.addEventListener("store.update", () => this.forceUpdate());
      }

      componentWillUnmount() {
        document.removeEventListener("store.update", () => this.forceUpdate());
      }

      render() {
        return (
          <Element {...this.props} {...stateToProps()} {...dispatchToProps} />
        );
      }
    };
  };
}
