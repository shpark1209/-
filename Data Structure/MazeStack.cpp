#include <cstdio>
#include <fstream>
#include <iostream>
int M, N, a, b,P=0;
using namespace std;
char** map;
int *stack;
void fileInput() {
	int m, n;
	ifstream file("test.txt");
	if (!file.is_open()) {
		cerr << "파일 읽기 실패\n";
		return;
	}
	file >> m >> n;
	M = m; N = n;
	map = new char* [m+2];
	for (int i = 0; i < m+2; i++) {
		map[i] = new char[n+2];
		map[i][0] = '1';
		map[i][m + 1] = '1';
	}
	for (int i = 0; i < n + 1; i++) {
		map[0][i] = '1';
		map[m + 1][i] = '1';
	}
	for (int i = 1; i <= m; i++) {
		for (int j = 1; j <= n; j++) {
			file >> map[i][j];
		}
	}
	stack = new int[m * n];
}
void printall() {
	printf("\n");
	for (int i = 1; i <= M; i++) {
		for (int j = 1; j <= N; j++) {
			printf("%c  ", map[i][j]);
		}
		printf("\n");
	}
	printf("\n");
}
void push(int x) {
	stack[P] = x;
	P++;
}
int pop() {
	P--;
	return stack[P];
}
int isEmpty() {
	return P == 0;
}
int Find() {
	int ip, jp;
	printall();
	a = 1; b = 1;
	map[a][b] = '*';
	while (1) {
		ip = -100;
		jp = -100;
		if (a == M  && b == N ) {
			printall();
			return 1;
		}
		else if (map[a - 1][b] == '0') { ip = a-1; jp=b; }
		else if (map[a][b - 1] == '0') { ip = a; jp = b - 1; }
		else if (map[a + 1][b] == '0') { ip = a + 1; jp = b; }
		else if(map[a][b+1]=='0'){ ip = a; jp = b+1; }
		else if(map[a+1][b+1]=='0'){ ip = a + 1; jp = b+1; }
		else if(map[a-1][b-1]=='0'){ ip = a - 1; jp = b -1; }
		else if(map[a-1][b]=='0'){ ip = a - 1; jp = b; }
		else if(map[a-1][b+1]=='0'){ ip = a - 1; jp = b+1; }
		if (ip != -100) {
			push(a);
			push(b);
			a = ip; b = jp;
			map[a][b] = '*';
		}
		else {
			if (isEmpty())return -1;
			map[a][b] = 'x'; b = pop(); a = pop();
		}
	}
}
int main() {
	fileInput();
	
	if (Find()) {
		printf("미로 탈출 경로를 찾았습니다.\n");
	}
	return 0;
}