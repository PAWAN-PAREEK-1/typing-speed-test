import React, { useState, useEffect, useRef } from 'react';
import '../globals.css';

const TypingTest = ({ paragraph, onComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [wrongLetters, setWrongLetters] = useState([]);
  const [completedWords, setCompletedWords] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const paragraphRef = useRef(null);

  useEffect(() => {
    paragraphRef.current.focus();
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (completedWords > 0 && startTime) {
      const endTime = Date.now();
      const timeInSeconds = (endTime - startTime) / 1000;
      const wordsPerSecond = completedWords / timeInSeconds;
      const wordsPerMinute = wordsPerSecond * 60;
      setTypingSpeed(wordsPerMinute.toFixed(2));
    }
  }, [completedWords, startTime]);

  const handleKeyDown = (e) => {
    const { key } = e;

    if (/^[a-zA-Z\s]$/.test(key)) {
      const updatedTypedText = typedText + key;

      if (key === ' ' && typedText.trim() !== '') {
        setCompletedWords((prevCount) => prevCount + 1);
      }

      if (updatedTypedText.length === paragraph.length) {
        return onComplete(updatedTypedText, Date.now() - startTime, typingSpeed); // Pass typing speed
      }

      if (key !== paragraph[typedText.length] && key !== ' ') {
        setWrongLetters([...wrongLetters, typedText.length]);
      }

      setTypedText(updatedTypedText);
    }
  };

  const getLetterColor = (index) => {
    if (index < typedText.length) {
      if (wrongLetters.includes(index) || (typedText[index] === ' ' && paragraph[index] !== ' ')) {
        return '#7e2a33';
      } else {
        return '#d1d0c5';
      }
    }
    return '#646669';
  };

  return (
<>
    
    <div
      style={{
        // backgroundColor: '#28292b',
       backgroundColor: '#28292b',
        color: 'white',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'column',
        alignItems: 'center',
        // wordWrap: 'break-word',
        // fontSize: '25px',
        // fontFamily: 'sans-serif',
        width: '100%',
      }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      ref={paragraphRef} className='maindiv'
    >
      <div className='heading'><h1>Please start typing</h1></div>
      
      <div style={{ width: '60%', textJustify: 'left' }} className="mainText typewriter">
        {paragraph.split('').map((letter, index) => (
          <span key={index} style={{
            color: getLetterColor(index),
            transition: 'color 0.3s ease' // Apply transition to color property
          }}>
            {letter}
            {index === typedText.length - 1 && <span className="cursor"></span>}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};

export default TypingTest;
