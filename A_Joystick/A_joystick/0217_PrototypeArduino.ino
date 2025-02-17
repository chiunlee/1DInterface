// Pin definitions for rotary encoder
const int clkPin = 9;   // Encoder Clock
const int dtPin  = 8;   // Encoder Data
const int swPin  = 7;   // Encoder Switch

// Pin definitions for additional buttons
const int btn1Pin = 2;  // Button 1: prints "clear"
const int btn2Pin = 3;  // Button 2: prints "fill"

// Global variables for encoder state
long encoderCounter = 0;
int lastClkState;

void setup() {
  Serial.begin(9600);
  
  // Set up encoder pins
  pinMode(clkPin, INPUT);
  pinMode(dtPin, INPUT);
  // Using internal pull-up for the encoder switch
  pinMode(swPin, INPUT_PULLUP);
  
  // Set up additional buttons using internal pull-ups
  pinMode(btn1Pin, INPUT_PULLUP);
  pinMode(btn2Pin, INPUT_PULLUP);
  
  // Read the initial state of the CLK pin
  lastClkState = digitalRead(clkPin);
}

void loop() {
  // --- Rotary Encoder Handling ---
  int currentClkState = digitalRead(clkPin);
  if (currentClkState != lastClkState) {
    // Determine rotation direction based on the state of DT relative to CLK
    if (digitalRead(dtPin) != currentClkState) {
      encoderCounter++;  // Clockwise
    } else {
      encoderCounter--;  // Counter-clockwise
    }
    Serial.print("Rotation: ");
    Serial.println(encoderCounter);
  }
  lastClkState = currentClkState;

  // --- Encoder Pushbutton (Optional) ---
  if (digitalRead(swPin) == LOW) {
    Serial.println("Encoder button pressed!");
    delay(200);  // Simple debounce delay
  }

  // --- Additional Buttons Handling ---
  // Button 1 (connected to pin 2)
  if (digitalRead(btn1Pin) == LOW) {
    Serial.println("clear");
    delay(200);  // Simple debounce delay
  }
  
  // Button 2 (connected to pin 3)
  if (digitalRead(btn2Pin) == LOW) {
    Serial.println("fill");
    delay(200);  // Simple debounce delay
  }
}
