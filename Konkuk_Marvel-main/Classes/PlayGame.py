import os
import random
import pickle
from Classes.Building_info import bi_info as bi

from Classes.User import User
from Classes.GameBoard import GameBoard
from Classes.ReadOptionFile import ReadOptionFile
from Classes.Check_Error_and_Print.CheckValues import CheckValues
from Classes.Check_Error_and_Print.PrintErrors import PrintErrors


class PlayGame:
    def __init__(self, ):
        self.usersList = list()
        self.gameBoard = GameBoard()
        self.salary = 100000
        self.cityIndexDict = {}
        self.donation = 0
        self.fee = 400000
        self.weight = 0
        self.round = 0
        self.turn = 0
        self.CallingFlag = 0
        
        for index, city in enumerate(self.gameBoard.board.values()):
            self.cityIndexDict[city["name"]] = index
   
    def process(self, ):
        if self.CallingFlag == 0:
            user_num, start_money = self.getOptionValues()
            self.setWeight(start_money=start_money)
            self.setSalary(start_money=start_money)
            self.setFee(start_money=start_money)
            
            self.setUsersList(user_num=user_num, start_money=start_money, weight = self.weight)
            self.gameBoard = GameBoard(user_num=user_num)
               
        
        elif self.CallingFlag == 1:
            user_num = len(self.usersList) 
            
        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
        
        while CheckValues.checkUsersStatus(self.usersList, user_num) and self.round < 10:           # 모두 파산하거나 총 10라운드를 완료하면 게임 종료
            for index in range(self.turn, user_num):                                                # 라운드 시작(모든 user가 1회의 턴을 소비할 시 1회의 라운드 종료)
                user=self.usersList[index]                                                          # user: 현재 턴의 user를 담아놓는 변수
                moving_dice = True                                                                  # 현재 턴에서 따릉이를 통해 여행을 해서 이동했는지, 주사위를 통해서 이동했는지 체크하는 변수
                while(CheckValues.checkUsersStatus(self.usersList, user_num) and user.status):      # 조건에 따라 여러 번 반복(더블과 같은 경우)할 수 있으므로 반복문 사용
                    if user.travel:
                        GamePromptPrint.printTravelExit(index=index)
                        
                        while(True):                                                                    # 올바른 명령이 들어올 때까지 명령을 받아옴.
                            GamePromptPrint.printInputCommand()                                         # "명령어: "를 출력하는 함수.
                            try:
                                command = int(input())                                                  # ValueError가 발생할 수 있는 지점
                                if CheckValues.checkCommand(command=command, min_value=1, max_value=2): # 만약 정수이고 조건을 만족한다면(1이상 2이하) 반복문을 탈출함.
                                    break
                                else:                         
                                    PrintErrors.printCommandError(min_value=1, max_value=2)             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                                    continue
                            except ValueError as e:                                                     # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                                PrintErrors.printCommandError(min_value=1, max_value=2)
                        
                    else:
                        GamePromptPrint.printDiceExit(index=index)                                  # 사용할 수 있는 명령 출력
                    
                        while(True):                                                                    # 올바른 명령이 들어올 때까지 명령을 받아옴.
                            GamePromptPrint.printInputCommand()                                         # "명령어: "를 출력하는 함수.
                            try:
                                command = int(input())                                                  # ValueError가 발생할 수 있는 지점
                                if CheckValues.checkCommand(command=command, min_value=1, max_value=3): # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                                    break
                                else:                         
                                    PrintErrors.printCommandError(min_value=1, max_value=3)             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                                    continue
                            except ValueError as e:                                                     # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                                PrintErrors.printCommandError(min_value=1, max_value=3)
                
                    if command == 2:
                        exit()          # 추후 강제 종료시 명령 프로프트로 들어갈지 그대로 프로그램을 종료할지 결정 필요.
                    
                    elif command == 3:
                        self.turn = index
                        self.CallingFlag = 1
                        with open('SavedGame.pkl', 'wb') as f: pickle.dump(self, f, protocol=pickle.HIGHEST_PROTOCOL)
                        exit()
                    
                    if user.island:     # 무인도에 도착한 직후의 턴에는 주사위를 던지지 않고 다른 사람의 턴으로 넘긴다.
                        self.handelIsland(user=user)
                        GamePromptPrint.printIslandStatus()
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        break
                    
                    elif user.travel:
                        self.handelTravel(user=user, user_index=index)
                        moving_dice = False
                    
                    else:
                        dice1, dice2 = self.handelDice(user=user, user_index=index)
                        moving_dice == True
                    
                    if user.location == 6:
                        user.island = True
                    elif user.location== 10:
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        self.handelDonation(user_index=index, user=user)
                    elif user.location==11:
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        self.handelBullKey(user_index=index, user=user)
                    else: 
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        self.handelBaseReaction(user_index=index, user=user, gameboard=self.gameBoard)
                        
                    if user.location == 16:
                        user.travel = True
                    
                    GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                    if not moving_dice or dice1 != dice2 or user.location == 6 or user.location == 16: break    # 더블이 아니거나 무인도 혹은 국제처 도달 시 다음 유저의 턴으로 넘어감.
                    else: GamePromptPrint.doubleEvent(dice1=dice1, dice2=dice2)                                 # 이외에 더블이 나오는 경우는 모두 해당 유저의 턴을 다시 수행함.
                    
            self.round += 1
            self.turn = 0 

    def overbill(self, user_index, cost, owner_index):
        L = []
        user = self.usersList[user_index]
        total = 0 #파산 판별
        c_total = 0 #목표 되는지 판별
        costD = {}
        print("소유한 구역 현황 및 가격입니다.")
        print("건물번호 / 건물이름 / 상점정보 / 가격")
        for i in user.user_have.keys(): #i=location
            city_name = self.gameBoard.board[i]["name"]
            if bi.shop_cost['K'][i] == None:
                costD[i] = (bi.section_cost[i])*self.weight*10000*6//10
                print(i, "/", city_name, "/", costD[i])
            else: 
                shop = user.user_have[i]
                if (shop == None): 
                    shop_c = (bi.section_cost[i])*self.weight*10000*6//10
                    shop = "땅"
                else: 
                    shop_c = (bi.section_cost[i]+bi.shop_cost[shop][i])*self.weight*10000*6//10
                    if shop == "K": shop = "K-Cube"
                    elif shop == "R": shop = "Restio"
                    elif shop == "C": shop = "CU"
                print(i, "/", city_name, "/", shop, "/", shop_c)
                costD[i] = shop_c
        
        total = 0
        for key in costD.keys():
            # if owner_index == -3 and user.location == key: continue
            total += costD[key]

        print("지불해야 할 금액:", cost)
        print("지불 가능한 금액:", total)

        if total <= cost :
            for location in user.user_have.keys():
                if self.gameBoard.board[location]['building'] == "L":
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
                elif self.gameBoard.board[location]['building'] in ["K", "R", "C"]:
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
                
            user.user_have = dict()
            user.user_money = 0
            user.status=False
            return False
            
        else:
            prev_user_money = user.user_money
            user.user_money = 0
            
            while(c_total<cost):
                L = self.sellinput(D=user.user_have, location=user.location, owner_index=owner_index)
                for a in L:
                    c_total += costD[a]
                self.sell(user_index, L)
                print("지불해야 할 금액 :", cost, " | 현재 선택한 금액 : ", c_total)
            
            user.user_money -= cost
            
            if owner_index == -1:
                self.donation = self.fee
            else:
                owner = self.usersList[owner_index]
                owner.user_money += prev_user_money + cost
            
            print("지불이 완료되었습니다.")
            return True
        
    def sellinput(self, D, location, owner_index):
        temp = 0
        while(temp == 0):
            print("매각할 건물을 입력해주세요.")
            print("숫자 사이에는 빈칸만 가능합니다. 예시) 1 5    7")
            print("입력: ", end="")
            selectL = input().split()
            for i in range(len(selectL)):
                try:
                    selectL[i] = int(selectL[i])
                    temp+=1
                    
                except:
                    temp = 0
                    break
            if(temp == 0):
                print("잘못된 입력입니다.")
            else:
                for i in selectL:
                    if i in D:
                        continue
                    else:
                        temp = 0
        return selectL
        
    def sell(self, user_index, location):
        user = self.usersList[user_index]
        for i in (location):
            if self.gameBoard.board[i]['building'] == "L":
                user.user_money+= bi.section_cost[i]*self.weight*10000*6//10
                self.gameBoard.board[i]['building']="None"
                self.gameBoard.board[i]['owner']='0'
            elif self.gameBoard.board[i]['building'] in ["K", "R", "C"]:
                user.user_money+= (bi.section_cost[i]+bi.shop_cost[self.gameBoard.board[i]['building']][i])*self.weight*10000*6//10
                self.gameBoard.board[i]['building']="None"
                self.gameBoard.board[i]['owner']='0'
            del(user.user_have[i])
            
    def bill(self, user1: int, user2: int): #user1이 user2의 땅을 밟았다.
        user1_pos = self.usersList[user1].location
        owner = int(self.gameBoard.board[user1_pos]["owner"]) #index
        shop = self.usersList[user2].user_have[user1_pos] #"K", "R", "C" - 시설
        
        if user1_pos == 4:
            land_cost = 600000*self.weight
        if user1_pos == 12:
            land_cost = 300000*self.weight
        if user1_pos == 16:
            land_cost = 200000*self.weight
        if user1_pos == 17:
            land_cost = 2000000*self.weight
        
        else:
            land_cost = (bi.section_cost[user1_pos])*self.weight*10000   
            if shop == None: land_cost = land_cost//3
            elif shop == "K": land_cost = land_cost//2
            elif shop == "R": land_cost = land_cost 
            elif shop == "C": land_cost = land_cost*2
        
        if self.usersList[user1].user_money >= land_cost:
            self.usersList[user1].user_money -= land_cost
            self.usersList[user2].user_money += land_cost
            return 0

        else:
            GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
            GamePromptPrint.printIsBankrupt(user1)
            while(True):
                GamePromptPrint.printInputCommand()
                try:
                    buyorbankrupt=int(input())
                    if CheckValues.checkCommand(command=buyorbankrupt, min_value=1, max_value=2):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                        break
                    else:                         
                        PrintErrors.printCommandError(min_value=1, max_value=2)                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                        continue
                except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    PrintErrors.printCommandError(min_value=1, max_value=2)
            if(buyorbankrupt==1):    
                cost = land_cost - self.usersList[user1].user_money 
                self.overbill(user_index=user1, cost=cost, owner_index=user2)
            else:
                self.usersList[user2].user_money += self.usersList[user1].user_money
                self.usersList[user1].user_money = 0
                self.usersList[user1].status=False 
                for location in self.usersList[user1].user_have.keys():
                    if self.gameBoard.board[location]['building'] == "L":
                        self.gameBoard.board[location]['building']="None"
                        self.gameBoard.board[location]['owner']='0'
                    elif self.gameBoard.board[location]['building'] in ["K", "R", "C"]:
                        self.gameBoard.board[location]['building']="None"
                        self.gameBoard.board[location]['owner']='0'
            
            print('Enter를 누르시면 다음 턴으로 넘어갑니다.')
            input()
            
    def rollDice(self, ):
        '''
        ToDo: 주사위를 굴리고 나온 두 개의 값을 반환한다.
        '''
        dice1, dice2 = random.randint(1,4), random.randint(1,4)
        return (dice1, dice2)

    
    def YesorNo(self, exactinput):
        listofinput=['y', 'n']
        if exactinput in listofinput:
            return 1
        else:
            return -1

    def moveUser(self, user: User, sum_of_dices: int, user_index: int):
        '''
        ToDo: 주사위에서 나온 숫자를 통해 user 위치를 판에서 이동시킨다.
        '''
        self.gameBoard.board[user.location]['user'][user_index] = 0
        
        user.location += sum_of_dices
        if user.location >= 20:
            user.location %= 20
            user.user_money += self.salary
        
        try: 
            self.gameBoard.board[user.location]['user'][user_index] = 1
        except KeyError as e:
            print(user.location, user_index)
            exit()
    
    def travleUser(self, user: User, city_num: int, user_index: int):
        '''
        ToDo: 유저가 여행가려고 하는 위치로 이동시킨다.
        '''
        self.gameBoard.board[user.location]['user'][user_index] = 0
        user.location = city_num        
        self.gameBoard.board[user.location]['user'][user_index] = 1
        
    def getOptionValues(self, ):    
        '''
        ToDo: Option.txt 파일의 내용이 올바른지 확인하고 
        올바르지 않으면 프로그램을 종료하고 올바르면 user, s_money값을 반환한다.
        '''
        gameBoard = GameBoard()
        readOptionFile = ReadOptionFile()
        
        readOptionFile.set_option_values()  # Option.txt 파일 내용 불러옴.
        
        # user option값 확인
        try:
            user_num = int(readOptionFile.option_values['user'])
        except ValueError as e:
            PrintErrors.printUserOptionError()
        
        if not(CheckValues.checkUserNum(user_num)):
            PrintErrors.printUserOptionError()
        
        # s_money option값 확인
        try:
            start_money = int(readOptionFile.option_values['s_money'])
        except ValueError as e:
            PrintErrors.printStartMoneyError()
        
        if not(CheckValues.checkStartMoney(start_money)):
            PrintErrors.printStartMoneyError()
        
        return (user_num, start_money)
    
    def setUsersList(self, user_num: int, start_money: int, weight: int = 1):
        '''
        ToDo: user_num개의 유저 인스턴스를 가지고 있는 usersList를 초기화한다.
        '''
        self.usersList = [User(index=index, start_money=start_money, weight=weight) for index in range(user_num)] 

    def setWeight(self, start_money: int):
        self.weight = start_money // 2500000
    
    def setSalary(self, start_money: int):
        '''
        ToDo: 한 바퀴 돌았을 때 받는 월급을 담는 salary를 초기화한다.
        '''
        self.salary = start_money // 25
        
    def setFee(self, start_money: int):
        self.fee=start_money//25*4
    
    def handelDice(self, user: User, user_index: int):
        dice1, dice2 = self.rollDice()  
        self.moveUser(user=user, sum_of_dices=dice1+dice2, user_index=user_index)
        return dice1, dice2
        
    def handelIsland(self, user: User):
        user.island = False
    
    def handelTravel(self, user: User, user_index: int):
        while True:
            print("이동하고 싶은 지역을 입력해주세요(따릉이 제외): ", end="")
            
            try:
                city = input()
                city_num=self.cityIndexDict[city]
                
                if city_num == 16:
                    print("따릉이 지역으로는 이동할 수 없습니다.")
                    print()
                    continue
                self.travleUser(user=user, city_num=city_num, user_index=user_index)
                
                if city_num < 16 and 0 <= city_num:
                    user.user_money += self.salary
                user.travel = False
                break
            except KeyError as e:
                PrintErrors.printTravelCityNameError()
                continue
    
    def card6(self, user_index:int, user:User):
        GamePromptPrint.bullkey6()
        if(user.user_money>=self.salary*2):
            user.user_money-=self.salary*2
            print("기숙사비가 납부되었습니다.")
            print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
            input()
            return
        else:
            user.user_money=0
            user.status=False
            for location in user.user_have.keys():
                if self.gameBoard.board[location]['building'] == "L":
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
                elif self.gameBoard.board[location]['building'] in ["K", "R", "C"]:
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
            user.user_have=dict()
            print('현금이 없어 파산했습니다!')
            print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
            input()
            return
            
    def card5(self, user_index:int, user:User):
        GamePromptPrint.bullkey5(user_index)
        
        if(len(user.user_have.keys())!=0):
            u_location=[]
            for location in user.user_have.keys():
                u_location.append(location)
                city_name=self.gameBoard.board[location]["name"]
                print("{}.{}".format(location, city_name))
            
            while(True):                                                                        
                GamePromptPrint.printInputCommand()                                             
                try:
                    sellcommand = int(input())                                                   # ValueError가 발생할 수 있는 지점
                    if CheckValues.checkCommand3(command=sellcommand, u_location=u_location):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                        break
                    else:                         
                        PrintErrors.printCommandError3(u_location)                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                        continue
                except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    PrintErrors.printCommandError3(u_location)
            self.gameBoard.board[sellcommand]['building']="None"
            self.gameBoard.board[sellcommand]['owner']='0'
            del(user.user_have[sellcommand])
            print("{}이 반납되었습니다.".format(self.gameBoard.board[sellcommand]["name"]))
            print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
            input()
        else:
            print("소유하고 있는 구역이 없습니다.")
            print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
            input()
        
    def card4(self, user_index:int, user:User):
        GamePromptPrint.bullkey4(user_index)
        for i in range (1,len(self.usersList)+1):
            if i == user_index+1:pass
            else: print("{}. user{}".format(i,i))
        while(True):
            GamePromptPrint.printInputCommand()
            try:
                fetchcommand=int(input())
                if CheckValues.checkCommand(command=fetchcommand, min_value=1, max_value=len(self.usersList)):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                    if(CheckValues.checkCommand2(fetchcommand, user_index+1)):
                        break
                    else:
                        PrintErrors.printCommandError2(user_index+1)
                else:                         
                    PrintErrors.printCommandError(min_value=1, max_value=len(self.usersList))                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    continue
            except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                PrintErrors.printCommandError(min_value=1, max_value=len(self.usersList))
        fetchcommand-=1
        if self.usersList[fetchcommand].user_money>self.salary:
            self.usersList[fetchcommand].user_money-=self.salary
            self.usersList[user_index].user_money+=self.salary
        else:
            other_player=self.usersList[fetchcommand]
            other_player.user_money=0
            other_player.status=False
            for location in other_player.user_have.keys():
                if self.gameBoard.board[location]['building'] == "L":
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
                elif self.gameBoard.board[location]['building'] in ["K", "R", "C"]:
                    self.gameBoard.board[location]['building']="None"
                    self.gameBoard.board[location]['owner']='0'
            other_player.user_have=dict()
            print('현금이 없어 파산했습니다!')
            print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
            input()
            return

    def card3(self, user_index:int, user:User):
        print("[장학금 당첨] 카드를 뽑았습니다!")
        print("장학금으로 {}을 받았습니다.".format(self.salary*3))
        user.user_money += (self.salary*3)
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()

    def card2(self, user_index:int, user:User):
        print("[시설 파괴] 카드를 뽑았습니다!")
        print("파괴할 시설의 주인을 선택해주세요")
        cnt=0
        for index in range(1,len(self.usersList)+1):
            if index-1 == user_index:pass
            elif len(self.usersList[index-1].user_have)==0:pass
            else: cnt+=1
        
        if(cnt==0):
            print("시설을 소유하고 있는 사용자가 없습니다.")
            print("Enter를 누르면 다음으로 넘어갑니다.")
            input()
            return
        
        unable = []
        for index in range(1,len(self.usersList)+1):
            if index-1 == user_index:pass
            elif len(self.usersList[index-1].user_have)==0: unable.append(index)
            else: 
                print("{}: user {}".format(index, index))
            
        while(True):
            GamePromptPrint.printInputCommand()
            try:
                sellcommand=int(input())
                if CheckValues.checkCommand(command=sellcommand, min_value=1, max_value=len(self.usersList)):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                    if(sellcommand in unable):
                        print("소유한 땅 혹은 시설이 없는 사용자 입니다. 다시 선택해주세요.")    
                    elif(CheckValues.checkCommand2(sellcommand, user_index+1)):
                        break
                    else:
                        PrintErrors.printCommandError2(user_index+1)
                else:                         
                    PrintErrors.printCommandError(min_value=1, max_value=len(self.usersList))   # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    continue
            except ValueError as e:                                                             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                PrintErrors.printCommandError(min_value=1, max_value=len(self.usersList))  
        sellcommand-=1
        u_location=[]
        for location in self.usersList[sellcommand].user_have.keys():
            city_name=self.gameBoard.board[location]["name"]
            print("{}.{}".format(location, city_name))
            u_location.append(location)
        while(True):                                                                        
            GamePromptPrint.printInputCommand()                                             
            try:
                sellbuilding = int(input())                                                     # ValueError가 발생할 수 있는 지점
                if CheckValues.checkCommand3(command=sellbuilding, u_location=u_location):      # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                    break
                else:                         
                    PrintErrors.printCommandError3(u_location)                                  # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    continue
            except ValueError as e:                                                             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                PrintErrors.printCommandError3(u_location)
        self.gameBoard.board[sellbuilding]['owner']='0'
        self.gameBoard.board[sellbuilding]['building']="None"
        del(self.usersList[sellcommand].user_have[sellbuilding])
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()
        
    def card1(self, user_index: int, user: User, usersList: list):
        
        print("[구역 기부] 카드를 뽑았습니다!")
        
        if len(user.user_have) == 0:
            print("소유한 구역이 없습니다.")
            print("Enter를 누르면 다음으로 넘어갑니다.")
            input()
            return

        print("기부할 자신의 구역을 선택해주세요")
        print("이 소유한 구역 목록")

        haveL = [] #가진 건물의 건물번호 list
        for i in range(0,20):
            if self.gameBoard.board[i]["owner"] == user_index+1:
                haveL.append(i+1)
        
        for i in haveL:
            print(str(i)+".", self.gameBoard.board[i]["name"])
        
        print("기부할 건물을 입력해주세요.")
        while(True):                                                                        
            GamePromptPrint.printInputCommand()                                             
            try:
                A = int(input())
                print("command: ", A)                                                     # ValueError가 발생할 수 있는 지점
                print("type: ", type(A))
                if CheckValues.checkCommand3(command=A, u_location=haveL):      # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                    break
                else:                         
                    PrintErrors.printCommandError3(haveL)                                  # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    continue
            except ValueError as e:                                                             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                PrintErrors.printCommandError3(haveL)
        #temp_L = []
        #for a in haveL:
        #    temp_L.append(str(a))

        #while(True):
        #    if A in temp_L:
        #        break
        #    else:
        #        print("Error: 잘못된 값이 입력되었습니다.",haveL,"중 숫자를 입력해주세요.")
        #        A = input("명령어 : ")
        don_num = int(A) #선택된 기부할 땅 번호
        B = ""
        B += self.gameBoard.board[don_num]["name"]
        B += "이 반납되었습니다."
        print(B)
        print("기부할 다른 유저를 선택해주세요.")

        able_users = [0, 1, 2, 3]
        able_users.remove(user_index)

        for able_user in able_users:
            print("{}. 유저 {}".format(able_user+1, able_user+1))
        
        
        #command = int(input("명령어 : "))
        #while(True):
        #    if command-1 in able_users:
        #        break
        #    else:
        #        print("Error: 잘못된 값이 입력되었습니다. [{}, {}, {}] 중 숫자를 입력해주세요.".format(able_users[0]+1, able_users[1]+1, able_users[2]+1))
        #        command = int(input("명령어 : "))
        while(True):                                                                        
            GamePromptPrint.printInputCommand()                                             
            try:
                command = int(input())
                print("command: ", command)                                                     # ValueError가 발생할 수 있는 지점
                print("type: ", type(command))
                if CheckValues.checkCommand3(command=command, u_location=able_users):      # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                    break
                else:                         
                    PrintErrors.printCommandError3(able_users)                                  # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    continue
            except ValueError as e:                                                             # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                PrintErrors.printCommandError3(able_users)
        self.gameBoard.board[don_num]["owner"] = command
        self.usersList[command-1].user_have[don_num] = user.user_have[don_num]
        
        del(user.user_have[don_num])

        return 

    def handelBullKey(self, user_index:int, user:User):
        randkey=random.randint(1,6)
        
        if randkey==1:
            self.card1(user_index, user, self.usersList)
        elif randkey==2:
            self.card2(user_index,user)
        elif randkey==3:
            self.card3(user_index,user)
        elif randkey==4:
            self.card4(user_index,user)
        elif randkey==5:
            self.card5(user_index, user)
        else:
            self.card6(user_index,user)
    
    def handelDonation(self, user_index:int, user: User):
        '''
        ToDo: 학사처 처리를 위한 함수
        '''
        
        if self.donation!=0:
            GamePromptPrint.printGetDonation()
            user.user_money+=self.donation
            self.donation=0
        else:
            GamePromptPrint.printPayFee()
            if(user.user_money>=self.fee):
                user.user_money-=self.fee
                self.donation+=self.fee
            else:
                GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                GamePromptPrint.printIsBankrupt(user_index)
                while(True):
                    GamePromptPrint.printInputCommand()
                    try:
                        buyorbankrupt=int(input())
                        if CheckValues.checkCommand(command=buyorbankrupt, min_value=1, max_value=2):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                            break
                        else:                         
                            PrintErrors.printCommandError(min_value=1, max_value=2)                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                            continue
                    except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                        PrintErrors.printCommandError(min_value=1, max_value=2)
                if(buyorbankrupt==1):
                    self.overbill(user_index, self.fee-user.user_money, owner_index=-1)
                    print('Enter를 누르시면 다음 턴으로 넘어갑니다.')
                    input()
                else:
                    user.status=False
    
    def handelBaseReaction(self, user_index: int, user: User, gameboard: GameBoard):
        '''
        ToDo: 구매 및 매각 처리를 위한 함수(일반 지역 방문시 처리를 위한 함수)
        '''
        if(self.gameBoard.board[user.location]["owner"]=='0' and self.gameBoard.board[user.location]["kind"]!='u'):           # 주인도 없고 구역이 구매가 가능한 경우
            GamePromptPrint.printBuyLand(user_index)
            while(True):                                                                        # 올바른 명령이 들어올 때까지 명령을 받아옴.
                GamePromptPrint.printInputCommand()                                             # "명령어: "를 출력하는 함수.
                try:
                    buycommand = int(input())                                                   # ValueError가 발생할 수 있는 지점
                    if CheckValues.checkCommand(command=buycommand, min_value=1, max_value=2):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                        break
                    else:                         
                        PrintErrors.printCommandError(min_value=1, max_value=2)                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                        continue
                except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    PrintErrors.printCommandError(min_value=1, max_value=2)
            if buycommand==1:
                print('구역을 구매하시겠습니까?(y/n)')
                while(True):
                        exact_input=input()
                        if(self.YesorNo(exact_input)==1):
                            break
                        else:
                            print('Error: 잘못된 값을 입력하였습니다. 다시 입력해주세요')
                            continue      
                if(exact_input=='y'):
                    cost=user.buyland(user.location)
                    if cost<0:
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        GamePromptPrint.printCantBuyArea()
                        
                    else:
                        self.gameBoard.board[user.location]['owner']=user_index+1
                        self.gameBoard.board[user.location]['building'] = "L"
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        print('구역 구매가 완료되었습니다.')
                        print('Enter를 누르시면 다음 턴으로 넘어갑니다.')
                        input()
                else:
                    pass
            if buycommand==2:
                exit()
        elif(int(self.gameBoard.board[user.location]["owner"])==user_index+1 and self.gameBoard.board[user.location]["kind"]=='n' and user.user_have[user.location] == None):  # 자신의 땅이고 건물을 지을 수 있을 때
            GamePromptPrint.printBuyBuilding(user_index)
            while(True):                                                                        # 올바른 명령이 들어올 때까지 명령을 받아옴.
                GamePromptPrint.printInputCommand()                                             # "명령어: "를 출력하는 함수.
                try:
                    buycommand = int(input())                                                   # ValueError가 발생할 수 있는 지점
                    if CheckValues.checkCommand(command=buycommand, min_value=1, max_value=2):  # 만약 정수이고 조건을 만족한다면(1이상 3이하) 반복문을 탈출함.
                        break
                    else:                         
                        PrintErrors.printCommandError(min_value=1, max_value=2)                 # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                        continue
                except ValueError as e:                                                         # 오류 문구를 띄우고 반복문의 처음으로 돌아감.
                    PrintErrors.printCommandError(min_value=1, max_value=2)
            if buycommand==1:
                print('시설을 설치하시겠습니까?(y/n)')
                while(True):
                        exact_input=input()
                        if(self.YesorNo(exact_input)==1):
                            break
                        else:
                            print('Error: 잘못된 값을 입력하였습니다. 다시 입력해주세요')
                            continue
                if(exact_input=='y'):
                    building, cost=user.buybuilding(user.location)
                    if cost<0: 
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        GamePromptPrint.printCantBuyBuilding()
                         
                    elif cost>0:
                        if user.user_have[user.location] != None:
                            self.gameBoard.board[user.location]['building'] = user.user_have[user.location]
                        GamePromptPrint.printBoard(round=self.round, usersList=self.usersList, gameBoard=self.gameBoard)
                        print('구역 구매가 완료되었습니다.')
                        print('Enter를 누르시면 다음 턴으로 넘어갑니다.')
                        input()
                        
                else: 
                    pass
            if buycommand==2:
                exit()
        elif(int(self.gameBoard.board[user.location]["owner"])!=user_index+1 and int(self.gameBoard.board[user.location]["owner"])!=0 and not self.gameBoard.board[user.location]["kind"]=='u'): # 자신의 땅이 아니고, 구매가 되어있는 구역이고, 살 수 있는 구역이라면
            self.bill(user_index, self.gameBoard.board[user.location]["owner"]-1)

    def printResult(self, ):
        max_money = 0

        result_list = []
        for user in self.usersList:
            if(max_money < user.user_money):
                max_money = user.user_money
                result_list = []
                result_list.append("Player {}".format(user.user_number+1))

            elif(result_list and max_money==user.user_money):
                result_list.append("Player {}".format(user.user_number+1))
                
        print("<우승자 명단>")
        for winner in result_list:
            print(winner)
        print("Enter 입력 시 프로그램이 종료됩니다.")
        input()
        os.system('cls')
    
