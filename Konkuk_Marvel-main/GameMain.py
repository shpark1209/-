import os
import pickle

essentialFiles = [ 
                  "./Classes/Building_info.py", 
                  "./Classes/GameBoard.py",
                  "./Classes/PlayGame.py",
                  "./Classes/PrintHelp.py",
                  "./Classes/ReadOptionFile.py",
                  "./Classes/Setting.py",
                  "./Classes/User.py",
                  "./Classes/Check_Error_and_Print/CheckValues.py",
                  "./Classes/Check_Error_and_Print/PrintErrors.py",
                  "./Txt_files/CityInfo.txt",
                  "./Txt_files/Help1.txt",
                  "./Txt_files/Help2.txt",
                  "./Txt_files/Help3.txt",
                  "./Txt_files/Help4.txt",
                  "./Txt_files/Help5.txt",
                  ] # 필수로 존재해야 하는 파일들을 담고 있는 리스트
notExistFiles = []  # 필수로 존재해야 하는 파일중 없는 파일들을 담을 리스트

# 파일들 있는지 확인
for essentialFile in essentialFiles:
    if not os.path.exists(essentialFile):
        notExistFiles.append(essentialFile)

if notExistFiles:
    print("다음 파일들이 존재하지 않아 실행이 불가능합니다.\n")
    
    print("<존재하지 않는 파일>")
    for file in notExistFiles:
        print(file)
    exit()

from Classes.Setting import Setting
from Classes.PlayGame import PlayGame
from Classes.PrintHelp import PrintHelp
from Classes.User import User

class GameMain:
    def __init__(self, ):
        self.setting=Setting()
        self.playgame=PlayGame()
        self.printhelp=PrintHelp()
        
    def kmstart(self, ):
        os.system('cls')
        self.UI()
        print("건국마블에 오신 것을 환영합니다. 메뉴를 선택해주세요")
        print("1. 게임 설정")
        print("2. 게임 시작")
        print("3. 도움말")
        print("4. 종료")
        print("메뉴 번호 입력 : ", end = "")
        i = input()

        if i in "1234" and len(i) == 1:
            int(i)
        else:
            while(i not in "1234" or len(i)>1):
                print("잘못된 입력입니다. 다시 입력해주세요.")
                print("번호를 입력해주세요: ", end = "")
                i = input()   
            int(i)
        return i

    def konkukStart(self, ):
        b = self.kmstart()
        os.system('cls')
        a = int(b)
        if a == 1:
            #게임설정
            self.setting.setGame()
            self.konkukStart()
        if a == 2:
            #게임시작
            if os.path.exists('SavedGame.pkl'):
                print("저장된 게임이 존재합니다.")
                print("저장된 게임을 불러올까요?(y/n)")
                print("명령어: ", end="")
                command = input()
                while command != "y" and command !="n":
                    print("잘못된 명령어를 입력했습니다. y혹은 n을 입력해주세요.")
                    print("명령어: ", end="")
                    command = input()
                
                if command == 'y':
                    with open('SavedGame.pkl', 'rb') as f: self.playgame = pickle.load(f)
                    self.playgame.process()

                else:
                    self.playgame.process()
                
            else:
                self.playgame.process()
        if a == 3:
            #도움말
            self.printhelp.howToUse()
            self.konkukStart()
        if a==4:
            print("게임을 종료합니다.")
            exit
    #-------------------------------UI ------------------------

    def UI(self, ):
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□■□■□■□■■■■■□□■□□□□□■■■□□□■■■□□■□□□■□■■■■■□□■■■■■□□■■■□□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□■□■□■□■□□□□□□■□□□□■□□□■□■□□□■□■■□■■□■□□□□□□□□■□□□■□□□■□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□■□■□■□■■■■■□□■□□□□■□□□□□■□□□■□■□■□■□■■■■■□□□□■□□□■□□□■□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□■■□■■□■□□□□□□■□□□□■□□□■□■□□□■□■□□□■□■□□□□□□□□■□□□■□□□■□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□■□□□■□■■■■■□□■■■■□□■■■□□□■■■□□■□□□■□■■■■■□□□□■□□□□■■■□□□□□□□□□□□□□□□□□□□□□□")

        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
        print("□□□□□□□■□□□■□□■■■□□■□□□■□■□□□■□■□□□■□■□□□■□□□□□□■□□□■□□□■□□□■■■■□□■□□□■□■■■■■□□■□□□□□□□□□□□□")
        print("□□□□□□□■□□■□□■□□□■□■■□□■□■□□■□□■□□□■□■□□■□□□□□□□■■□■■□□■□■□□■□□□■□■□□□■□■□□□□□□■□□□□□□□□□□□□")
        print("□□□□□□□■■■□□□■□□□■□■□■□■□■■■□□□■□□□■□■■■□□□□□□□□■□■□■□■■■■■□■■■■□□■□□□■□■■■■■□□■□□□□□□□□□□□□")
        print("□□□□□□□■□□■□□■□□□■□■□□■■□■□□■□□■□□□■□■□□■□□□□□□□■□□□■□■□□□■□■□■□□□□■□■□□■□□□□□□■□□□□□□□□□□□□")
        print("□□□□□□□■□□□■□□■■■□□■□□□■□■□□□■□□■■■□□■□□□■□□□□□□■□□□■□■□□□■□■□□■■□□□■□□□■■■■■□□■■■■□□□□□□□□□")
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")

gamemain=GameMain()
gamemain.konkukStart()
gamemain.playgame.printResult()
