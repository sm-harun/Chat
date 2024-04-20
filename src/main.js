let allChats = [[], [], [], [], [], [], [], [], [], [], [], []];
let amountOfChats = 0;

function sendPrompt() {
    
    const input = document.getElementById('prompt');
    const chatArea = document.getElementsByClassName("chat")[0];
    
    let message = document.createElement('div');
    message.classList.add('message');
    
    message.textContent = input.value;
    chatArea.appendChild(message);
}

function resetChat() {
    
    let chatHistoryArea = document.getElementsByClassName("chat-history")[0];
    let messages = document.querySelectorAll(".message");
    let firstMessage = messages[0].textContent;
    
    for (let i = 0; i < messages.length; i++) {
        allChats[amountOfChats][i] = messages[i];
        messages[i].remove();
    }
    
    let chatHistoryButton = document.createElement("button");
    chatHistoryButton.id = amountOfChats;
    chatHistoryButton.textContent = firstMessage;
    chatHistoryArea.appendChild(chatHistoryButton);
    
    amountOfChats++;
}