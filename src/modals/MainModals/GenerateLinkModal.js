import { useState, useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import DropDownMenu from "../../common/DropDownMenu";
import {
  closeModal,
  generateLinkSuccessful,
} from "../../features/modals/modalSlice";
import { AppIcons, AppIcons2, Assets } from "../../svg";

const SelectMenu = ({ type, curOption, setCurOption }) => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const UpdateOption = (item) => {
    setIsOpen(false);
    setCurOption(item);
  };

  return (
    <DropDownMenu
      data={type}
      type={"select-item"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      curOption={curOption}
      dropDownRef={dropDownRef}
      UpdateOption={UpdateOption}
    >
      {type === "payment-frequency" ? (
        <div
          ref={dropDownRef}
          className="payment_duration"
          onClick={() => setIsOpen((p) => !p)}
        >
          <p>{curOption}</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : type === "assets-list" ? (
        <div
          ref={dropDownRef}
          className="asset_select"
          onClick={() => setIsOpen((p) => !p)}
        >
          <div className="asset_info">
            <Assets asset={curOption} />
            <p>{curOption}</p>
          </div>

          <i className="ph-caret-down-bold caret_down"></i>
        </div>
      ) : null}
    </DropDownMenu>
  );
};

const GenerateLinkModal = ({ data }) => {
  const dispatch = useDispatch();
  const [isFixed, setIsFixed] = useState(true);
  const [curAsset, setCurAsset] = useState("usdt");
  const [curFreq, setCurFreq] = useState("Conitinual");

  const [copy, setCopy] = useState("Copy link");

  const CopiedText = () => {
    if (copy === "Link copied") return;
    setCopy("Link copied");
    setTimeout(() => setCopy("Copy link"), 2000);
  };

  return !data?.generated ? (
    <>
      <div className="modal_header">
        <p className="main">Generate link</p>
        <p className="sub">
          Table the discussion; I just wanted to give you a heads-up, and run it
          up the flag pole for a performance review.
        </p>
      </div>

      <div className="modal_content">
        <div className="logo_block">
          <div className="logo_img">
            <AppIcons type="flashpay" />
          </div>
          <div className="edit_img">Edit image</div>
        </div>

        <div className="generate_link_form">
          <input type="text" placeholder="Name of link" />

          <div className="form_row amt_ty">
            <div className="amount_type fixed" onClick={() => setIsFixed(true)}>
              <p>Fixed amount</p>
              <div className="option_ticked">
                {isFixed ? <AppIcons2 type="tickcircle" /> : null}
              </div>
            </div>
            <div
              className="amount_type variable"
              onClick={() => setIsFixed(false)}
            >
              <p>Variable amount</p>
              <div className="option_ticked">
                {!isFixed ? <AppIcons2 type="tickcircle" /> : null}
              </div>
            </div>
          </div>

          {isFixed ? (
            <div className="form_row">
              <SelectMenu
                type="assets-list"
                curOption={curAsset}
                setCurOption={setCurAsset}
              />
              <input type="text" placeholder="Amount" />
            </div>
          ) : null}

          <div className="form_row">
            <SelectMenu
              type="payment-frequency"
              curOption={curFreq}
              setCurOption={setCurFreq}
            />
          </div>

          <div className="warning_component">
            <i className="ph-warning-circle-fill warn_icon"></i>
            <p>The amount would be paid into your wallet address.</p>
          </div>
        </div>
      </div>

      <div className="action_buttons">
        <button
          className="cancel_button"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
        <button
          className="continue_button"
          onClick={() => dispatch(generateLinkSuccessful())}
        >
          Create
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modal_header">
        <p className="main">Success!</p>
        <p className="sub">
          You have generated a payment link. To view all the links you have
          generated, use the <a href="#">Payment links</a> navigation on the
          left sidebar.
        </p>
      </div>

      <div className="modal_content">
        <div className="generate_link_form">
          <div className="form_row">
            <div className="payment_link_preview">
              <p>https://flashpay.com/29747mfl</p>

              <i className="ph-link-simple-horizontal" />
            </div>
          </div>
        </div>
      </div>

      <div className="action_buttons">
        <button
          className="cancel_button"
          onClick={() => dispatch(closeModal())}
        >
          Back
        </button>
        <CopyToClipboard
          text={"https://flashpay.com/29747mfl"}
          onCopy={() => CopiedText()}
        >
          <button
            className={`continue_button ${
              copy === "Link copied" ? "copied" : ""
            }`}
          >
            {copy}
          </button>
        </CopyToClipboard>
      </div>
    </>
  );
};

export default GenerateLinkModal;
