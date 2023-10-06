document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    let userName = "";

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            addUserMessage(userMessage);
            if (!userName) {
                userName = userMessage;
                addBotMessage(`You are welcome, ${userName}! What do you want to know about?`);
            } else {
                handleUserResponse(userMessage);
            }
            userInput.value = "";
        }
    });

    function addUserMessage(message) {
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("message", "user");
        userMessageElement.textContent = message;
        chatLog.appendChild(userMessageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function addBotMessage(message) {
        const botMessageElement = document.createElement("div");
        botMessageElement.classList.add("message", "bot");
        botMessageElement.textContent = message;
        chatLog.appendChild(botMessageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function handleUserResponse(userMessage) {
        // Check for specific user queries and send corresponding requests
        if (userMessage.toLowerCase().includes('school fee')) {
            sendApiRequest('/school-fee/undergraduate');
        } else if (userMessage.toLowerCase().includes('admission')) {
            sendApiRequest('/admission/undergraduate');
        } else if (userMessage.toLowerCase().includes('courses')) {
            sendApiRequest('/courses/computer_science');
        } else {
            // If no specific query matches, send to Dialogflow or provide a default response
            sendUserInputToDialogflow(userMessage);
        }
    }

    function sendApiRequest(apiEndpoint) {
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const botResponse = data.error ? 'Sorry, I couldn\'t find the information.' : data;
                addBotMessage(botResponse);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});
