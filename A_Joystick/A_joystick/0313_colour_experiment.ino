#include <Adafruit_DotStar.h>
#include <SPI.h>

// Define the number of DotStar LEDs in your strip
#define NUM_LEDS 1

// Initialize the DotStar strip using hardware SPI.
// The DOTSTAR_BRG flag sets the color order to Blue, Red, Green.
// Adjust the flag if your LED color order differs.
Adafruit_DotStar strip = Adafruit_DotStar(NUM_LEDS, DOTSTAR_BRG);

void setup() {
  // Initialize the DotStar library.
  strip.begin();
  // Ensure all LEDs are turned off initially.
  strip.show();
}

void loop() {
  // Set the LED to magenta (RGB: 255, 0, 255)
  strip.setPixelColor(0, 255, 0, 255);
  strip.show();
  delay(1000);  // Wait for 1 second
  
  // Set the LED to cyan (RGB: 0, 255, 255)
  strip.setPixelColor(0, 0, 255, 255);
  strip.show();
  delay(1000);  // Wait for 1 second
  
  // Set the LED to yellow (RGB: 255, 255, 0)
  strip.setPixelColor(0, 255, 255, 0);
  strip.show();
  delay(1000);  // Wait for 1 second
}
