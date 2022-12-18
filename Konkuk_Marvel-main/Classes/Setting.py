from Classes.ReadOptionFile import ReadOptionFile
import pickle

class Setting:
    '''
    게임설정을 하는 클래스
    '''
    def __init__(self, ):
        self.file=ReadOptionFile()
        self.file.set_option_values()

    def setGame(self, ):
        print("**** 게임설정 ****")
        print('게임 설정을 기본 설정으로 실행하실 건가요?(y/n)')
        setting_yn=input()

        while(setting_yn not in ['y', 'n']):
            print('잘못된 입력값입니다.')
            print('\n게임 설정을 기본 설정으로 실행하실 건가요?(y/n)')
            setting_yn=input()
        
        if setting_yn == 'y': 
            print()
            self.printValues()
            
        else:
            #게임 설정 변경
            print('<유저 수 조정>\n')
            
            input_value = input("1) 2명 2) 3명 3) 4명\n")
            while(input_value not in ['1', '2', '3']):
                print('입력 가능한 수는 1~3입니다. 다시 입력해주세요\n')
                print('<유저 수 조정>')
                input_value = input("1) 2명 2) 3명 3) 4명\n")
            user_index = int(input_value)-1
            
            print('\n<금액 조정>')
            
            input_value = input("1) 2500000 2) 5000000 3) 10000000\n")
            while(input_value not in ['1', '2', '3']):
                print('입력 가능한 수는 1~3입니다. 다시 입력해주세요\n')
                print('<금액 조정>\n')
                input_value= input("1) 2500000 2) 5000000 3) 10000000\n")
            money_index = int(input_value)-1
            
            self.file.option_values['user']=self.file.able_values['user'][user_index]
            self.file.option_values['s_money']=self.file.able_values['s_money'][money_index]
            self.writeOption(self.file.option_values['user'], self.file.option_values['s_money'])
            
            print()
            self.printValues()
        
        print('해당 설정으로 게임이 설정됩니다. 설정하기 위해서 ENTER 키를 눌러주세요')
        input()

    def writeOption(self, player_number, player_money):
        option = {
            "user": player_number,
            "s_money": player_money
        }
        
        with open('option.pkl', 'wb') as f: pickle.dump(option, f, protocol=pickle.HIGHEST_PROTOCOL)
        
    def printValues(self,):
        print("유저 수: {}".format(self.file.option_values['user']))
        print("시작 돈: {}".format(self.file.option_values['s_money']))