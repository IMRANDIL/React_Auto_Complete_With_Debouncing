import React, { useState, useEffect } from "react";
import Trie from "../Trie/Trie";
import useDebounce from "../customHook/UseDebounce";

const Autocomplete = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const trieRef = React.useRef(new Trie()); // Use a ref to keep the Trie instance constant across renders

  // Example: Insert words into the trie
  const words = ["apple", "app", "apricot", "banana", "bat", "love"];
  words.forEach((word) => trieRef.current.insert(word));

  const debouncedInput = useDebounce(input, 500); // Adjust the debounce time as needed

  useEffect(() => {
    // Get autocomplete suggestions from the trie using debouncedInput
    const autocompleteSuggestions = trieRef.current.search(debouncedInput);
    setSuggestions(autocompleteSuggestions);

  }, [debouncedInput, trieRef, setSuggestions]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions before selecting one
  };

  return (
    <div className="container">
      <h1>Autocomplete App</h1>
      <input
        type="text"
        placeholder="Type here..."
        value={input}
        onChange={handleInputChange}
      />
      <ul>
        {debouncedInput &&
          suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
