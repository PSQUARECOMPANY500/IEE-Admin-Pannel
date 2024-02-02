// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React, { useState } from "react";
import MembershipCard from "../MembershipSubComponent/MembershipCard";
import {
  warrentyDemoData,
  goldDemoData,
  platinumDemoData,
  silverDemoData,
} from "../MembershipSubComponent/MemvbershipDemoData";

const Membership = () => {
  const [setClick, click] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [cards, setCards] = useState([
    { DemoData: warrentyDemoData, order: 1, toggleOrder: 2, id: 1 },
    { DemoData: platinumDemoData, order: 2, toggleOrder: 1, id: 2 },
    { DemoData: goldDemoData, order: 3, toggleOrder: 1, id: 3 },
    { DemoData: silverDemoData, order: 4, toggleOrder: 1, id: 4 },
    { DemoData: "", order: 5, toggleOrder: 1, id: 5 },
  ]);

  const handleDoubleClick = (id) => {
    const clickedIndex = cards.findIndex((card) => card.id === id);
    const orderOneIndex = cards.findIndex((card) => card.order === 1);

    const updatedCards = [...cards];

    if (
      clickedIndex !== -1 &&
      orderOneIndex !== -1 &&
      orderOneIndex !== clickedIndex
    ) {
      // Swap the order of the front with the toggle order
      const clickedToggleIndex = updatedCards[clickedIndex].order;
      updatedCards[clickedIndex].order = updatedCards[clickedIndex].toggleOrder;
      updatedCards[clickedIndex].toggleOrder = clickedToggleIndex;

      // Swap the order of the clicked card with the toggle order
      const orderOneIndexToggle = updatedCards[orderOneIndex].order;
      updatedCards[orderOneIndex].order =
        updatedCards[orderOneIndex].toggleOrder;
      updatedCards[orderOneIndex].toggleOrder = orderOneIndexToggle;
    }

    setCards(updatedCards);
  };

  const handleGoingBack = () => {
    const updatedCards = [...cards];
    updatedCards.map((card, index) => {
      if (card.order === 1 && index !== 0) {
        const toggleNumber = card.toggleOrder;
        card.toggleOrder = card.order;
        card.order = toggleNumber;
      }
      if (index === 0 && card.order !== 1) {
        card.order = 1;
        card.toggleOrder = 2;
      }
      return card;
    });
    setCards(updatedCards);
    setClickCount(0);
    click(!setClick);
  };

  return (
    <div className="main-container">
      <div
        className={`membershipCards ${
          setClick ? `membershipCards_expand ` : ""
        } `}
      >
        <MembershipCard
          DemoData={cards[0].DemoData}
          order={cards[0].order}
          setClick={setClick}
          clickCount={clickCount}
          itemClick={() => {
            handleDoubleClick(1);
            setClickCount(1);
            click(true);
          }}
        />
        <MembershipCard
          DemoData={cards[1].DemoData}
          order={cards[1].order}
          setClick={setClick}
          clickCount={clickCount}
          itemClick={() => {
            handleDoubleClick(2);
            click(true);
            setClickCount(1);
          }}
        />
        <MembershipCard
          DemoData={cards[2].DemoData}
          order={cards[2].order}
          clickCount={clickCount}
          setClick={setClick}
          itemClick={() => {
            handleDoubleClick(3);
            click(true);
            setClickCount(1);
          }}
        />
        <MembershipCard
          DemoData={cards[3].DemoData}
          clickCount={clickCount}
          order={cards[3].order}
          setClick={setClick}
          itemClick={() => {
            handleDoubleClick(4);
            setClickCount(1);
            click(true);
          }}
        />
        {setClick && (
          <MembershipCard
            clickCount={clickCount}
            DemoData={cards[4].DemoData}
            order={cards[4].order}
            setClick={setClick}
            itemClick={() => {
              handleDoubleClick(5);
              setClickCount(1);
              click(true);
            }}
          />
        )}
      </div>
      <button
        onClick={() => {
          handleGoingBack();
        }}
      >
        {" "}
        Go Back{" "}
      </button>
    </div>
  );
};

export default Membership;
