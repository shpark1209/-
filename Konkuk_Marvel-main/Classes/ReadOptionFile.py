import pickle

class ReadOptionFile:
    def __init__(self, option_path="./Option.pkl", able_users = [2, 3, 4], able_s_moneys=[2500000, 5000000, 10000000]):
        self.option_values = {}
        self.able_values = {'user': [],
                            's_money': [],}
        self.able_values['user'] = able_users
        self.able_values['s_money'] = able_s_moneys
        self.OPTION_PATH = option_path   
        
    def set_option_values(self, ):
        '''
        To Do:
            파일에 작성된 설정값들을 불러오는 함수. 
            단, 파일이 없는 경우 default값을 기준으로 파일을 만들고 값을 가져옴.
        '''
        try:
            with open('Option.pkl', 'rb') as f: option = pickle.load(f)
        except FileNotFoundError as e:
            print("Option.pkl 파일이 없으므로 default 옵션으로 파일이 생성됩니다.")
            print("Enter를 누르면 이어서 진행됩니다.")
            input()

            self.make_default_pkl_file()
            with open('Option.pkl', 'rb') as f: option = pickle.load(f)
        check_num = 0   # 파일 오류 있는지 체크하는 변수
        for key in option.keys():
            value = option[key]
            
            if value not in self.able_values[key]:
                print("Option.pkl에 이상한 값이 포함되어 있습니다. Default 옵션으로 파일이 재생성됩니다.")
                print("Enter를 누르면 이어서 진행됩니다.")
                input()
                
                self.make_default_pkl_file()
                check_num = 1
        
        if check_num == 1:
            with open('Option.pkl', 'rb') as f: option = pickle.load(f)
        
        for key in option.keys():
            self.option_values[key] = option[key]    
    
    def get_option_values(self, ):
        '''
        To Do:
            불러온 설정값 데이터를 반환해주는 함수
        '''
        return self.option_values
    
    def make_default_pkl_file(self, ):
        option = {
            "user": 4,
            "s_money": 2500000
        }
        
        with open('Option.pkl', 'wb') as f:
            pickle.dump(option, f, protocol=pickle.HIGHEST_PROTOCOL)