function degToRad(deg: number) {
    return deg / 180 * Math.PI
}

export class FourVector {
	components: [number, number, number, number];
	//x* |up> |up> + y * |up> |down> + z * |down>|up> + w* |down> |down>
	constructor(x: number, y: number, z: number, w: number) {
		this.components = [x, y, z, w];
        //TODO normalise the input qubit automatically in case it was forgotten
	}

	dot(vec: FourVector) {
		let toReturn = 0;
		for (let i = 0; i < this.components.length; i++) {
			toReturn += this.components[i] * vec.components[i];
		}
		return toReturn;
	}

	magnitudeSquared() {
		return this.dot(this);
	}

	multiplyByNumber(number: number) {
		for (let i = 0; i < this.components.length; i++) {
			this.components[i] *= number;
		}
		return this;
	}

	normalize() {
		let magnitude = Math.sqrt(this.magnitudeSquared());
		this.multiplyByNumber(1 / magnitude);
	}
	add(vec: FourVector) {
		for (let i = 0; i < this.components.length; i++) {
			this.components[i] += vec.components[i];
		}
		return this;
	}
}

function korneckerProduct(vec1: number[], vec2: number[]) {
    return new FourVector(vec1[0] * vec2[0], vec1[0] * vec2[1], vec1[1] * vec2[0], vec1[1] * vec2[1])
}
function partialTrace(fourvector: FourVector, vec: number[], aliceMeasures: boolean) {
    let toReturn: number[];
    if (aliceMeasures) {
        let x = vec[0] * fourvector.components[0] + vec[1] * fourvector.components[2];
        let y = vec[0] * fourvector.components[1] + vec[1] * fourvector.components[3];
        return [x, y];
    }
    else {
        let x = vec[0] * fourvector.components[0] + vec[1] * fourvector.components[1];
        let y = vec[0] * fourvector.components[2] + vec[1] * fourvector.components[3];
        return [x, y];
    }
}


export class EntangledQuBits {
    multistate: FourVector

    constructor(multistate: FourVector) {
        this.multistate = multistate
    }

    measureOneQubit(whoMeasures: "Alice" | "Bob", angleOfMeasurement: number) {
        // measure
        let rad = degToRad(angleOfMeasurement);
        let measurementVector: number[];
        measurementVector = [Math.sin(rad), Math.cos(rad)];
        let isAliceMeasuring = (whoMeasures == "Alice");

        let pt = partialTrace(this.multistate, measurementVector, isAliceMeasuring);

        let probabilityOfMeasurement = pt[0] * pt[0] + pt[1] * pt[1];
        let outcome = (probabilityOfMeasurement < Math.random());

        // now change the state
        let newState: FourVector;
        if (isAliceMeasuring) {
            if (outcome) {
                newState = korneckerProduct(measurementVector, pt)
            }
            else {
                newState = this.multistate.add(korneckerProduct(measurementVector, pt).multiplyByNumber(-1));
            }
        }

        else {
            if (outcome) {
                newState = korneckerProduct(pt, measurementVector)
            }
            else {
                newState = this.multistate.add(korneckerProduct(pt, measurementVector).multiplyByNumber(-1));
            }
        }
        newState.normalize()
        this.multistate = newState;

        return outcome
    }

}