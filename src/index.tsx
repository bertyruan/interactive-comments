import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.scss";
import "./styles/default.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CommentsProvider } from "./context/comments.context";
import { UsersProvider } from "./context/users.context";
import { Modal } from "./components/modal/modal.component";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const modal = ReactDOM.createRoot(
  document.getElementById("modal") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UsersProvider>
      <CommentsProvider>
        <App></App>
        <Modal></Modal>
      </CommentsProvider>
    </UsersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
