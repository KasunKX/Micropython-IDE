from machine import Pin
import time

flame = ADC(Pin(32))
flame.atten(ADC.ATTN_11DB)       #Full range: 3.3v

while True:
  flame_value = flame.read()
  print(flame_value)
  sleep(0.1)