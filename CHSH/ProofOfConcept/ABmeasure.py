import numpy as np
import qubit
import random
'''
A proof-of-concept file demonstrating what happens
when both A and B measure an entangled qubit.
'''



SharedQubit = qubit.BellState(type=1)
SharedDensityMatrix = np.outer(SharedQubit,SharedQubit)

def IsSuccess(x,y,a,b):
    A = x or y
    B = a ^ b
    return A == B

def OneRound(x,y,Shared=SharedDensityMatrix):
    """https://en.wikipedia.org/wiki/CHSH_inequality#Optimal_quantum_strategy"""
    if x == False:
        AliceMeasure = 90.  #State |1> (will give 1 if measured)
    else:
        AliceMeasure = -45. #State |->
    if y == False:
        BobMeasure = 225./2.  #State (-sin pi/8 = cos 5pi/8) |0> + ...
    else:
        BobMeasure = 135./2.  #State  (sin pi/8 = cos 3pi/8) |0> + ...

    #First, Alice Measures.
    Ares, AQres = qubit.MeasureAlphaComposite(Shared,AliceMeasure,compQno=0)

    #Then, Bob measures.
    Bres, BQres = qubit.MeasureAlphaComposite(AQres,BobMeasure,compQno=1)

    win = IsSuccess(x,y,Ares,Bres)
    
    return win

norounds = 1000
nowins = 0
for i in range(norounds):
    x = bool(random.getrandbits(1))
    y = bool(random.getrandbits(1))
    A = OneRound(x,y)
    if A:
        nowins += 1

print(1.*nowins/norounds)
print("Should be 85% if we chose the optimal strategy.")

