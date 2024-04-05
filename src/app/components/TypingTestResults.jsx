// components/TypingTestResults.js
"use client"
import React from 'react';

const TypingTestResults = ({ accuracy, typingSpeed }) => {
  return (
    <div>
      <h1>Typing Speed Test Results</h1>
      <p>Accuracy: {accuracy}%</p>
      <p>Typing Speed: {typingSpeed} characters per minute</p>
    </div>
  );
};

export default TypingTestResults;
