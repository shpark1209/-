import os

class PrintHelp:

    '''
    도움말을 출력해주는 클래스
    '''

    def howToUse(self, ):
        self.printOptions()
        self.printHowToUse()

    def printOptions(self, ):
        print("***** 도움말 *****")
        print("1. 게임 설명")
        print("2. 게임 준비")
        print("3. 게임 진행")
        print("4. 구역 별 정보")
        print("5. 상세 규칙")
        print("6. 도움말 종료 및 시작 화면으로 이동")
        print("도움말 번호를 입력해주세요: ", end = "")

    def printHowToUse(self, ):
        
        while(1):
            option = input()
    
            while(option not in ['1', '2', '3', '4', '5', '6']):
                print("잘못된 입력입니다. 다시 입력해주세요.\n")
                self.printOptions()
                option = input()

            option = int(option)
            
            print()
            if option == 1:
                self.ht1()
                print()
                self.printOptions()
            elif option == 2:
                self.ht2()
                print()
                self.printOptions()
            elif option == 3:
                self.ht3()
                print()
                self.printOptions()
            elif option == 4:
                self.ht4()
                print()
                self.printOptions()
            elif option == 5:
                self.ht5()
                print()
                self.printOptions()
            else:
                break
            
        print('도움말 창을 종료합니다. 시작 화면으로 넘어가려면 ENTER 키를 눌러주세요\n')
        input()
        return
    
    def ht1(self, ): #도움말 1
        f=open("./Txt_files/Help1.txt", 'r', encoding='UTF8')
        while True:
            line = f.readline()
            if not line : break
            print(line)
        f.close()
    
    def ht2(self, ):#도움말 2
        f=open("./Txt_files/Help2.txt", 'r', encoding='UTF8')
        while True:
            line = f.readline()
            if not line : break
            print(line)
        f.close()
        
    def ht3(self, ):#도움말 3
        f=open("./Txt_files/Help3.txt", 'r', encoding='UTF8')
        while True:
            line = f.readline()
            if not line : break
            print(line)
        f.close()
        
    def ht4(self, ):#도움말 4
        f=open("./Txt_files/Help4.txt", 'r', encoding='UTF8')
        while True:
            line = f.readline()
            if not line : break
            print(line)
        f.close()
        
    def ht5(self, ):#도움말 5
        f=open("./Txt_files/Help5.txt", 'r', encoding='UTF8')
        while True:
            line = f.readline()
            if not line : break
            print(line)
        f.close()
