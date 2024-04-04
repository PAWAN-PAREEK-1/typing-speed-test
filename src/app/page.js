// pages/index.js
"use client"
import { useState } from 'react';
import TypingTest from './components/TypingTest';

const getRandomParagraph = () => {
  // Function to generate random paragraph
  // You can modify this as per your requirements
  const words = ['apple', 'banana', 'orange', 'grape', 'kiwi']; // Example words
  const paragraph = Array.from({ length: 100 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
  return paragraph;
};

const Home = () => {
  const [paragraph] = useState(getRandomParagraph());
  const [typingComplete, setTypingComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);

  const handleTypingComplete = () => {
    setTypingComplete(true);

    // Calculate accuracy and typing speed
    const correctChars = paragraph.length;
    const typedChars = inputValue.length;
    const correctTypedChars = inputValue.split('').filter((char, index) => char === paragraph[index]).length;
    const accuracyPercentage = (correctTypedChars / correctChars) * 100;
    const timeTakenInSeconds = 1; // You can calculate this based on user's typing speed
    const typingSpeedCharsPerMinute = (typedChars / timeTakenInSeconds) * 60;

    setAccuracy(accuracyPercentage.toFixed(2));
    setTypingSpeed(typingSpeedCharsPerMinute.toFixed(2));
  };

  return (
    <div className='' >
      {typingComplete ? (
        <div>
          <h1  >Typing Speed Test Results</h1 >
          <p>Accuracy: {accuracy}%</p>
          <p>Typing Speed: {typingSpeed} characters per minute</p>
        </div>
      ) : (
        <TypingTest paragraph={paragraph} onComplete={handleTypingComplete} />
      )}
    </div>
  );
};

export default Home;
