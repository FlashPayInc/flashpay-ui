import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";

const usePeriodMenu = onUpdate => {
  const [activeOption, setActiveOption] = useState("30d");

  useEffect(() => {
    onUpdate(activeOption);
  }, [activeOption]);

  const PeriodMenu = ({ children }) => {
    return (
      <div className="app-menu__container">
        <Menu
          align="end"
          transition
          menuButton={children}
          menuClassName="app-menu"
          onItemClick={e => setActiveOption(e.value)}
        >
          <MenuItem
            value={"30d"}
            className="menu-item"
            data-active={activeOption === "30d"}
          >
            <p>Last 30 days</p>
          </MenuItem>
          <MenuItem
            value={"6m"}
            className="menu-item"
            data-active={activeOption === "6m"}
          >
            <p>Last 6 months</p>
          </MenuItem>
          <MenuItem
            value={"year"}
            className="menu-item"
            data-active={activeOption === "year"}
          >
            <p>This year</p>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return [PeriodMenu, activeOption];
};

export default usePeriodMenu;
