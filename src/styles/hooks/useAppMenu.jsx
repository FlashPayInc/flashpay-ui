import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";

const useAppMenu = (items, onUpdate, defaultOption = null) => {
  const { network } = useSelector(state => state.app);
  const [activeOption, setActiveOption] = useState(defaultOption || items[0]);

  const filterItems = () => {
    const option = items.find(item => item.network === network);
    setActiveOption(option);
  };

  useEffect(() => {
    if (!activeOption) filterItems();
  }, [items]);

  useEffect(() => {
    if (!isNaN(activeOption?.asa_id) && activeOption.network === network) {
      onUpdate(activeOption?.asa_id);
    }
  }, [activeOption]);

  useEffect(() => {
    filterItems();
  }, [network]);

  const AppMenu = ({ children }) => {
    return (
      <div className="app-menu__container">
        <Menu
          align="start"
          transition
          menuButton={children}
          menuClassName="app-menu"
          onItemClick={e => setActiveOption(e.value)}
        >
          {items?.map((slug, ind) => {
            return (
              slug?.network === network && (
                <MenuItem
                  key={ind}
                  value={slug}
                  className="menu-item"
                  data-active={slug === activeOption}
                >
                  <img src={slug?.image_url} alt="" />
                  <p>{slug?.short_name}</p>
                </MenuItem>
              )
            );
          })}
        </Menu>
      </div>
    );
  };

  return [AppMenu, activeOption];
};

export default useAppMenu;
