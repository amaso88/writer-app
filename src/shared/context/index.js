import React, { Component } from "react";
import Firebase from "../firebase/firebase-manager";
import AuthManager from "./auth-manager";

// Crear el context
const SettingContext = React.createContext();
SettingContext.displayName = 'SettingContext';
export { SettingContext };

class SettingProvider extends Component {
  state = {
		firebase: new Firebase(),
		auth: new AuthManager(),
  };

  render() {
    return (
      <SettingContext.Provider
        value={{
					firebase: this.state.firebase,
					auth: this.state.auth
        }}
      >
        {this.props.children}
      </SettingContext.Provider>
    );
  }
}

export const withSetting = Component => props => (
  <SettingContext.Consumer>
    {context => <Component {...props} context={context} />}
  </SettingContext.Consumer>
);

export default SettingProvider;
