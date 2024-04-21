let allChats = [[], [], [], [], [], [], [], [], [], [], [], []];
let amountOfChats = 0;
let k = 0;

const input = document.getElementById('prompt');
input.addEventListener('keydown', (event) => {
   if (event.key == 'Enter') { sendPrompt(); } 
});

function sendPrompt() {
    
    const chatArea = document.getElementsByClassName("chat")[0];
    
    let message = document.createElement('div');
    message.classList.add('message');
    message.classList.add('right');
    
    message.textContent = input.value;
    chatArea.appendChild(message);
    
    input.value = "";
    
    askResponse(message.textContent);
}

function resetChat(save) {
    
    if (document.querySelectorAll(".message")[0]) {
        let messages = document.querySelectorAll(".message");
        let firstMessage = messages[0].textContent;
        
        for (let i = 0; i < messages.length; i++) {
            if (save == true) { allChats[amountOfChats][i] = messages[i]; }
            messages[i].remove();
        }
        
        if (save == true) {
            assignButtonToChat(firstMessage);    
            amountOfChats++;
        }
    }
}

function assignButtonToChat(firstMessage) {
    
    let chatHistoryArea = document.getElementsByClassName("chat-history")[0];
    
    let chatHistoryButton = document.createElement("button");
    chatHistoryButton.id = amountOfChats;
    chatHistoryButton.textContent = firstMessage;
    chatHistoryArea.appendChild(chatHistoryButton);
    
    chatHistoryButton.addEventListener('click', function () {
        replayChat(+chatHistoryButton.id);
    });
}

function replayChat(chatIndex) {
    
    resetChat(false);
    
    const chatArea = document.getElementsByClassName("chat")[0];
    let selectedChat = allChats[chatIndex];
    
    selectedChat.forEach(message => {
        chatArea.appendChild(message);
    });
}

function askResponse(message) {
    
    let chatArea = document.getElementsByClassName('chat')[0];
    let response = document.createElement('div');
    response.classList.add("message");
    response.classList.add("left");
    
    let responseText = returnResponse(message);
    response.textContent = responseText;
    chatArea.appendChild(response);
}