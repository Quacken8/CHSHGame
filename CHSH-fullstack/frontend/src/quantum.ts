function degToRad(deg: number) {
    return deg / 180 * Math.PI
}

class FourVector {
    components: [number, number, number, number];
    constructor(x: number, y: number, z: number, w: number) {
        this.components = [x, y, z, w];
    }

    dot(vec: FourVector) {
        let toReturn = 0;
        for (let i = 0; i < this.components.length; i++) {
            toReturn += this.components[i] * vec.components[i]
        }
        return toReturn
    }

    magnitudeSquared() {
        return this.dot(this)
    }

    multiplyByNumber(number: number) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] *= number;
        }
        return this
    }

    normalize() {
        let magnitude = Math.sqrt(this.magnitudeSquared());
        this.multiplyByNumber(1 / magnitude);
    }
    add(vec: FourVector) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] += vec[i];
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
        let x = vec[0] * fourvector[0] + vec[1] * fourvector[2];
        let y = vec[0] * fourvector[1] + vec[1] * fourvector[3];
        return [x, y];
    }
    else {
        let x = vec[0] * fourvector[0] + vec[1] * fourvector[1];
        let y = vec[0] * fourvector[2] + vec[1] * fourvector[3];
        return [x, y];
    }
}


export class EntangledQuBits {
    multistate: FourVector

    constructor(multistate: FourVector) {
        this.multistate = multistate
    }

    measureOneQuBit(whoMeasures: string, angleOfMeasurement: number) {
        // measure
        let rad = degToRad(angleOfMeasurement);
        let measurementVector: number[];
        measurementVector[0] = Math.sin(rad);
        measurementVector[1] = Math.cos(rad);
        let AliceIsMeasuring = (whoMeasures == "Bob") ? true : false;

        let pt = partialTrace(this.multistate, measurementVector, AliceIsMeasuring);

        let probabilityOfMeasurement = pt[0] * pt[0] + pt[1] * pt[1];
        let outcome = (probabilityOfMeasurement < Math.random()) ? true : false;

        // now change the state
        let newState: FourVector;
        if (AliceIsMeasuring) {
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