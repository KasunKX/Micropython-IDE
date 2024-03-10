from machine import Pin,PWM
import time
BUZZER=Pin(25, Pin.OUT)
while True:
      BUZZER.on()
      time.sleep_ms(300)
      BUZZER.off()
      time.sleep_ms(300)