class GamePromptPrint:
    
    def printBoard(round: int, usersList: list, gameBoard: GameBoard, clear_status: bool = True):
        if clear_status == True:
            os.system('cls')
        gameBoard.printBoardTop()
        gameBoard.printBoardLeftRight()
        gameBoard.printBoardBottom()
        
        user_num = len(usersList)
        print("현재 round: %d" % (round+1))
        for user_index in range(user_num):
            user = usersList[user_index]
            print("user%d : %7d" % (user_index+1, user.user_money))
        
    def printInputCommand():
        print("명령어: ", end="")
        
    def doubleEvent(dice1: int, dice2: int):
        print("더블!!! ({}, {})".format(dice1, dice2))
    
    def printIslandStatus():
        print("무인도에 갇힌 상태이므로 주사위를 던질 수 없습니다.")
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()
        
    def printGetDonation():
        print("축하합니다! 건국대 장학금에 당첨되셨습니다.")
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()

    def printPayFee():
        print("새 학기입니다. 등록금을 내셔야 합니다.")
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()
    def printCantBuyArea():
        print("돈이 부족하여 땅을 살 수 없습니다.")
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()
    def printCantBuyBuilding():
        print("돈이 부족하므로 시설을 살 수 없습니다.")
        print("Enter를 누르면 다른 유저의 턴으로 넘어갑니다.")
        input()
    def printDiceExit(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 주사위 굴리기")
        print("2. 강제 종료(저장 x)")
        print("3. 저장 후 종료")
        
    def printTravelExit(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 이동할 곳 선택")
        print("2. 강제 종료(저장 x)")

    def printBuyLand(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 구역 구매")
        print("2. 강제 종료(저장 x)")
    def printSellLand(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 구역 판매")
        print("2. 강제 종료(저장 x)")    
    def printBuyBuilding(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 시설 구매")
        print("2. 강제 종료(저장 x)")
        
    def printIsBankrupt(index: int):
        print("---------user{}의 턴---------".format(index+1))
        print("1. 매각 진행")
        print("2. 파산")
        
    def bullkey6():
        print("[기숙사비 납부] 카드를 뽑았습니다!")
        
    def bullkey5(index:int):
        print("[내 구역 반납] 카드를 뽑았습니다.")
        print("반납할 구역을 선택해주세요.")
        print("user{}이 소유한 구역 목록".format(index+1))

    def bullkey4(index:int):
        print("[다른 사용자 돈 강탈] 카드를 뽑았습니다!")
        print("빼앗아올 다른 유저를 선택해주세요")
    
