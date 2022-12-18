class bi_info:
    section_cost = [None,8,8,10,20,12,None,14,16,18,None,22,50,24,26,26,40,100,28,32]
    K1 = 5
    K2 = 10
    K3 = 15
    K4 = 20
    R1 = 7
    R2 = 14
    R3 = 21
    R4 = 28
    C1=10
    C2=20
    C3=30
    C4=40
    shop_cost = {
    "K" : [None,K1,K1,K1,None,K1,None,K2,K2,K2,None,K3,None,K3,K3,K3,None,None,K4,K4],
    "R" : [None,R1,R1,R1,None,R1,None,R2,R2,R2,None,R3,None,R3,R3,R3,None,None,R4,R4],
    "C" : [None,C1,C1,C1,None,C1,None,C2,C2,C2,None,C3,None,C3,C3,C3,None,None,C4,C4]}

    def __init__(self, x):
        self.A = x
        for a in range(0,len(self.section_cost)):
            if self.section_cost[a] is None:
                print(self.A)
                continue
        
            else:
                self.section_cost[a] = self.section_cost[a]*self.A