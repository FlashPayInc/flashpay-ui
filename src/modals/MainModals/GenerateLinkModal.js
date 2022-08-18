import { useWindowSize } from "@react-hook/window-size/throttled";
import { useState, useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import DropDownMenu from "../../common/DropDownMenu";
import TextareaAutosize from "react-textarea-autosize";
import {
  closeModal,
  generateLinkSuccessful,
} from "../../features/modals/modalSlice";
import { AppIcons, ConnectIcon, Assets } from "../../svg";
import Icon from "../../svg/Icon";

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
  const [width] = useWindowSize();

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
    <div className={`modal_container ${width < 570 ? "fill-screen" : ""}`}>
      <div className="modal_header">
        <div className="main">
          {width < 570 ? (
            <>
              <div className="back-btn" onClick={() => dispatch(closeModal())}>
                <Icon.ArrowLeft />
              </div>

              <p>Generate link</p>
            </>
          ) : (
            <>
              <div className="closemodal-x">
                <div
                  className="back-btn"
                  onClick={() => dispatch(closeModal())}
                >
                  <Icon.CloseX />
                </div>
              </div>

              <p>Generate link</p>
            </>
          )}
        </div>
        <div className="sub">
          Table the discussion; I just wanted to give you a heads-up, and run it
          up the flag pole for a performance review.
        </div>
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

          <TextareaAutosize
            minRows={2}
            maxRows={2}
            className="textarea"
            placeholder="Description of link"
          />

          <div className="form_row amt_ty">
            <div className="amount_type fixed" onClick={() => setIsFixed(true)}>
              <p>Fixed amount</p>
              <div className="option_ticked">
                {isFixed ? <ConnectIcon type="tickcircle" /> : null}
              </div>
            </div>
            <div
              className="amount_type variable"
              onClick={() => setIsFixed(false)}
            >
              <p>Variable amount</p>
              <div className="option_ticked">
                {!isFixed ? <ConnectIcon type="tickcircle" /> : null}
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
    </div>
  ) : (
    <div className="modal_container">
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
              <a
                href="https://app.flashpay.finance/payment-portal/29747mfl"
                target="blank"
              >
                payment-portal/29747mfl
              </a>

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
          text={"https://app.flashpay.finance/payment-portal/29747mfl"}
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
    </div>
  );
};

export default GenerateLinkModal;
