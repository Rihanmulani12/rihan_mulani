import React, { useState, useRef } from 'react';
import { AIIcon } from "./components/Icons";
import Modal from "./components/UserModel";
import './style.css'
const App: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);

  };

  useEffect(() => {
    const checkActiveClass = () => {
      const messageContainer = document.querySelector('.msg-form__msg-content-container');

      //displaying the icon on this basis of active class
      if (messageContainer) {
        setIsActive(messageContainer.classList.contains('msg-form__msg-content-container--is-active'));
      }
    };

    // Initial check
    checkActiveClass();

    // Set up a mutation observer to listen for class changes
    const observer = new MutationObserver(checkActiveClass);
    const messageContainer = document.querySelector('.msg-form__msg-content-container');
    if (messageContainer) {
      observer.observe(messageContainer, { attributes: true });
    }

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);
  return (
    <>
      <div className="bg-black">
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
      <div onMouseDown={toggleModal} className='cursor-pointer' >
        {isActive && (<AIIcon />)}
      </div>
    </>
  );
}

export default App;
