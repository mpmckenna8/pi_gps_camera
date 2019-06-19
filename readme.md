## Pi gps camera project to track and take pictures

Goal is to have a thing i can put in my backpack or attach to a bicycle to track
me and take pictures.  Would be great to have either functionality enabled.

The field from the gps data i want is GPGGA.


Basic programming going on with the pi is a loop which will grab gps data then
take a picture every few seconds.  


For powering the pi there is a Pi UPS
designed to be a power supply for a regular style pi in the case of power outage
and stuff but I think should run a pi zero for a while.


Orientation of the antenna is super important.  Ordered an external antenna but it only seems to work without it if the gps is facing the sky with very few impediments.



materials:
- pi zero
- Adafruit ultimate gps module
  - https://www.adafruit.com/product/746?gclid=Cj0KCQjw9JzoBRDjARIsAGcdIDXBLof_z_cauHqBjeDHl8ydptqnGsKCJH4B6jBIlTqc1MbjH_tWZpYaAqeXEALw_wcB
- custom pi header
  - components:
    - led
    - button
    - wires
    - female header pins
  - MicroB OTG male to A female
    - https://www.adafruit.com/product/1099
    - If using a regular pi zero to add wifi module
  - microB usb cable
    - for power
