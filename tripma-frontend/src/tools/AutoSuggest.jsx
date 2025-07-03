import React, { useState, useRef, useEffect } from 'react';

const AutoSuggest = ({
    placeholder,
    icon,
    suggestions = [],
    onSelect,
    className = ""
}) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionRefs = useRef([]);

    useEffect(() => {
        if (inputValue.length > 0) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
            setSelectedIndex(-1);
        } else {
            setShowSuggestions(false);
            setFilteredSuggestions([]);
        }
    }, [inputValue, suggestions]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setShowSuggestions(false);
        onSelect && onSelect(suggestion);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(filteredSuggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleBlur = (e) => {
        // Delay hiding suggestions to allow for click events
        setTimeout(() => {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }, 150);
    };

    return (
        <div className={`relative ${className}`}>
            <div className='flex items-center justify-evenly gap-2'>
                {icon && <div className='w-1/6'>{icon}</div>}
                <input
                    ref={inputRef}
                    type='text'
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocus={() => inputValue && setShowSuggestions(filteredSuggestions.length > 0)}
                    className='outline-0 text-[#6E7491] body-md w-5/6'
                />
            </div>

            {showSuggestions && (
                <div
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto"
                    style={{ borderTop: 'none' }}
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            ref={el => suggestionRefs.current[index] = el}
                            className={`px-4 py-2 cursor-pointer text-black hover:bg-gray-50 ${index === selectedIndex ? 'bg-[#605DEC] text-white' : ''
                                } ${index === filteredSuggestions.length - 1 ? 'rounded-b-md' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutoSuggest;