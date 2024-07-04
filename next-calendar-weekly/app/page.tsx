"use client";
import { persistor, store } from "../redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { Provider } from "react-redux";

export default function Home() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <h1>Hello World</h1>
          </ThemeProvider>
        </PersistGate>
      </Provider>
  );
}
