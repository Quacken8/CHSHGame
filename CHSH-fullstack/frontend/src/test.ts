import { FourVector, EntangledQubits } from './quantum';

export function test100() {

	const numberOfTests = 100;

	let victory: boolean;
	const isWin = (x: boolean, y: boolean, a: boolean, b: boolean): boolean => {
		let A: boolean = x && y; //Logical and
		let B: boolean = (a && !b) || (!a && b); //XOR
		return A == B;
	};

	var correctGuesses = 0.0;

	for (let i = 0; i < numberOfTests; i++) {
		//https://en.wikipedia.org/wiki/CHSH_inequality#Optimal_quantum_strategy
		// create entangled pair
		const norm: number = 1 / Math.sqrt(2);
		let initialState = new FourVector(norm, 0, 0, norm);
		var Qubits = new EntangledQubits(initialState);

		// recieve bits from charlie

		var a: boolean = Math.random() < 0.5;
		var b: boolean = Math.random() < 0.5;

		//Which angle are they going to measure?
		if (a == true) {
			var anglea = 90; // |1>
		} else {
			var anglea = 0; // |+> = |0> - |1>
		}
		if (b == true) {
			var angleb = 112.5;
			// -sin(pi/8) |0> + cos(pi/8) |1>
			// cos(5pi/8) |0> + cos(pi/8) |1>
		} else {
			var angleb = 67.5;
			// sin(pi/8)  |0> + cos(pi/8) |1>
			// cos(3pi/8) |0> + cos(pi/8) |1>
		}

		var resa = Qubits.measureOneQubit('Alice', anglea);
		var resb = Qubits.measureOneQubit('Bob', angleb);

		var x = resa;
		var y = resb;

		var didTheyDidTheThingProperly = isWin(x, y, a, b); // the FUCK is the condition idk man
		if (didTheyDidTheThingProperly) {
			correctGuesses += 1.0;
		}
	}
	console.log('Correct guesses:');
	console.log(correctGuesses);
	console.log('Out of a total of:');
	console.log(numberOfTests);
	console.log('That is in percents:');
	console.log((correctGuesses / numberOfTests) * 100.0); // oh boy i sure do hope there isnt anything funky regarding floats and ints here
}
