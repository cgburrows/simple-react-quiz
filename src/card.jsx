import React from "react";
import styled, { keyframes } from "styled-components";

const fadeLeft = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  40% {
    transform: rotate(-45deg);
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(-1000px, 120%);
    opacity: 0;
  }
`;

const fadeRight = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  40% {
    transform: rotate(45deg);
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(1000px, 120%);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  padding: 18px;
  display: flex;

  justify-content: center;
  align-items: center;
  text-align: center;

  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  width: 250px;
  height: 110px;

  border-radius: 25px;
  
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
  z-index: ${({ length, id }) => length - id};

  &:hover {
    cursor: help;
  }

  &.no {
    animation: ${fadeLeft} .8s ease-in-out;
    transform: translate(-1000px, 120%);
  }

  &.yes {
    animation: ${fadeRight} .8s ease-in-out;
    transform: translate(1000px, 120%);
  }
`;

const getClassName = (y, n) => {
  if (y) {
    return "yes";
  } else if (n) {
    return "no";
  }
  return "";
};

class Card extends React.Component {
  render() {
    const { question, id, isYes, isNo, length } = this.props;

    return (
      <Wrapper length={length} id={id} className={getClassName(isYes, isNo)}>
        {question}
      </Wrapper>
    );
  }
}

export default Card;
