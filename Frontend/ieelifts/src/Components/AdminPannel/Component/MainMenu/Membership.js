// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React, { useEffect, useState } from "react";
import MembershipCard from "../MembershipSubComponent/MembershipCard";
import { requestGetMemberShipDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";

const Membership = () => {
  const dispatch = useDispatch();
  const [setClick, click] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(requestGetMemberShipDataAction());
  }, [dispatch]);

  const membershipJon = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipDataActionReducer
    ) {
      return state?.AdminRootReducer?.requestGetMemberShipDataActionReducer;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (
      membershipJon &&
      membershipJon.membershipDetail &&
      membershipJon.membershipDetail.data
    ) {
    
      setCards([
        {
          DemoData: {
            dataType: "Warrenty",
            Data: membershipJon.membershipDetail.data[0],
          },
          order: 1,
          toggleOrder: 2,
          id: 1,
        },
        {
          DemoData: {
            dataType: "Platinum",
            Data: membershipJon.membershipDetail.data[1],
          },
          order: 2,
          toggleOrder: 1,
          id: 2,
        },
        {
          DemoData: {
            dataType: "Gold",
            Data: membershipJon.membershipDetail.data[3],
          },
          order: 3,
          toggleOrder: 1,
          id: 3,
        },
        {
          DemoData: {
            dataType: "Silver",
            Data: membershipJon.membershipDetail.data[2],
          },
          order: 4,
          toggleOrder: 1,
          id: 4,
        },
        { DemoData: "", order: 5, toggleOrder: 1, id: 5 },
      ]);
    } else {
      // Reset cards to an empty array if membershipJon is not available
      setCards([]);
    }
  }, [membershipJon]);

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
    if (clickCount === 1) {
      setClickCount(0);
    } else {
      setClickCount(1);
    }
    click(!setClick);
  };

  return (
    <div className="main-container">
      <div
        className={`membershipCards ${setClick ? `membershipCards_expand ` : "non_expand_gap"
          } `}
      >
        {cards &&
          cards.map((items, index) => {
            if (index === cards.length - 1) return null;

            return (
              <MembershipCard
                key={index}
                DemoData={items.DemoData}
                order={items.order}
                setClick={setClick}
                clickCount={clickCount}
                itemClick={() => {
                  handleDoubleClick(index + 1);
                  setClickCount(1);
                  click(true);
                }}
              />
            );
          })}
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
