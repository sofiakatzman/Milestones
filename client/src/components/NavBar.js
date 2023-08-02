// this component was not created by me. This was to fix a premade navigation bar npm package that was missing an import
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime"
import { useState } from 'react'
import styled from 'styled-components'

const NavBar = (props) => {
  // if user did not enter side, or entered invalid string, default to left
  const side = (props.side !== 'left' && props.side !== 'right') ? 'left' : props.side
  const bgColor = props.bgColor || 'black'
  const hamColorClosed = props.hamColorClosed || 'black'
  const hamColorOpen = props.hamColorOpen || 'white'
  let burgerSize = props.burgerSize || DEFAULT_BURGER_SIZE
  if (burgerSize > MAX_BURGER_SIZE)
    burgerSize = MAX_BURGER_SIZE
  if (burgerSize < MIN_BURGER_SIZE)
    burgerSize = MIN_BURGER_SIZE
  
  const toggleHamburger = () => {
    props.setNavExpanded(!props.navExpanded)
  }
  
  return (
    <_Fragment>
      <BurgerBox side={side}>
        <svg onClick={toggleHamburger} viewBox="0 0 100 100" width={`${burgerSize}`}>
          <rect
            fill={props.navExpanded ? hamColorOpen : hamColorClosed}
            stroke={props.navExpanded ? hamColorOpen : hamColorClosed}
            width="80"
            height="8"
            x="10"
            rx="2"
            style={props.navExpanded ? styleRect1AfterClick : styleRect1BeforeClick}
          />
          <rect
            fill={props.navExpanded ? hamColorOpen : hamColorClosed}
            stroke={props.navExpanded ? hamColorOpen : hamColorClosed}
            width="80"
            height="8"
            x="10"
            y="45"
            rx="2"
            style={props.navExpanded ? styleRect2AfterClick : styleRect2BeforeClick}
          />
          <rect
            fill={props.navExpanded ? hamColorOpen : hamColorClosed}
            stroke={props.navExpanded ? hamColorOpen : hamColorClosed}
            width="80"
            height="8"
            x="10"
            y="65"
            rx="2"
            style={props.navExpanded ? styleRect3AfterClick : styleRect3BeforeClick}
          />
        </svg>
      </BurgerBox>

      <Navigation side={side} bgColor={bgColor} navExpanded={props.navExpanded}>
        <UnorderedList>
          {Array.isArray(props.children)
            ? props.children.map((element) => <li key={Math.random()*2000}>{element}</li>)
            : props.children}
        </UnorderedList>
      </Navigation>
    </_Fragment>
  )
}

const DEFAULT_BURGER_SIZE = 35
const MIN_BURGER_SIZE = 20
const MAX_BURGER_SIZE = 50

const styleRect1BeforeClick = {
  y: 25,
  transition: "rotate 300ms ease-in, y 300ms ease-in 300ms",
  transformOrigin: "center",
};

const styleRect1AfterClick = {
  y: 45,
  rotate: "45deg",
  transition: "y 300ms ease-in, rotate 300ms ease-in 300ms",
  transformOrigin: "center",
};

const styleRect2BeforeClick = {
  y: 45,
  opacity: 100,
  transition: "opacity 300ms ease-in 300ms",
};

const styleRect2AfterClick = {
  y: 45,
  opacity: 0,
  transition: "transition-opacity 300ms ease-in",
};

const styleRect3BeforeClick = {
  y: 65,
  transition: "rotate 300ms ease-in, y 300ms ease-in 300ms",
  transformOrigin: "center",
};

const styleRect3AfterClick = {
  y: 45,
  rotate: "-45deg",
  transition: "y 300ms ease-in, rotate 300ms ease-in 300ms",
  transformOrigin: "center",
};

const BurgerBox = styled.div`
  z-index: 50;
  position: fixed;
  top: 15px;
  ${props => props.side}: 15px;
`;

const Navigation = styled.nav`
  position: fixed;
  ${props => {
    if (!props.navExpanded) {
      return props.side === 'left' ? 'transform: translateX(-100%)' : 'transform: translateX(100%)';
    }
  }};
  right: 0px;
  z-index: 30;
  top: 0px;
  bottom: 0px;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0px 0.5rem;
  background-color: #47514f;
  min-width: 20%;
  width: fit-content;

  @media (min-width: 768px) {
    min-width: 13%;
  }
`;

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-items: start;
  gap: 1rem;
  padding: 0px;
  margin-top: 1.5rem;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  list-style: none;
`;

export default NavBar;
