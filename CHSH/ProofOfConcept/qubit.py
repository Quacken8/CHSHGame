import numpy as np
from numpy import random
import math


#Alpha here ranges from 0 to 360.
#We choose this representation to avoid imaginary numbers.

def normalize(x):
    return x/np.sqrt(np.dot(x,x))

def GenerateQubit(alpha=0,random=False):
    """Generates either a qubit with angle alpha (in dg), or a random qubit."""
    if random:
        x = random.rand()
        y = 1. - x**2
    else:
        alpha = alpha % 360
        alpha = alpha/180.*np.pi
        x = np.cos(alpha)
        y = np.sin(alpha)
        
    res = np.array([x, y])
    return res

Q0 = np.array([1.,0.], dtype=float)
Q1 = np.array([0.,1.], dtype=float)
    

def AddQubit(a,b):
    res = a + b
    res = normalize(res)
    return res

def Compose(a,b):
    res = np.kron(a,b)
    return res
    
def BellState(type=0):
    if type == 0:
        res = Compose(Q0,Q1) + Compose(Q1,Q0)
    elif type == 1:
        res = Compose(Q1,Q1) + Compose(Q0,Q0)
    else:
        print("Wrong qubit type, quitting...")
        exit()
    res = normalize(res)
    return res


###Measurements

def MeasureAlpha(qubit,alpha,composite=False,compQno=0):
    """
    Given a qubit, we measure if it's in a state with angle=alpha (in dg).
    If yes, returns True and Qubit corresponding to alpha.
    If no, returns False and Qubit corresponding to 90-alpha.
    """
    Qalpha = GenerateQubit(alpha=alpha)
    QalphaPrime = GenerateQubit(alpha=(90-alpha)) #Not sure about this line
    Prob = ( np.dot(Qalpha,qubit) )**2
    x = random.rand()
    if x < Prob:
        Qres = Qalpha
        res = True
    else:
        Qres = QalphaPrime
        res = False
    return res, Qres

def MeasureAlphaComposite(system,measure,compQno=0):
    """Given a 2-qubit system, we measure on Qubit no. compQno,
    whether it is in state alpha. We return the outcome of the measurement
    as well as the transformed system.
    system here is a density matrix.
    """

    #We use Born rule to first determine the probability
    #and then transform the state
    Id = np.eye(2)
    PPart = np.outer(measure,measure)
    PPartPrime = Id - PPart
    if compQno == 0:
        Proj      = Compose(PPart, Id)
        ProjPrime = Compose(PPartPrime,Id)
    else:
        Proj      = Compose(Id,PPart)
        ProjPrime = Compose(Id,PPartPrime)

    Prob = np.trace(np.matmul(Proj,system))
    if 0: #Sanity check
        ProbPrime = np.trace(np.matmul(ProjPrime,system))
        print(Prob+ProbPrime)
        exit()
    
    x = random.rand()
    if x < Prob:
        Qres = np.linalg.multi_dot([Proj,system,Proj]) / Prob
        res = True
    else:
        Qres = np.linalg.multi_dot([ProjPrime,system,ProjPrime]) / (1. - Prob)
        res = False
    
    return res, Qres

if __name__ == "__main__":
    #Sanity checks

    print("###########")
    print("Test no. 1")
    print("Should sometimes be true and [1,0] and sometimes false and [0,1] (with P=.5)")
    alpha = 0
    Qtest = GenerateQubit(alpha=45)
    res, Qres = MeasureAlpha(Qtest,alpha)
    print(res)
    print(Qres)
    
    print("##########")
    print("Test no. 2")
    print("Either False and |11> or True and |00>")
    alpha = GenerateQubit(0)
    resAnticipate = Compose(Q0,Q0)
    system = BellState(type=1)
    system = np.outer(system,system) #We need a density matrix
    print(system)
    res, Qres = MeasureAlphaComposite(system,alpha,compQno=0)
    print(res)
    print((Qres))
    
    print("##########")
    print("Test no. 3")
    print("Should always be true.")
    first  = AddQubit(Q1*32,Q0*23)
    second = AddQubit(Q0*32,Q1*23)
    system = Compose(first,second)
    system = np.outer(system,system)
    
    A, B = MeasureAlphaComposite(system,first,compQno=0)
    print(A)
    