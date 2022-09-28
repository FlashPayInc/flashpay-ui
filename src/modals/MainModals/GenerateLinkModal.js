import _ from "lodash";
import Icon from "../../svg/Icon";
import { useEffect, useRef, useState } from "react";
import { AppIcons, ConnectIcon } from "../../svg";
import { useDispatch, useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import TextareaAutosize from "react-textarea-autosize";
import CreateLink from "../../common/Dropdown/createlink";
import { closeModal } from "../../features/modals/modalSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { CreateNewLink } from "../../features/requests/paymentLinks";

const SelectMenu = ({ type, assets, curOption, setCurOption }) => {
  const UpdateOption = item => setCurOption(item);
  return (
    <CreateLink
      type={type}
      assets={assets}
      curOption={curOption}
      UpdateOption={UpdateOption}
    />
  );
};

const GenerateLinkModal = ({ data }) => {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [copy, setCopy] = useState("Copy link");
  const [validName, setValidName] = useState(true);
  const [validImage, setValidImage] = useState(true);

  const { assets } = useSelector(state => state.app);
  const [activeAssets, setActiveAssets] = useState([]);
  const { network } = useSelector(state => state.app);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState(1);
  const [isFixed, setIsFixed] = useState(true);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [curAsset, setCurAsset] = useState(activeAssets[0]);
  const [curFreq, setCurFreq] = useState("Conitinual");

  const FilterAssets = () => {
    const filter = _.filter(assets, i => i.network === network);
    setActiveAssets(filter);
    setCurAsset(filter[0]);
  };

  useEffect(() => {
    FilterAssets();
  }, []);

  const CopiedText = () => {
    if (copy === "Link copied") return;
    setCopy("Link copied");
    setTimeout(() => setCopy("Copy link"), 2000);
  };

  const handleSubmit = () => {
    if (!curAsset?.asa_id) return;
    if (!name) {
      setValidName(false);
      return;
    } else {
      setValidName(true);
    }

    dispatch(
      CreateNewLink({
        name,
        image,
        description,
        fileName: image?.name,
        asset: curAsset?.asa_id,
        amount: amount.toString(),
        has_fixed_amount: !!isFixed,
        is_one_time: !(curFreq === "Continual"),
      })
    );
  };

  const handleChange = e => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    setImage(e.target.files[0]);
    reader.onload = readerEvent => {
      setPreview(readerEvent.target.result);
    };
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
          <div className="logo_img" onClick={() => imageRef.current.click()}>
            {!preview ? (
              <AppIcons type="flashpay" />
            ) : (
              <img src={preview} alt="" />
            )}
          </div>
          <input
            ref={imageRef}
            hidden
            onChange={handleChange}
            type="file"
            multiple={false}
            accept="image/*"
          />
          <div className="edit_img" onClick={() => imageRef.current.click()}>
            Edit image
          </div>
          {!validImage ? (
            <div className="warning_text">
              <p>Select an image to continue</p>
            </div>
          ) : null}
        </div>

        <div className="generate_link_form">
          <div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name of link"
            />
            {!validName ? (
              <div className="warning_text">
                <p>Please provide a name with minimum length of 3</p>
              </div>
            ) : null}
          </div>

          <TextareaAutosize
            minRows={2}
            maxRows={2}
            value={description}
            className="textarea"
            placeholder="Description of link"
            onChange={e => setDescription(e.target.value)}
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
                assets={activeAssets}
                type="assets-list"
                curOption={curAsset}
                setCurOption={setCurAsset}
              />
              <input
                type="number"
                min={0}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
          ) : (
            <div className="form_row contain">
              <SelectMenu
                assets={activeAssets}
                type="assets-list"
                curOption={curAsset}
                setCurOption={setCurAsset}
              />
            </div>
          )}

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
        <button className="continue_button" onClick={handleSubmit}>
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
