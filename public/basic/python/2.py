from machine import Pin

led = Pin(16, Pin.OUT)
btn = Pin(34, Pin.IN)

while True:
     if btn() == 0:
          led.on()
     else:
          led.off()