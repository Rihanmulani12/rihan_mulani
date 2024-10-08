import React, { useState } from 'react';

interface LanguageOption {
  name: string;
}

const languages: LanguageOption[] = [
  { name: 'English' },
  { name: 'Spanish' },
  { name: 'French' },
  { name: 'German' },
  { name: 'Hindi' },
  { name: 'Chinese' },
  { name: 'Japanese' },
  // Add more languages as needed
];

const LanguageDropdown: React.FC<{ onSelect: (lang: string) => void }> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Select Language');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (language: LanguageOption) => {
    setSelectedLanguage(language.name);
    onSelect(language.name); // Call onSelect with the selected language name
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700"
          onClick={toggleDropdown}
        >
          {selectedLanguage }
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4 3.5a.75.75 0 01-1.06 0l-4-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-blue-200 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {languages.map((language, index) => (
              <button
                key={index} // Use index as key (for demo purposes; ideally, use a unique identifier)
                onClick={() => handleSelect(language)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
