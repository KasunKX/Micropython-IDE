from machine import Pin, ADC
from time import sleep

prox = ADC(Pin(34))
prox.atten(ADC.ATTN_11DB)       #Full range: 3.3v

while True:
   prox_value = prox.read()
   print(prox_value)
   sleep(0.1)