from machine import Pin,PWM
import time

LED=Pin(2, Pin.OUT)
LEDB=Pin(15, Pin.OUT)

left_wheel = PWM(Pin(16))
right_wheel = PWM(Pin(27))
pwm = PWM(LED)
pwmb = PWM(LEDB)
pwm.freq(50)

while True:
  for i in range (1000):
    pwm.duty(i)
    pwmb.duty(i)
    left_wheel.duty(i)
    right_wheel.duty(i)
    time.sleep(0.05)