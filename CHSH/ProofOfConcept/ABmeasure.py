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
    A = x and y   #Logical and (denoted as ^)
    B = a ^ b     #XOR         (denoted as \oplus)
    return A == B

def OneRound(x,y,Shared=SharedDensityMatrix,verbosity=0):
    """https://en.wikipedia.org/wiki/CHSH_inequality#Optimal_quantum_strategy"""
    if x == False:
        AliceMeasure = qubit.Q1  #State |1> (will give 1 if measured)
    else:
        AliceMeasure = qubit.AddQubit(qubit.Q0,-qubit.Q1) #State |->
    if y == False:
        BobMeasure = qubit.AddQubit(-np.sin(np.pi/8)*qubit.Q0,np.cos(np.pi/8)*qubit.Q1) #State (-sin pi/8 = cos 5pi/8) |0> + ...
    else:
        BobMeasure = qubit.AddQubit(np.sin(np.pi/8)*qubit.Q0,np.cos(np.pi/8)*qubit.Q1)  #State  (sin pi/8 = cos 3pi/8) |0> + ...

    if verbosity >= 1: print("x: "+str(x)+" y: "+str(y))
    #First, Alice Measures.
    Ares, AQres = qubit.MeasureAlphaComposite(Shared,AliceMeasure,compQno=0)

    #Then, Bob measures.
    Bres, BQres = qubit.MeasureAlphaComposite(AQres,BobMeasure,compQno=1)

    win = IsSuccess(x,y,Ares,Bres)
    
    return win

def Play(generatorx,generatory,norounds=1000):
    nowins = 0
    for i in range(norounds):
        x = generatorx()
        y = generatory()
        A = OneRound(x,y)
        if A:
            nowins += 1
    winpercent = 1.*nowins/norounds
    return winpercent

def randombit():
    return bool(random.getrandbits(1))

print("Playing CHSH...")
print("WP should be 85% if we choose the optimal strategy.")

wp = np.zeros(4)
#wp[-1] = Play(randombit,randombit)
for i in range(2):
    for j in range(2):
        wp[i*2+j] = Play(lambda : bool(i), lambda : bool(j))
        print("WP for x="+str(i)+" and y="+str(j)+": "+str(wp[i*2+j]))
wp_random = np.sum(wp)/4
print("Total WP: "+str(wp_random))
