import numpy as np
from numpy import random
import math


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
    
def ComposeQubit(a,b):
    res = np.tensordot(a,b,axes=0).flatten()
    return res

def ComposeDensity(a,b):
    res =  np.tensordot(a,b,axes=0)
    res = np.block( [ [res[0,0], res[0,1]],[res[1,0], res[1,1]]]   )
    return res
    
def BellState(type=0):
    if type == 0:
        res = ComposeQubit(Q0,Q1) + ComposeQubit(Q1,Q0)
        res = normalize(res)
    elif type == 1:
        res = ComposeQubit(Q1,Q1) + ComposeQubit(Q0,Q0)
        res = normalize(res)
    else:
        print("Wrong qubit type, quitting.")
        exit()
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

            
def MeasureAlphaComposite(system,alpha,compQno=0):
    """Given a 2-qubit system, we measure on Qubit no. compQno,
    whether it is in state alpha. We return the outcome of the measurement
    as well as the transformed system.
    system here is a density matrix.
    """
    Qalpha = GenerateQubit(alpha=alpha)
    
    #We use Born rule to first determine the probability
    #and then transform the state
    Id = np.eye(2)
    PPart = np.outer(Qalpha,Qalpha)
    PPartPrime = Id - PPart
    if compQno == 0:
        Proj      = ComposeDensity(PPart, Id)
        ProjPrime = ComposeDensity(PPartPrime,Id)
    else:
        Proj      = ComposeDensity(Id,PPart)
        ProjPrime = ComposeDensity(Id,PPartPrime)

    Prob = np.trace(np.matmul(Proj,system))
    
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
    print("Either True and |11> or True and |00>")
    alpha = 0
    resAnticipate = ComposeQubit(Q0,Q0)
    system = BellState(type=1)
    system = np.outer(system,system) #We need a density matrix
    print(system)
    res, Qres = MeasureAlphaComposite(system,alpha,compQno=0)
    print(res)
    print((Qres))