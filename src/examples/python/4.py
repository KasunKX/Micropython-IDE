from machine import Pin, I2C
import ssd1306
from time import sleep

# Magicbit Pin assignment
i2c = I2C(-1, scl=Pin(22), sda=Pin(21))


oled_width = 128
oled_height = 64
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)

oled.text('Hello, World 1!', 0, 0)
oled.text('Hello, World 2!', 0, 10)
oled.text('Hello, World 3!', 0, 20)

oled.show()