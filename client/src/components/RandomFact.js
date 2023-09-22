import React, { useState } from "react";
import { Styles } from "react-modal";
import styles from "./LandingModal.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RandomFact = ({randomFacts}) => {
  
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const commentList = randomFacts.map(fact => fact.comment)

  const randomFact = commentList[Math.floor(Math.random()*commentList.length)];
  const randomFact2 = commentList[Math.floor(Math.random()*commentList.length)];

  const [isOpen, setIsOpen] = useState(true);
  const [fact, setFact] = useState(commentList[randomFact]);

  // const changeFact = () => {
  //   setFact(randomFact);
  //   if (fact ==! randomFact) {
  //     setFact(randomFact);
  //     return fact
  //   } else if (fact ==! randomFact2) {
  //     setFact(randomFact);
  //     return fact
  //   } else if (fact === randomFact) {
  //     setFact(randomFact2);
  //     return fact
  //   } else if (fact === randomFact2) {
  //     setFact(randomFact);
  //     return fact
  //   }
  // }

  const changeFact = () => {
    setFact(randomFact);
    if (randomFact !== fact) {
      setFact(randomFact);
      return fact
    }
    setFact(randomFact2);
    return fact
  }

  return (
    <div>
      <li>
        <a href="javascript:void(0)" onClick={toggleModal}>
          Did you know?
        </a>
      </li>
      <Modal isOpen={!isOpen}
        onRequestClose={toggleModal}
        contentLabel="modal"
        className="landing-modal-content"
      >
        <button type="button"
        onClick={toggleModal}
        className="landing-modal-close-button"
        >
          &times;
        </button>
        <h3>Did you know...?</h3>
        <p>{fact}</p>
        <br />
        <button type="button"
          onClick={changeFact} className="landing-modal-button"
        >
          Give me another!
        </button>
      </Modal>
    </div>
  );
}

export default RandomFact;
