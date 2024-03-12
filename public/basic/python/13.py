from machine import Pin
from neopixel import NeoPixel
from random import randint

pin = Pin(26, Pin.OUT)
np = NeoPixel(pin, 1)

np[0] = (100,0,0)
np.write()

button_a=Pin(34, Pin.IN)
button_b=Pin(35, Pin.IN)
redVal = randint(0, 255)
greenVal = 0
blueVal = 0

while True:
    if button_a.value():
        redVal = 0
        blueVal = 0
        greenVal = randint(0, 255)
        np[0] = (greenVal, redVal, blueVal)
        np.write();
            
    elif button_b.value():
        redVal = 0
        blueVal = randint(0, 255)
        greenVal = 0
        np[0] = (redVal, greenVal, blueVal)
        np.write();    
    else:
        np[0] = (greenVal, redVal, blueVal)
        np.write();