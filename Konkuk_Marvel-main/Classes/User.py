import Classes.ReadOptionFile as RF
from Classes.Building_info import bi_info as bi

class User:
    def __init__(self, index: int, start_money: int, location: int = 0, travel: bool = False,island: bool = False, weight: int = 1):
        self.user_number=index
        self.weight = weight
        self.user_money=start_money
        self.stay=0
        self.location=0
        self.status=True
        self.user_have = {}
        self.travel=travel
        self.island=island
    
    def buyland(self, location):
        if self.user_money>bi.section_cost[location]*self.weight*10000:
            self.user_money=self.user_money-bi.section_cost[location]*self.weight*10000
            self.user_have[location] = None
            return 1
        else:
            return self.user_money-bi.section_cost[location]*self.weight*10000
    
    def buybuilding(self, location):
        print('설치할 시설을 선택해주세요. \nK) K-Cube R) Restio C) CU\n설치할 시설: ')
        while(True):
            building=input()
            if building in ["K", "R", "C"]:
                break
            else:
                print("K, R, C 중 하나를 입력해주세요.")
        #print(bi.shop_cost["K"][location])
        
        if(bi.shop_cost["K"][location] == None):
            print("구매할 수 없는 구역입니다.")
            print('Enter를 누르시면 다음 턴으로 넘어갑니다.')
            input()
            return building, 0
        
        if(building=='K'):
            if self.user_money>bi.shop_cost['K'][location]*self.weight*10000:
                self.user_money=self.user_money-bi.shop_cost['K'][location]*self.weight*10000
                self.user_have[location] = building
                return building, 1
            else:
                return building, self.user_money-bi.shop_cost['K'][location]*self.weight*10000
        elif(building=='R'):
            if self.user_money>bi.shop_cost['R'][location]*self.weight*10000:
                self.user_money=self.user_money-bi.shop_cost['R'][location]*self.weight*10000
                self.user_have[location] = building
                return building, 1
            else:
                return building, self.user_money-bi.shop_cost['R'][location]*self.weight*10000
        elif(building=='C'):
            if self.user_money>bi.shop_cost['C'][location]*self.weight*10000:
                self.user_money=self.user_money-bi.shop_cost['C'][location]*self.weight*10000
                self.user_have[location] = building
                return building, 1
            else:
                return building, self.user_money-bi.shop_cost['C'][location]*self.weight*10000
        else:
            print('K, R, C 중 하나를 입력해주세요\n')
            self.buybuilding(location)              
