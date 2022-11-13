import HorLine from "./HorLine";
import { NavIcons } from "../svg";
import Vectors from "../svg/Vectors";
import { NavLink } from "react-router-dom";
import LogoutButton from "./Dropdown/logoutButton";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../features/modals/modalSlice";
import { closeSideTab, setTheme } from "../features/config/configSlice";

const SideTab = () => {
  const dispatch = useDispatch();
  const { theme, walletAddress, linkedStatus, openSidetab } = useSelector(
    state => state.config
  );

  const ConnectWallet = () => {
    dispatch(connectWallet());
  };

  const CloseTab = () => {
    dispatch(closeSideTab());
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));

    if (theme === "dark") {
      localStorage.theme = "light";
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      localStorage.theme = "dark";
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <>
      <div className="sidetab_overlay" data-open-tab={openSidetab}>
        <div className="sidetab_container">
          <a
            target="blank"
            href="https://flashpay.finance/"
            className="app_logo"
          >
            <Vectors.logo dark={theme === "dark"} />
          </a>

          {!!walletAddress ? (
            <LogoutButton walletAddress={walletAddress} />
          ) : (
            <button
              className="connect_wallet"
              onClick={() => {
                ConnectWallet();
                CloseTab();
              }}
            >
              <img src="img/icons/add_wallet.svg" alt="" />
              <p>Connect wallet</p>
            </button>
          )}

          <div className="nav_link_theme">
            <div className="nav_links">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="home" />
                <p>Home</p>
              </NavLink>

              {!linkedStatus ? (
                <NavLink
                  to="/setup"
                  className={({ isActive }) => {
                    return isActive ? "isActive" : undefined;
                  }}
                  onClick={CloseTab}
                >
                  <NavIcons type="setup" />
                  <p>Set up</p>
                </NavLink>
              ) : null}

              <HorLine pad={44} />

              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="transactions" />
                <p>Transactions</p>
              </NavLink>

              <NavLink
                to="/payment-links"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="paymentlinks" />
                <p>Payment links</p>
              </NavLink>

              <HorLine pad={44} />

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="settings" />
                <p>Settings</p>
              </NavLink>
            </div>

            <div className="theme_block">
              <HorLine pad={44} />
              <div className="theme_config">
                <p>Dark mode</p>
                <button
                  className="dark-mode-switch"
                  data-move={theme === "dark"}
                  onClick={toggleTheme}
                >
                  <div className="dark-mode-switch__toggle" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overlay" onClick={CloseTab} />
      </div>
    </>
  );
};

export default SideTab;
