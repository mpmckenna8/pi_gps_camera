#to print stuff from gps to console
import RPi.GPIO as GPIO
import serial
import io

import time

GPIO.setmode(GPIO.BCM)


ser = serial.Serial('/dev/ttyAMA0',9600, timeout=1)

sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser, 1), encoding='ascii', newline='\r')


def printLine():
    datast = 'hi'
    try:
        datast = sio.readline()
        print datast
    except UnicodeDecodeError as err:
        print('there was some error', err)
        time.sleep(3)
        printLine()
    print datast


# wantt to add error handling like form https://stackoverflow.com/questions/5627425/what-is-a-good-way-to-handle-exceptions-when-trying-to-read-a-file-in-python
while True:
 #   datast = sio.readline()
    printLine()
