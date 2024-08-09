import AiwithImage from '../components/AiwithImage';
import AiwithText from '../components/AiwithText';
import React, { useState } from 'react';

const Home = () => {
  const [aiWith, setAiWith] = useState('text');

  const handleAiWith = (value) => {
    setAiWith(value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generative AI MBH System</h1>
      <p style={styles.subtitle}>Developed using ReactJS + Redux + Google Gemini</p>

      <div style={styles.searchContainer}>
        <div style={styles.buttonContainer}>
          <button
            onClick={() => handleAiWith('text')}
            style={aiWith === 'text' ? { ...styles.button, ...styles.activeButton } : styles.button}
          >
            AI with Text
          </button>
          <button
            onClick={() => handleAiWith('image')}
            style={aiWith === 'image' ? { ...styles.button, ...styles.activeButton } : { ...styles.button, ...styles.marginLeft }}
          >
            AI with Image
          </button>
        </div>
        <div style={styles.content}>
          {aiWith === 'text' ? <AiwithText /> : <AiwithImage />}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '2.5em',
    margin: '20px 0',
    color: '#4a90e2'
  },
  subtitle: {
    fontSize: '1.2em',
    margin: '10px 0',
    color: '#777'
  },
  searchContainer: {
    width: '100%',
    maxWidth: '600px',
    border: '2px solid #4a90e2',
    borderRadius: '10px',
    padding: '20px',
    margin: '30px 0',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    backgroundColor: '#ddd',
    color: '#333'
  },
  activeButton: {
    backgroundColor: '#4a90e2',
    color: '#fff'
  },
  marginLeft: {
    marginLeft: '20px'
  },
  content: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default Home;
