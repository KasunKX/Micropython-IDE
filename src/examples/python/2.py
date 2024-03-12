from machine import Pin
from neopixel import NeoPixel
from random import randint
import time

pin = Pin(14, Pin.OUT)
np = NeoPixel(pin, 2)

def set_color(red, green, blue):
    np[0] = (red, green, blue)
    np.write()

def random_color():
    return (randint(0, 255), randint(0, 255), randint(0, 255))

while True:
    set_color(*random_color())
    time.sleep(2)  # Sleep for 2 seconds
