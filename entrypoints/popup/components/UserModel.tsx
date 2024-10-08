import React, { useState, useEffect } from "react";
import { GenerateIcon, REGenerateIcon, InsertIcon } from "./Icons";
import { MdGTranslate } from "react-icons/md";
import LanguageDropdown from "./LanguageDropdown";

interface UserModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModel: React.FC<UserModelProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [isReqSend, setIsReqSend] = useState<boolean>(false);
  const [isRes, setIsRes] = useState<boolean>(false);
  const [req, setReq] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [language, setLanguage] = useState<string>("spanish");

  useEffect(() => {
    if (!isOpen) {
      // Reset states when the UserModel is closed
      setInput("");
      setIsReqSend(false);
      setIsRes(false);
      setReq("");
      setTranslation(""); // Reset translation on close
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTranslate = async () => {
    console.log("Translate");
    const responseText =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  
    // Create a language map to convert language names to codes
    const languageMap: { [key: string]: string } = {
      English: "en",
      Spanish: "es",
      French: "fr",
      German: "de",
      Hindi: "hi",
      Chinese: "zh",
      Japanese: "ja",
    };


    try {
      const res = await fetch(
        "https://icy-sky-a6bb.rihanmulani18.workers.dev/translateDocument",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData: responseText,
            targetLang: languageMap[language], // Convert language to its code
          }),
        }
      ).then((res) => res.json());
    
      const data = JSON.stringify(res);
      console.log(language, "this is selected");
    
      console.log(data);
    
      if (data.includes("translated_text")) {
        const translatedText = JSON.parse(data).translated_text;
        console.log(translatedText);
        setTranslation(translatedText);
      }
    } catch (error) {
      console.error("Error during translation", error);
    }
    

  
  
  };


  const handleLanguageSelect = (lang: string) => {
    
    setLanguage(lang);
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent the focus event from bubbling up
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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

  const handleInsert = () => {
    const messageInput = document.querySelector(
      ".msg-form__msg-content-container .msg-form__contenteditable p"
    ) as HTMLElement;
    const messagePlaceholder = document.querySelector(
      ".msg-form__msg-content-container .msg-form__placeholder"
    ) as HTMLElement;
    const sendButton = document.querySelector(".msg-form__send-button");

    messagePlaceholder?.classList.remove("msg-form__placeholder");
    sendButton?.removeAttribute("disabled");

    if (messageInput) {
      // Use the translation or default response if no translation
      messageInput.innerText =
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

      const focusEvent = new Event("focus", { bubbles: true });
      messageInput.dispatchEvent(focusEvent);
      messageInput.focus();
    }

    onClose();
  };

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
          <div className="flex justify-end mb-5">
            <p className="bg-[#DFE1E7] p-4 rounded-xl text-gray-500 w-8/12 text-[1.37rem]">
              {req}
            </p>
          </div>
        )}

        {isRes && (
          <div className="flex justify-start mb-5">
            <p className="bg-[#DBEAFE] p-4 rounded-xl text-gray-500 w-10/12 text-[1.37rem]">
              Thank you for the opportunity! If you have any more questions or
              if there's anything else I can help you with, feel free to ask.
            </p>
          </div>
        )}

        <div className="mt-2 mb-2 ">
          {translation && (
            <div className="flex justify-start mb-5">
              <p className="bg-[#DBEAFE] p-4 rounded-xl text-gray-500 w-10/12 text-[1.37rem]">
                {translation}
              </p>
            </div>
          )}

         

        <div>
          <input
            style={{ borderRadius: "8px", height: "40px" }}
            value={input}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            placeholder="Your prompt"
            type="text"
          />
        </div>

          { isRes ? <div className="p-5">
            <h1 className="text-xl font-semibold mt-4">Select a Language</h1>
            <LanguageDropdown onSelect={handleLanguageSelect} />
          </div> : <div></div>
               } 

        </div>  

        <div className="flex justify-end mt-6">
          {!isReqSend ? (
            <button onClick={handleGenerateRes}>
              <GenerateIcon />
            </button>
          ) : (
            <div className="flex">
              <button onClick={handleInsert} className="mr-4">
                <InsertIcon />
              </button>
              <button disabled className="cursor-not-allowed">
                <REGenerateIcon />
              </button>

              <button
                type="button"
                onClick={handleTranslate}
                className="inline-flex items-center justify-center mt-1 px-10 h-14 ml-2 text-md font-medium text-white  bg-blue-500 rounded-md border border-gray-200 hover:text-white"
              >
                <MdGTranslate className="mr-2" />
                Translate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModel;
