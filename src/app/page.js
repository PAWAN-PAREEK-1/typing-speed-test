"use client"
import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import TypingTestResults from './components/TypingTestResults';

const AVERAGE_CHARS_PER_WORD = 5; // Assuming an average word length of 5 characters

const getRandomParagraph = () => {
  const words = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
  const paragraph = Array.from({ length: 10 }, () => words[Math.floor(Math.random() * words.length)]);
  return paragraph.join(' ');
};

const Home = () => {
  const [paragraph, setParagraph] = useState(getRandomParagraph());
  const [typingComplete, setTypingComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [typingSpeedTest, setTypingSpeedTest] = useState(0); // Renamed typingSpeed to typingSpeedTest

  const handleTypingComplete = (inputValue, timeTaken, typingSpeed) => {
    setTypingComplete(true);
  
    // Calculate accuracy logic...
    const correctWordsCount = inputValue.trim().split(/\s+/).filter((word, index) => word === paragraph.split(' ')[index]).length;
    const accuracyPercentage = (correctWordsCount / paragraph.split(' ').length) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));

    setTypingSpeedTest(typingSpeed); // Set typingSpeedTest using the passed typingSpeed
  };
  
  const handleRestart = () => {
    setTypingComplete(false);
    setAccuracy(0);
    setParagraph(getRandomParagraph());
  };

  return (
    <div>
      {typingComplete ? (
        <TypingTestResults accuracy={accuracy} typingSpeed={typingSpeedTest} handleRestart={handleRestart} />
      ) : (
        <TypingTest paragraph={paragraph} onComplete={handleTypingComplete} />
      )}
    </div>
  );
};

export default Home;

