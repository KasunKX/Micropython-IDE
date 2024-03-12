from machine import Pin
import time

motion_sens = Pin(32, Pin.IN)

while True:
   print(motion_sens.value())
   time.sleep_ms(1000)