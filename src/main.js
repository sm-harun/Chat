function sendPrompt() {
    
    const input = document.getElementById('prompt');
    const chatArea = document.getElementsByClassName("chat")[0];
    
    let message = document.createElement('div');
    message.classList.add('message');
    
    message.textContent = input.value;
    chatArea.appendChild(message);
    
    message.style.opacity = '1';
    message.style.transform = 'translateY(0)';
}

function resetChat() {
    let messages = document.querySelectorAll("message");
    
    messages.forEach(message => message.remove());
}