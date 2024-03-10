from machine import Pin, time_pulse_us
from utime import sleep_us

__version__ = '0.2.1'
__author__ = 'Roberto Sánchez'
__license__ = 'Apache License 2.0. https://www.apache.org/licenses/LICENSE-2.0'

class HCSR04:
   

    def __init__(self, trig_echo, echo_timeout_us=500*2*30):
  
        self.trigger_pin = trig_echo
        self.echo_pin = trig_echo
        self.echo_timeout_us = echo_timeout_us
       
        self.trigger = Pin(trig_echo, mode=Pin.OUT, pull=None)
        self.trigger.value(0)

      
        self.echo = Pin(trig_echo, mode=Pin.IN, pull=None)

    def _send_pulse_and_wait(self):
       
        self.trigger = Pin(self.trigger_pin, mode=Pin.OUT, pull=None)
        self.trigger.value(0) 
        sleep_us(5)
        self.trigger.value(1)
      
        sleep_us(10)
        self.trigger.value(0)
        self.echo = Pin(self.echo_pin, mode=Pin.IN, pull=None)
        try:
            pulse_time = time_pulse_us(self.echo, 1, self.echo_timeout_us)
      
            if pulse_time < 0:
                MAX_RANGE_IN_CM = const(500) 
                pulse_time = int(MAX_RANGE_IN_CM * 29.1)
            return pulse_time
        except OSError as ex:
            if ex.args[0] == 110:
                raise OSError('Out of range')
            raise ex

    def distance_mm(self):
        
        pulse_time = self._send_pulse_and_wait()

        mm = pulse_time * 100 // 582
        return mm

    def distance_cm(self):
       
        pulse_time = self._send_pulse_and_wait()

        cms = (pulse_time / 2) / 29.1
        return cms