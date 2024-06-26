import React, { useState } from 'react';
import './styles/Dropdown.css'; // Asegúrate de crear este archivo para los estilos


const Dropdown = ({ options, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      onOptionSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div className="dropdown">
        <button onClick={handleToggle} className="dropdown-toggle">
          Select an option
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Dropdown;