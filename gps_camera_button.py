import RPi.GPIO as GPIO
import time
import os
import datetime
import serial
import io

butpin = 24
ledpin = 23
mode = 0


GPIO.setmode(GPIO.BCM)
GPIO.setup(butpin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
#GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(ledpin, GPIO.OUT)
ser = serial.Serial('/dev/ttyAMA0',9600, timeout=1)

sio = io.TextIOWrapper(io.BufferedRWPair(ser, ser, 1), encoding='ascii', newline='\r')

filename = "gpslogs/" + str(int(time.time()))+".txt"
picname = "./pics/"
count = 0
camera = PiCamera()
camera.start_preview()
sleep(2)

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
	#print('Button Pressed' + str(mode))
        time.sleep(0.75)
    if mode == 1:
#        camera.capture( picfiname )
        savepic()
        sleep(4)
        with open(filename,'a') as f:
            got_gps = False;
            while got_gps == False:
                GPIO.output(ledpin, True)
                datast = sio.readline()
                print datast
                got_gps = True
            f.write(datast + "\n")
            f.flush()
	sleep(3)
    else:
        GPIO.output(ledpin, False )
