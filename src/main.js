let allChats = [[], [], [], [], [], [], [], [], [], [], [], []];
let amountOfChats = 0;

let popupState = "hidden";

let currentBot = "youSaidBot";

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
    
    setTimeout(() => askResponse(message.textContent), 1000)
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

function togglePopup() {
    let popup = document.getElementsByClassName('popup')[0];
    let bodyElements = document.querySelectorAll("body *:not(.popup, .popup *)");
    
    if (popupState == "hidden") {
        
        popup.style.opacity = "1";
        popupState = "visible";
        bodyElements.forEach(element => element.classList.add("hide"));
        return popup;
        
    } else {
        
        let popupElem = document.querySelectorAll(".popup *");
        popupElem.forEach(element => element.remove());
        
        popup.style.opacity = "0";
        popupState = "hidden";
        bodyElements.forEach(element => element.classList.remove("hide"));
        return null;
    }
    
}

function confirmDeletion() {
    
    let popup = togglePopup();
    
    let warningText = document.createElement("p");
    let buttonsHolder = document.createElement("div");
    let yesButton =document.createElement("button");
    let noButton = document.createElement("button");
    
    warningText.textContent = "Are you sure you want to delete? The chat isn't saved.";
    yesButton.textContent = "YES";
    noButton.textContent = "No";
    
    popup.appendChild(warningText);
    popup.appendChild(buttonsHolder);
    buttonsHolder.appendChild(yesButton);
    buttonsHolder.appendChild(noButton);
    
    yesButton.addEventListener("click", function() {
        resetChat(false);
        togglePopup();
    });
    
    noButton.addEventListener("click", function() {
        togglePopup();
    });
}

function triggerBotOption() {
    
    let popup = togglePopup("show");
    
    let youSaidBotButton = document.createElement("button");
    let numberOfWordsBotButton = document.createElement("button");
    
    youSaidBotButton.textContent = "You Said Bot";
    numberOfWordsBotButton.textContent = "Number Of Words Bot";
    
    popup.appendChild(youSaidBotButton);
    popup.appendChild(numberOfWordsBotButton);
    
    youSaidBotButton.addEventListener("click", function() {
        currentBot = "youSaidBot";
        togglePopup();
    });
    numberOfWordsBotButton.addEventListener("click", function() {
        currentBot = "numberOfWordsBot";
        togglePopup();
    });
}

function askResponse(message) {
    
    let chatArea = document.getElementsByClassName('chat')[0];
    let response = document.createElement('div');
    response.classList.add("message");
    response.classList.add("left");
    
    let responseText = returnResponse(currentBot, message);
    response.textContent = responseText;
    chatArea.appendChild(response);
}