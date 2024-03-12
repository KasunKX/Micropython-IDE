from machine import Pin,ADC
LED=Pin(16,Pin.OUT)
adc=ADC(Pin(39))
while True:
   sensorValue=adc.read()
   if sensorValue>2048:
       LED.off()
   else:
       LED.on()