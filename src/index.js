import "./axios";
import App from "./App";
import "./styles/index.scss";
import { RecoilRoot } from "recoil";
import "react-loading-skeleton/dist/skeleton.css";
import * as ReactDOMClient from "react-dom/client";
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <RecoilRoot>
    <App tab="app" />
  </RecoilRoot>
);
