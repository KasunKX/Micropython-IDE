from machine import Pin,PWM
import time

LED=Pin(16, Pin.OUT)
pwm = PWM(LED)
pwm.freq(50)

while True:
  for i in range (0,256,1):
    pwm.duty(i)
    time.sleep_ms(500)