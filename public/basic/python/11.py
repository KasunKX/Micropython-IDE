from machine import Pin,PWM
import time
servo = PWM(Pin(26),freq=50)

while True:
    servo.duty(180)
    time.sleep_ms(500)
    servo.duty(1)
    time.sleep_ms(500)