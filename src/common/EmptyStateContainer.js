import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppIcons, Illustrations } from "../svg";
import { connectWallet, generateLink } from "../features/modals/modalSlice";

const EmptyStateContainer = ({ vector, text, link, type, buttonText }) => {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector(state => state.config);

  return (
    <div className="empty_state">
      <div className="illustration_cover">
        <Illustrations type={vector} />
      </div>
      <div className={`text ${type === "bold" ? "bold_text" : ""}`}>
        {parse(text, {
          replace: domNode => {
            if (domNode.attribs && domNode.attribs.id === "navlink") {
              return <NavLink to={link?.path}>{link?.text}</NavLink>;
            }
          },
        })}
      </div>
      {!!buttonText ? (
        <button
          onClick={() => {
            if (!!walletAddress) {
              dispatch(generateLink());
            } else {
              dispatch(connectWallet());
            }
          }}
        >
          <AppIcons type="generatelink" />
          <p>{buttonText}</p>
        </button>
      ) : null}
    </div>
  );
};

export default EmptyStateContainer;
