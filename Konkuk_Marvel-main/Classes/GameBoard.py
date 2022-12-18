class GameBoard:
    '''
    게임판에 대한 정보를 가진 클래스.
    '''
    
    def __init__(self, user_num = 4, user_chars = ['▲', '■', '●', '♥'], user_locations = [0, 0, 0, 0], city_info_path = "./Txt_files/CityInfo.txt"):
        '''
        매개변수
        user_num: 유저 수
        user_chars: 각 유저를 나타낼 문자
        city_info_path: 각 (일반 및 특별) 도시들의 정보를 담은 파일 위치
        '''
        self.info_names = list()                    # CityInfo.txt 파일에 저장된 각 도시들의 정보에 대한 종류
        self.board = dict()                         # board의 각 도시에 대한 정보를 담고있는 딕셔너리
        self.kindOfBuilding = {
            "L": "땅"+" "*2,
            "K": "K" + " "*3,
            "R": "R" + " "*3,
            "C": "C" + " "*3,
        }
        self.user_num = user_num                    # 유저 수를 가지는 변수
        self.user_chars = user_chars[:]             # 각 유저를 나타낼 문자를 담는 리스트
        self.user_locations = user_locations[:]     # 각 유저의 위치를 저장할 리스트
        self.CITY_INFO_PATH = city_info_path   
         
        try:
            f = open(self.CITY_INFO_PATH, 'r', encoding='UTF8')
        except FileNotFoundError as e:
            print("Error: 게임판의 각 도시에 대한 정보를 담은 파일이 없습니다.")
            print("Enter를 누르면 프로그램을 종료합니다.")
            input()
            exit()
        
        line = f.readline().rstrip()
        self.info_names = line.split(",")

        for city_num in range(20):
            self.board[city_num] = {}
            line = f.readline().rstrip()
            info_values = line.split(",")
            for index, info_name in enumerate(self.info_names):
                self.board[city_num][info_name] = info_values[index]
            self.board[city_num]['user'] = [0 for _ in range(4)]        # 각 city의 'user' key는 해당 도시에 어떤 유저가 있는지 없는지를 체크하기 위한 리스트가 담겨있다.
        
        for index, user_location in enumerate(user_locations):
            self.board[user_location]["user"][index] = 1      
    
    def printBoardTop(self, ):
        '''
        ToDo: 보드판 윗부분 출력
        '''
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
        
        # 해당 도시의 이름 출력
        for i in range(7):
            name = self.board[i+10]['name']
            print("□{}".format(name), end='')
        print("□")
        
        # 해당 도시의 소유주가 누구이고 어떤 건물이 지어져 있는지 표시
        for i in range(7):
            building = self.board[i+10]['building']
            if building == "None" or building == None: building = " "*6
            elif building == "L": building = self.kindOfBuilding["L"] + self.user_chars[self.board[i+10]["owner"]-1]
            else:
                building = self.kindOfBuilding[building] + self.user_chars[self.board[i+10]["owner"]-1]
            
            print("□{}".format(building), end='')
        print("□")
        
        # 해당 도시에 누가 있는지 표시
        line1 = ""
        line2 = ""
        for i in range(7):
            user_states = self.board[i+10]['user']
            line1 += "□"
            line2 += "□"
            for index, user_state in enumerate(user_states[:2]):
                if user_state == 0: line1 += "  "
                else: line1 += self.user_chars[index]
            line1 += "  "
            for index, user_state in enumerate(user_states[2:]):
                if user_state == 1 and self.user_num >= 2+index+1: line2 += self.user_chars[index+2]
                else: line2 += "  "
            line2 += "  "
        line1 += "□"
        line2 += "□"
        print(line1)
        print(line2)
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
     
    def printBoardLeftRight(self, ):
        '''
        ToDo: 보드판 양 옆 출력
        '''
        for i in range(3):                                                                  # 상단과 하단을 제외하고 총 3층만 출력
            city1_num = 9-i; city2_num = 17+i                                               # 양 옆의 두 개의 도시의 인덱스 설정
            lines = []                                                                      # 출력할 문자열들을 모아 놓는 리스트

            # 해당 도시의 이름 출력 문자열
            city1_name = self.board[city1_num]["name"]                                      
            city2_name = self.board[city2_num]["name"]
            lines.append("□{}□".format(city1_name) + " "*38+ "□{}□".format(city2_name))     

            # 해당 도시의 소유주가 누구이고 어떤 건물이 지어져 있는지 표시하는 문자열
            city1_building = self.board[city1_num]["building"]
            if city1_building == "None" or city1_building == None: city1_building = " "*6
            elif city1_building == "L": city1_building = self.kindOfBuilding["L"] + self.user_chars[self.board[city1_num]["owner"]-1]
            else:
                city1_building = self.kindOfBuilding[city1_building] + self.user_chars[self.board[city1_num]["owner"]-1]
            
            city2_building = self.board[city2_num]["building"]
            if city2_building == "None" or city2_building == None: city2_building = " "*6
            elif city2_building == "L": city2_building = self.kindOfBuilding["L"] + self.user_chars[self.board[city2_num]["owner"]-1]
            else:
                city2_building = self.kindOfBuilding[city2_building] + self.user_chars[self.board[city2_num]["owner"]-1]
            
            lines.append("□{}□".format(city1_building) + " "*38 + "□{}□".format(city2_building))
            
            # 해당 도시에 누가 있는지 표시하는 문자열1
            city1_user_states = self.board[city1_num]['user']
            city2_user_states = self.board[city2_num]['user']
            tmp_line = "□"
            for index, user_state in enumerate(city1_user_states[:2]):
                if user_state == 0: tmp_line += "  "
                else: tmp_line += self.user_chars[index]
            
            tmp_line += "  □" + " "*38 + "□"    
            for index, user_state in enumerate(city2_user_states[:2]):
                if user_state == 0: tmp_line += "  "
                else: tmp_line += self.user_chars[index]
            tmp_line += "  □"
            lines.append(tmp_line)
            
            # 해당 도시에 누가 있는지 표시하는 문자열1
            tmp_line = "□"
            for index, user_state in enumerate(city1_user_states[2:]):
                if user_state == 1 and self.user_num >= 2+index+1: tmp_line += self.user_chars[index+2]
                else: tmp_line += "  "
            
            tmp_line += "  □" + " "*38 + "□"    
            for index, user_state in enumerate(city2_user_states[2:]):
                if user_state == 1 and self.user_num >= 2+index+1: tmp_line += self.user_chars[index+2]
                else: tmp_line += "  "
            tmp_line += "  □"
            lines.append(tmp_line)
            
            # 아래칸 출력
            if i < 2:
                lines.append("□"*5 + " "*38 + "□"*5)
            
            for line in lines:
                print(line)
            
    def printBoardBottom(self, ):
        '''
        ToDo: 보드판 하단 출력
        '''
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
        
        # 해당 도시의 이름 출력
        for i in range(6, -1, -1):                  
            name = self.board[i]['name']
            print("□{}".format(name), end='')
        print("□")
        
        # 해당 도시의 소유주가 누구이고 어떤 건물이 지어져 있는지 표시
        for i in range(6, -1, -1):
            building = self.board[i]['building']
            if building == "None" or building == None: building = " "*6
            elif building == "L": building = self.kindOfBuilding["L"] + self.user_chars[self.board[i]["owner"]-1]
            else:
                building = self.kindOfBuilding[building] + self.user_chars[self.board[i]["owner"]-1]
            
            print("□{}".format(building), end='')
        print("□")
        
        # 해당 도시에 누가 있는지 표시
        line1 = ""
        line2 = ""
        for i in range(6, -1, -1):
            user_states = self.board[i]['user']
            line1 += "□"
            line2 += "□"
            for index, user_state in enumerate(user_states[:2]):
                if user_state == 0: line1 += "  "
                else: line1 += self.user_chars[index]
            line1 += "  "
            for index, user_state in enumerate(user_states[2:]):
                if user_state == 1 and self.user_num >= 2+index+1: line2 += self.user_chars[index+2]
                else: line2 += "  "
            line2 += "  "
        line1 += "□"
        line2 += "□"
        print(line1)
        print(line2)
        print("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
