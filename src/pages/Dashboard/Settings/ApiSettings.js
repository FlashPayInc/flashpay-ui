import React from "react";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { AppIcons } from "../../../svg";

const ApiSettings = () => {
  const notEmpty = !true;

  return (
    <div className="api_settings">
      {notEmpty ? (
        <>
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
        </>
      ) : (
        <EmptyStateContainer
          vector="comingsoon"
          type="bold"
          text={`COMING SOON`}
        />
      )}{" "}
    </div>
  );
};

export default ApiSettings;
