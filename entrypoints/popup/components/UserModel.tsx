import React, { useState, useEffect } from 'react';
import { GenerateIcon, REGenerateIcon, InsertIcon } from './Icons';
interface UserModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModel: React.FC<UserModelProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [isReqSend, setIsReqSend] = useState<boolean>(false);
  const [isRes, setIsRes] = useState<boolean>(false);
  const [req, setReq] = useState<string>("");
  
  useEffect(() => {
    if (!isOpen) {
      // Reset states when the UserModel
     
      setInput("");
      setIsReqSend(false);
      setIsRes(false);
      setReq("");
      
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent the focus event from bubbling up
  };

  //handling the input change in UserModel

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //handle the generate button 
  const handleGenerateRes = () => {
    if (input.trim() !== "") {
      setIsReqSend(true);
      setReq(input);
      setInput("");
   
      setTimeout(() => {
        setIsRes(true);
        
      }, 1000);
    }
  };

  //handling insert button
  const handleInsert = () => {

    //response text
    const responseText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

    //messageInpput accessing
    const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable p') as HTMLElement;

    //placeholder of linkedin message field 
    const messagePlaceholder = document.querySelector(".msg-form__msg-content-container .msg-form__placeholder") as HTMLElement;

    // send button which is disabled we can make it enable
    const sendButton = document.querySelector('.msg-form__send-button');

    //to remove the placeholder
    messagePlaceholder?.classList.remove('msg-form__placeholder')
    sendButton?.removeAttribute('disabled')
    
    if (  messageInput) {
      messageInput.innerText = responseText;
      // Create a focus event
    const focusEvent = new Event('focus', { bubbles: true });
    
    // Dispatch the focus event
    messageInput.dispatchEvent(focusEvent);

    // Focus the message input explicitly
    messageInput.focus();
  
      
    }
    // Close the UserModel
   
    onClose();
  };

  const response: string = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-[#575757a7] lg:w-[29vw] w-[50vw] sm:ml-[30rem] lg:-ml-20"
        onClick={(e) => e.stopPropagation()}
      >
        {isReqSend && (
          <div className='flex justify-end mb-5'>
            <p className='bg-[#DFE1E7] p-4 rounded-xl text-gray-500 w-8/12 text-[1.37rem]'>{req}</p>
          </div>
        )}
    
        {isRes && (
          <div className='flex justify-start mb-5'>
            <p className='bg-[#DBEAFE] p-4 rounded-xl text-gray-500 w-10/12 text-[1.37rem]'>{response}</p>
          </div>
        )}

        <div>
          <input style={{borderRadius: "8px", height: "40px"}}
            value={input}
            onFocus={handleInputFocus}
            className=''
            onChange={handleInputChange}
            placeholder='Your prompt'
            type="text"
          />
        </div>

        <div className='flex justify-end mt-6'>
          {!isReqSend ? (
            <button onClick={handleGenerateRes}>
              <GenerateIcon />
            </button>
          ) : (
            <div className='flex'>
              <button onClick={handleInsert} className='mr-4'>
                <InsertIcon />
              </button>
              <button disabled className='cursor-not-allowed'>
                <REGenerateIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default UserModel;
