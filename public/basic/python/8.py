from machine import Pin
import time

Tilt = Pin(32, Pin.IN)

while True:
   print(Tilt.value())
   time.sleep_ms(1000)