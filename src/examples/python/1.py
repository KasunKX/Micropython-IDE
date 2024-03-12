from machine import Pin
import time

leda = Pin(2, Pin.OUT)
ledb = Pin(15, Pin.OUT)

for i in range(10):
     leda.on()
     ledb.off()
     time.sleep_ms(500)
     leda.off()
     ledb.on()
     time.sleep_ms(500)