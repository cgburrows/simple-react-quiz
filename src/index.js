import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Card from "./card";

const cards = [
  { id: 1, question: "Does this app work?" },
  { id: 2, question: "Do you like the animations?" },
  { id: 3, question: "Are you a Cornell student?" },
  { id: 4, question: "Do you prefer the 'yes' button or the 'no' button?" },
  { id: 5, question: "Where are you from?" }
];

const Wrapper = styled.main`
  height: 98vh;
  background:  #fef5e7;
  position: relative;
  overflow: hidden;
`;

const Counter = styled.div`
  position: absolute;
  center: 10%;
  text-align: center;
  transform: translateX(-50%);
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 55%;
  left: 50%;
  transform: translateX(-50%);

  button {
    padding: 10px 25px;
    border: none;
    background: #fff;
    outline: 1px solid grey;
    margin: 7px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);

    &:hover {
      cursor: pointer;
      outline: 2px solid  #85c1e9;
      background: #ebf5fb;
    }

    &:back {
      display: block;
      margin: 12px auto;
      background: #ddd;
    }
  }
`;

class App extends React.Component {
  state = {
    cards,
    currentCardID: 1,
    yesCards: [],
    noCards: []
  };

  yes = () => {
    if (this.state.currentCardID === this.state.cards.length + 1) return;
    this.setState(state => ({
      currentCardID: state.currentCardID + 1,
      yesCards: [...state.yesCards, state.currentCardID]
    }));
  };

  no = () => {
    if (this.state.currentCardID === this.state.cards.length + 1) return;
    this.setState(state => ({
      currentCardID: state.currentCardID + 1,
      noCards: [...state.noCards, state.currentCardID]
    }));
  };

  isYes = id => this.state.yesCards.includes(id);
  isNo = id => this.state.noCards.includes(id);

  goBack = () => {
    const { currentCardID, cards, yesCards, noCards } = this.state;
    if (currentCardID === 1) return;
    const cardToRestore = currentCardID - 1;
    const newYesCards = yesCards.filter(c => c !== cardToRestore);
    const newNoCards = noCards.filter(c => c !== cardToRestore);

    this.setState({
      yesCards: newYesCards,
      noCards: newNoCards,
      currentCardID: cardToRestore
    });
  };

  render() {
    const { cards, currentCardID } = this.state;

    return (
      <Wrapper>
        {cards.map(({ id, question }) => (
          <Card
            key={id}
            id={id}
            question={question}
            length={cards.length}
            selectedCard={currentCardID}
            isYes={this.isYes(id)}
            isNo={this.isNo(id)}
          />
        ))}
        <Buttons>
          <button onClick={this.no}>No</button>
          <button onClick={this.yes}>Yes</button>
          <button onClick={this.goBack} className="back">
            Go back
          </button>
        </Buttons>
      </Wrapper>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
