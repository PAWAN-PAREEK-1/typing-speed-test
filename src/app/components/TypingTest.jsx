// components/TypingTest.js
import { useState, useEffect, useRef } from 'react';
import '../globals.css'

const TypingTest = ({ paragraph, onComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [wrongLetters, setWrongLetters] = useState([]);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Focus on the paragraph when the component mounts
    paragraphRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    
    // Check if the pressed key is a correct English letter or space
    if (/^[a-zA-Z\s]$/.test(key)) {
      const updatedTypedText = typedText + key;

      if (updatedTypedText === paragraph) {
        onComplete();
      }

      if (key !== paragraph[typedText.length] && key !== ' ') {
        setWrongLetters([...wrongLetters, typedText.length]);
      }

      setTypedText(updatedTypedText);
    }
  };

  const getLetterColor = (index) => {
    if (index < typedText.length) {
      if (wrongLetters.includes(index) && paragraph[index] !== ' ') {
        return 'red'; // Incorrect letter
      } else {
        return 'white'; // Correct letter
      }
    }
    return '#707274'; // Yet to be typed letter
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        wordWrap: 'break-word',
        fontSize: '25px',
        fontFamily: 'sans-serif',
        width: '100%',
      }}
      onKeyDown={handleKeyDown}
      tabIndex="0" // Allow div to be focusable
      ref={paragraphRef} // Reference to the paragraph
    >
      <div style={{ width: '60%',textJustify:"center" }} className='mainText'>
        {paragraph.split('').map((letter, index) => (
          <span key={index} style={{ color: getLetterColor(index)}}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingTest;
