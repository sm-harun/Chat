function returnResponse(bot, message) {
    
    switch (bot) {
        case "youSaidBot":
            return youSaidBot(message);
            break;
        case "numberOfWordsBot":
            return numberOfWordsBot(message);
            break;
    }
}

function numberOfWordsBot(message) {
    let wordsArray = message.split(" ");
    return "Your message has " + wordsArray.length + " words."
}

function youSaidBot(message) {
    return 'You said: ' + '"' + message + '"';
}