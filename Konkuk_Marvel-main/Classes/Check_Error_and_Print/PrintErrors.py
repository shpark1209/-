class PrintErrors:
    def __init__(self, ):
        pass
    
    def printUserOptionError():
        print("유저 수 설정값이 이상합니다. 유저 수를 다시 설정해주세요.")
        print("Enter를 누르면 프로그램을 종료합니다.")
        input()
        exit()
    
    def printStartMoneyError():
        print("시작 돈 설정값이 이상합니다. 시작 돈을 다시 설정해주세요.")
        print("Enter를 누르면 프로그램을 종료합니다.")
        input()
        exit()
        
    def printCommandError(min_value: int, max_value: int):
        print("Error: 잘못된 값이 입력되었습니다. {}와 {}사이의 값을 입력해주세요.".format(min_value, max_value))
    
    def printTravelCityNameError():
        print("Error: 입력하신 도시 이름이 이상합니다. 다시 확인해주세요.")
    def printCommandError2(user_index:int):
        print("Error: 잘못된 값이 입력되었습니다. 다시 입력해주세요.")

    def printCommandError3(u_have:list):
        print("Error: 잘못된 값이 입력되었습니다. {}중 숫자를 입력해주세요.".format(u_have))
