"use client"
// pages/index.js
import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import TypingTestResults from './components/TypingTestResults';

const AVERAGE_CHARS_PER_WORD = 5; // Assuming an average word length of 5 characters

const getRandomParagraph = () => {
  const words = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
  const paragraph = Array.from({ length: 10 }, () => words[Math.floor(Math.random() * words.length)]);
  return paragraph.join(' ');
};

const Home = ({}) => {
  const [paragraph, setParagraph] = useState(getRandomParagraph());
  const [typingComplete, setTypingComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);

  const handleTypingComplete = (inputValue, timeTaken) => {
    setTypingComplete(true);
  
    const typedWords = inputValue.trim().split(/\s+/); // Split typed text into words
    const typedWordCount = typedWords.length;
  
    if (timeTaken === 1) {
      setTypingSpeed(0); // Prevent division by zero
    } else {
      const typingSpeedWPM = (typedWordCount / (timeTaken / 1000)) * 60; // Convert timeTaken to seconds and calculate WPM
      setTypingSpeed(typingSpeedWPM.toFixed(2)); // Set typing speed, rounded to 2 decimal places
    }
  
    // Calculate accuracy
    const correctWords = paragraph.split(' ');
    const correctTypedWords = typedWords.filter((word, index) => word === correctWords[index]).length;
    const accuracyPercentage = (correctTypedWords / correctWords.length) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));
  };
  

  const handleRestart = () => {
    setTypingComplete(false);
    setAccuracy(0);
    setTypingSpeed(0);
    setParagraph(getRandomParagraph());
  };

  return (
    <div>
      {typingComplete ? (
        <div>
          <TypingTestResults accuracy={accuracy} typingSpeed={typingSpeed} />
          <button onClick={handleRestart}>Restart Typing</button>
        </div>
      ) : (
        <TypingTest paragraph={paragraph} onComplete={handleTypingComplete} />
      )}
    </div>
  );
};

export default Home;