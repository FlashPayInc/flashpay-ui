import { AppIcons } from "../svg";
import { useDispatch } from "react-redux";
import TxnsFilters from "./Dropdown/txnFilters";
import LinkFilters from "./Dropdown/linkFilters";
import { generateLink } from "../features/modals/modalSlice";

const TopBar = ({ sub, data, main, filter, generate, copyLink }) => {
  const dispatch = useDispatch();

  return (
    <div className="top_bar">
      <div className="main">
        <p className="bar_title">{main}</p>

        <div className="bar_buttons">
          {filter ? (
            data === "transactions" ? (
              <TxnsFilters />
            ) : (
              <LinkFilters />
            )
          ) : null}
          {generate ? (
            <button
              className="generate_link"
              onClick={() => dispatch(generateLink())}
            >
              <AppIcons type="generatelink" />
              <p>Generate link</p>
            </button>
          ) : null}
          {copyLink ? (
            <button className="copy_button">
              <AppIcons type="copy-link" />
              <p>Copy Link</p>
            </button>
          ) : null}
        </div>
      </div>
      <div className="sub">{sub}</div>
    </div>
  );
};

export default TopBar;
