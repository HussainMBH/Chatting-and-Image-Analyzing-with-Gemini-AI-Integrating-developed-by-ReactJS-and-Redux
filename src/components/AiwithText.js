import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBXQ2ipA2HP0aSBOTMHAvn5oI2YQ8A6LEs');

    const [search, setSearch] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch text insights
     */
    async function aiRun() {
        setLoading(true);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = search;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        setMessages([
            ...messages,
            { text: search, type: 'user', name: 'You' },
            { text, type: 'ai', name: 'MBH AI' }
        ]);
        setSearch('');
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div style={styles.container}>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={msg.type === 'user' ? styles.userMessage : styles.aiMessage}
                    >
                        <strong>{msg.name}:</strong> {msg.text}
                    </div>
                ))}
                {loading && <p style={styles.loading}>Loading ...</p>}
            </div>
            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    placeholder='Ask anything using Generative AI'
                    value={search}
                    onChange={handleChangeSearch}
                />
                <button
                    style={styles.button}
                    onClick={handleClick}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        margin: '0 auto',
    },
    messagesContainer: {
        width: '100%',
        height: '400px',
        overflowY: 'scroll',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '300px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
    loading: {
        margin: '30px 0',
        fontSize: '18px',
        color: '#555',
    },
    userMessage: {
        textAlign: 'right',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    aiMessage: {
        textAlign: 'left',
        backgroundColor: '#e0e0e0',
        color: '#333',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
};

export default AiwithText;
