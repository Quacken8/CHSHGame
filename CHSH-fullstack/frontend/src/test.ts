import { FourVector, EntangledQuBits } from "./quantum";

const numberOfTests = 5000;

var correctGuesses = 0.0;

for (let i = 0; i < numberOfTests; i++) {
    // create entangled pair
    var initialState = FourVector(); // help what do i put here
    var Qubits = new EntangledQuBits(initialState);

    // recieve bits from charlie

    var AliceBit = Math.floor(Math.random() * 2); // a floor of number between 0 and 1.99 is just a coin toss
    var BobBit = Math.floor(Math.random() * 2);

    // measure according to whateverthefuck i dont understand the entanglement

    var angleOfMeasurementInDegs = 0; // ???? idk?
    
    var AliceMeasurementOutcome = Qubits.measureOneQuBit("Alice", angleOfMeasurementInDegs);
    var BobMeasurementOutcome = Qubits.measureOneQuBit("Bob", angleOfMeasurementInDegs);

    var AlicesSmartAndEntanglementInformedResponse = AliceMeasurementOutcome;
    var BobSmartAndEntanglementInformedResponse = BobMeasurementOutcome;
    
    var didTheyDidTheThingProperly = (condition); // the FUCK is the condition idk man
    if (didTheyDidTheThingProperly) {
        correctGuesses += 1.0;
    }
}
console.log("Correct guesses:");
console.log(correctGuesses);
console.log("Out of a total of:");
console.log(numberOfTests);
console.log("That is in percents:");
console.log(correctGuesses / numberOfTests * 100); // oh boy i sure do hope there isnt anything funky regarding floats and ints here