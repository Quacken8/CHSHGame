// parameters
int INITIAL_PWM = 10;
int readoutDelay = 10;
int readoutAvgCount = 200;
int baudRate = 9600;
int statusLed = LED_BUILTIN;
int sourceLed = 11;
int intensityAnalog = A3;

// runtime variables
float sum = 0;
int count = 0;

void setup() {
  Serial.begin(baudRate);
  pinMode(statusLed, OUTPUT);
  pinMode(sourceLed, OUTPUT);

  // for tutorial on PWM, see:
  // https://www.arduino.cc/en/Tutorial/SecretsOfArduinoPWM
  TCCR2A = _BV(COM2A1) | _BV(WGM21) | _BV(WGM20);
  TCCR2B = _BV(CS22);
  OCR2A = INITIAL_PWM;
}

void loop() {
  int measured = analogRead(intensityAnalog);
  sum += measured;
  count += 1;

  if (count >= readoutAvgCount) {
    Serial.println("Reading value: " + String(sum / count));
    digitalWrite(statusLed, !digitalRead(statusLed));
    sum = 0;
    count = 0;
  }
  
  delay(readoutDelay);

  if (Serial.available() > 0) {
    OCR2A = Serial.parseInt(SKIP_ALL, '\n');
    Serial.println("Setting PWM value: " + String(OCR2A));
  }
}
