from machine import Pin
import time

hall_sens = Pin(32, Pin.IN)

while True:
   print(hall_sens.value())
   time.sleep_ms(1000)