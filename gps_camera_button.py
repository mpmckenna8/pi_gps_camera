from time import sleep
from picamera import PiCamera
from datetime import datetime, timedelta

import RPi.GPIO as GPIO
import time
import os
import datetime
import serial
import io

butpin = 23
ledpin = 24
mode = 0


GPIO.setmode(GPIO.BCM)
GPIO.setup(butpin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
#GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(ledpin, GPIO.OUT)
ser = serial.Serial('/dev/ttyAMA0',9600, timeout=1)

sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser, 1), encoding='ascii', newline='\r')

filename = "/home/pi/project/gpslogs/" + str(int(time.time()))+".txt"
picname = "/home/pi/project/pics/"
count = 0
camera = PiCamera()
camera.start_preview()
sleep(2)


def printLine():
    datast = 'hi'
    try:
        datast = sio.readline()
        with open(filename,'a') as f:
            got_gps = False;
            while got_gps == False:
                GPIO.output(ledpin, True)
                datast = sio.readline()
                print datast
                got_gps = True
            f.write(datast + "\n")
            f.flush()
        #print datast
    except UnicodeDecodeError as err:
        print('there was some error', err)
        time.sleep(3)
        printLine()
    print datast



def savepic():
    picfiname = picname + str( int( time.time() ) ) + ".jpg"
    print( 'picture file name ' + picfiname)
    camera.capture( picfiname )



while True:
    input_state = GPIO.input(butpin)
    if input_state == False:
        if mode == 0:
            mode = 1
        else:
            mode = 0
	print('Button Pressed, mode = ' + str(mode))
        time.sleep(0.75)
    if mode == 1:
        picfiname = picname + str( int( time.time() ) ) + ".jpg"
        print( 'picture file name ' + picfiname)
#        camera.capture( picfiname )
        savepic()
        sleep(4)
        printLine()
	sleep(3)
    else:
        GPIO.output(ledpin, False )
