import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout
from tensorflow.keras.optimizers import SGD

# Download NLTK data including the missing resource
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Rest of your code...
