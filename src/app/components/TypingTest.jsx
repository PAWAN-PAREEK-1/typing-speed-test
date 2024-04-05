import { useState, useEffect, useRef } from 'react';
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
      console.log('Typing Speed:', typingSpeed);
    }
  }, [completedWords, startTime]);

  const handleKeyDown = (e) => {
    const { key } = e;

    if (/^[a-zA-Z\s]$/.test(key)) {
      const updatedTypedText = typedText + key;

      if (key === ' ' && typedText.trim() !== '') {
        setCompletedWords((prevCount) => prevCount + 1);
        console.log('Completed words:', completedWords + 1);
      }

      if (updatedTypedText.length === paragraph.length) {
        console.log('Paragraph completed');
        return onComplete(updatedTypedText);
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
        return 'red'; 
      } else {
        return 'white'; 
      }
    }
    return '#707274';
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
      tabIndex="0"
      ref={paragraphRef}
    >
      <div style={{ width: '60%', textJustify: 'center' }} className="mainText">
        {paragraph.split('').map((letter, index) => (
          <span key={index} style={{ color: getLetterColor(index) }}>
            {letter}
          </span>
        ))}
      </div>
      <div>
        Typing Speed: {typingSpeed} words per minute
        
      </div>
    </div>
  );
};

export default TypingTest;
