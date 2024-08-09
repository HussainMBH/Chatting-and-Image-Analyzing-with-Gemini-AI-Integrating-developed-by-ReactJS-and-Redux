import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from '../helper/imageHelper';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBXQ2ipA2HP0aSBOTMHAvn5oI2YQ8A6LEs');

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponses, setAiResponses] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun(prompt) {
        setLoading(true);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            prompt, imageInlineData
        ]);
        const response = await result.response;
        const text = await response.text();
        setAiResponses(prevResponses => [...prevResponses, { prompt, text }]);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun("What's in this photo?");
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e));

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        aiImageRun(inputText);
        setInputText('');
    }

    return (
        <div style={styles.container}>
            <div style={styles.uploadSection}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageChange(e)}
                    style={styles.fileInput}
                />
                <button
                    style={styles.button}
                    onClick={() => handleClick()}
                >
                    Analyze Image
                </button>
            </div>

            {image && (
                <img
                    src={image}
                    alt='Selected'
                    style={styles.image}
                />
            )}

            {loading && (
                <p style={styles.loading}>Loading ...</p>
            )}

            <div style={styles.chatContainer}>
                {aiResponses.map((response, index) => (
                    <div key={index} style={styles.chatMessage}>
                        <p style={styles.userMessage}><strong>You:</strong> {response.prompt}</p>
                        <p style={styles.aiMessage}><strong>MBH AI:</strong> {response.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleQuestionSubmit} style={styles.form}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask a question about the image"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Ask
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    uploadSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '30px',
    },
    fileInput: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
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
    image: {
        width: '50%',
        maxWidth: '600px',
        marginTop: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    loading: {
        margin: '30px 0',
        fontSize: '18px',
        color: '#555',
    },
    chatContainer: {
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '300px', // Fixed height to enable scrolling
        overflowY: 'auto', // Enable vertical scrolling
    },
    chatMessage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    userMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#d0e7ff',
        padding: '10px',
        borderRadius: '5px',
        color: '#0056b3',
        marginBottom: '5px',
        width: 'fit-content',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e1e1e1',
        padding: '10px',
        borderRadius: '5px',
        color: '#333',
        width: 'fit-content',
    },
    form: {
        display: 'flex',
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
};

export default AiwithImage;
