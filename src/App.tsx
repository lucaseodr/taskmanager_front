import React from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Routes from "./routes";
import Header from "./components/Header";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    primary?: {
      main?: string;
    };
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#7b48f1",
      dark: "#4c04ef",
    },
    secondary: {
      // Purple and green play nicely together.
      main: "#5b5b63",
    },
    background: {
      default: "#414146",
    },
    text: {
      primary: "#e1e1e6",
      secondary: "rgba(0, 0, 0, 0.54)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline>
          <Header />
          <Routes />
        </CssBaseline>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
