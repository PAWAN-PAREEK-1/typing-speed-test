// components/TypingTestResults.js
"use client"
import React from 'react';
import '../globals.css';

const TypingTestResults = ({ accuracy, typingSpeed,handleRestart  }) => {

  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Typing Speed Test Results</h1>
        <p style={styles.text}>Accuracy: <span style={styles.typingSpeed} className='typingSpeed'>{accuracy}%</span></p>
        <p style={styles.text} className=''>Typing Speed:<span style={styles.typingSpeed} className='typingSpeed'>{typingSpeed}</span> WPM</p>
        <button onClick={handleRestart} style={styles.button}>Restart Typing</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#28292b',
    color: 'white',
    fontFamily: '"Montserrat", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '25px',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  typingSpeed:{
    color:'yellow',
    
  }
};

export default TypingTestResults;
