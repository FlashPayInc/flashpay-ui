import React from "react";
import { AppIcons } from "../../../svg";

const ApiSettings = () => {
  return (
    <div className="api_settings">
      <div className="api_keys">
        <div className="api_key">
          <div className="api_key_inner">
            <p className="title">Secret key</p>
            <p className="value">FL_jennv3095u385bo34bfn308_24825nnsvon</p>
          </div>

          <div className="copy_key">
            <AppIcons type="copy" />
          </div>
        </div>

        <div className="hide_secret_key">Hide secret key</div>

        <div className="api_key">
          <div className="api_key_inner">
            <p className="title">Public key</p>
            <p className="value">FL_jennv3095u385bo34bfn308_24825nnsvon</p>
          </div>

          <div className="copy_key">
            <AppIcons type="copy" />
          </div>
        </div>

        <div className="api_key">
          <div className="api_key_inner">
            <p className="title">Public key</p>
            <p className="value">FL_jennv3095u385bo34bfn308_24825nnsvon</p>
          </div>

          <div className="copy_key">
            <AppIcons type="copy" />
          </div>
        </div>

        <button className="save_changes">Save changes</button>
      </div>

      <div className="generate_new_keys">Generate new keys</div>
    </div>
  );
};

export default ApiSettings;
