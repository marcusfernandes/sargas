import React, { useState } from 'react';
import {
  FaSlidersH,
  FaCircleNotch,
  FaAngleDown,
  FaAngleUp,
  FaUser,
} from 'react-icons/fa';
import { Container, MenuItem, SubMenu } from './styles';

export default function Menu() {
  const iconSize = 15;
  // const [toggleMenu, setToggleMenu] = useState(false);

  // function handleSubMenu() {
  //   setToggleMenu(!toggleMenu);
  // }

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <MenuItem to="/">
              <span>
                <FaSlidersH size={iconSize} />
              </span>
              Dashbord
            </MenuItem>
          </li>
          {/* Menu com submenu */}
          {/* <li>
            <MenuItem onClick={handleSubMenu}>
              <span>
                <FaSlidersH size={20} />
              </span>
              Produtos
              <div>{toggleMenu ? <FaAngleUp /> : <FaAngleDown />}</div>
            </MenuItem>
            <SubMenu active={toggleMenu}>
              <li>
                <MenuItem to="/">
                  <span>
                    <FaCircleNotch size={10} />
                  </span>
                  Produtos
                </MenuItem>
              </li>
            </SubMenu>
          </li> */}
          <li>
            <MenuItem to="/usuarios">
              <span>
                <FaUser size={iconSize} />
              </span>
              Usuários
            </MenuItem>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
