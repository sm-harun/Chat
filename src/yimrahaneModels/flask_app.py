from flask import Flask, render_template, request
import numpy as np
import pickle
from tensorflow.keras.models import load_model
import nltk
import json
from nltk.stem import WordNetLemmatizer

import random
app = Flask(__name__)

lemmatizer = WordNetLemmatizer()
with open('/home/gloryChatBot/mysite/intents.json') as file:
    intents = json.load(file)

words = pickle.load(open('/home/gloryChatBot/mysite/words.pkl', 'rb'))
classes = pickle.load(open('/home/gloryChatBot/mysite/classes.pkl', 'rb'))
model = load_model('/home/gloryChatBot/mysite/chatbotmodel.h5')
print(words)
print(model)
lemmatizer = nltk.stem.WordNetLemmatizer()


def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):

	sentence_words =clean_up_sentence(sentence)
	bag = [0] * len(words)
	for w in sentence_words:
		for i, word in enumerate(words):
			if word == w:
				bag[i] = 1
	return np.array(bag)

def predict_class(sentence):
	bow = bag_of_words(sentence)
	res = model.predict(np.array([bow]))[0]
	ERROR_THRESHOLD = 0.25
	results = [[i,r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

	results.sort(key=lambda x: x[1], reverse= True)
	return_list = []
	for r in results:
		return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
	return return_list
def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
    return result
"""

@app.route('/index')
def chatbot_response():
    message = input()
    ints = predict_class(message)
    res = get_response(ints, intents)

    return res
"""

@app.route('/', methods =["GET", "POST"])
def gfg():
    if request.method == "POST":

       first_name = request.form.get("fname")
       message = first_name
       ints= predict_class(message)
       #res = get_response(ints, intents)
       return "urinput > " + first_name


    return render_template("index.html")


if __name__=='__main__':
   app.run()


