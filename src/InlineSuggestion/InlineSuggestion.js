import React, { useEffect, useRef, useState } from "react";

function InlineSuggestion({ value, suggestion, onValueChange }) {
  const [showSuggestion, setShowSuggestion] = useState(true);
  const timeRef = useRef(null);

  const onTextAreaChange = (value) => {
    onValueChange(value);
    setShowSuggestion(false);
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      setShowSuggestion(true);
    }, 400);
  };

  const onTabPress = (e) => {
    if (e.key == "Tab") {
      onTextAreaChange(value + " " + suggestion);
      e.preventDefault();
    }
  };

  return (
    <div
      className="inline-container"
      style={{
        position: "relative",
        boxSizing: "border-box",
        height: "200px",
        width: "500px",
      }}
    >
      <div
        className="suggestion-container"
        style={{
          position: "absolute",
          margin: "0px",
          padding: "4px",
          fontSize: "18px",
          fontFamily: "sans-serif",
          border: "1px solid",
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
          color: "lightgray",
        }}
      >
        <span
          style={{
            whiteSpace: "pre-wrap",
            visibility: "hidden",
            color: "transparent",
          }}
        >
          {value}
        </span>
        {suggestion.length && showSuggestion ? (
          <span>{" " + suggestion}</span>
        ) : null}
      </div>
      <textarea
        className="input-area"
        value={value}
        onChange={(e) => {
          onTextAreaChange(e.target.value);
        }}
        onKeyDown={onTabPress}
        style={{
          position: "absolute",
          margin: "0px",
          padding: "4px",
          fontSize: "18px",
          fontFamily: "sans-serif",
          border: "1px solid",
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}

const list = ["mitul", "adroja", "joshi", "pooja", "patel"];

const InlineSuggestionContainer = () => {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const timeRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSuggestion("");
      if (timeRef.current) clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        let random = Math.floor(Math.random() * (list.length - 1));
        let randomSuggestion = list[random];
        console.log({ randomSuggestion });
        setSuggestion(randomSuggestion);
      }, 1500);
    } else {
      setSuggestion("");
    }
  }, [value]);

  return (
    <div>
      <InlineSuggestion
        value={value}
        suggestion={suggestion}
        onValueChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
};

export default InlineSuggestionContainer;
