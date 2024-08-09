document.getElementById('chatForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value;
    
    if (userMessage.trim() === '') return;
    
    displayMessage(userMessage, 'user');
    messageInput.value = '';
    
    const responseMessage = await sendMessageToAPI(userMessage);
    displayMessage(responseMessage, 'api');
});

function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/openai-community/gpt2",
        {
            headers: {
                "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxx", // Reemplaza con tu API key de Hugging Face
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

async function sendMessageToAPI(userMessage) {
    try {
        const response = await query({ inputs: userMessage });
        console.log(response); // Ver la respuesta completa en la consola
        if (response.length && response[0].generated_text) {
            return response[0].generated_text;
        } else {
            return 'Error en la respuesta de la API';
        }
    } catch (error) {
        console.error('Error en la petición a la API:', error);
        return 'Error en la petición a la API';
    }
}