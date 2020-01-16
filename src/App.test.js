import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SettingProvider from "./shared/context";

const renderApp = (props = {}) =>
  render(
    <SettingProvider>
      <App />
    </SettingProvider>
  );

test("Render App", async () => {
  const { getByTestId } = renderApp({});
});
