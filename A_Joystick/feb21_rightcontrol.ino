#include <Keyboard.h>
#include <RotaryEncoder.h>

// Pin definitions for rotary encoder
const int clkPin = 9;   // Encoder Clock
const int dtPin  = 8;   // Encoder Data
const int swPin  = 7;   // Encoder pushbutton

// Pin definitions for additional buttons
const int btn1Pin = 2;  // Button 1: will output A ("clear")
const int btn2Pin = 3;  // Button 2: will output D ("fill")

// Create a RotaryEncoder object for clkPin and dtPin
RotaryEncoder encoder(clkPin, dtPin);

// Variables to keep track of encoder position
int lastPos = 0;

// Debounce flags for pushbuttons
bool swPressed = false;
bool btn1Pressed = false;
bool btn2Pressed = false;

void setup() {
  Serial.begin(9600);
  Keyboard.begin();
  
  // Set up pushbutton pin with internal pull-up
  pinMode(swPin, INPUT_PULLUP);
  pinMode(btn1Pin, INPUT_PULLUP);
  pinMode(btn2Pin, INPUT_PULLUP);
  
  // Initialize the encoder's last position
  lastPos = encoder.getPosition();
}

void loop() {
  // --- Rotary Encoder Handling using the library ---
  encoder.tick();
  int newPos = encoder.getPosition();
  if (newPos != lastPos) {
    if (newPos > lastPos) {
      // Clockwise rotation now sends "F" (code 70) left: 37
      Keyboard.write(37);
      Serial.println("left");
    } else {
      // Counter-clockwise rotation now sends "E" (code 69) right: 39
      Keyboard.write(39);
      Serial.println("right");
    }
    lastPos = newPos;
  }
  
  if(digitalRead(btn2Pin) == LOW) { // spams paint/unpaint if you hold it ..
    delay(250);
    Keyboard.write(40);
    Serial.println("D (fill/Clear)");
  }
  
  delay(10); // Small delay to help with debouncing
}
