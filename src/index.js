import "./axios";
import App from "./App";
import "./styles/index.scss";
import * as ReactDOMClient from "react-dom/client";
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App tab="app" />);
