class CheckValues:
    def __init__(self, ):
        pass
    
    def checkUserNum(user_num: int):
        if 2 > user_num or user_num > 4: return False
        else: return True
    
    def checkStartMoney(start_money: int):
        if start_money not in [2500000, 5000000, 10000000]: return False
        else: return True
    
    def checkUsersStatus(users_list: list, user_num: int):
        bankruptch = 0
        for user in users_list:
            if not(user.status):
                bankruptch += 1
        
        if bankruptch >= user_num-1:         # 게임 종료 조건(n명 중 파산 n-1명 이상 파산)
            return False
        else:                       
            return True
    
    def checkCommand(command: int, min_value: int, max_value: int):
        if min_value <= command and command <= max_value:
            return True
        else: return False
    def checkCommand2(command:int, user_index:int):
        if command != user_index:
            return True
        else: return False
    
    def checkCommand3(command:int, u_location):
        if command in u_location:
            return True
        else: return False
