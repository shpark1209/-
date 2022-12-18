#include <cstdio>
#include <fstream>
#include <iostream>
int M, N, a, b, head=0, tail=0;
using namespace std;
char** map;
int* queue;
void fileInput() {
	int m, n;
	ifstream file("test.txt");
	if (!file.is_open()) {
		cerr << "파일 읽기 실패\n";
		return;
	}
	file >> m >> n;
	M = m; N = n;
	map = new char* [m + 2];
	for (int i = 0; i < m + 2; i++) {
		map[i] = new char[n + 2];
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
	queue = new int[m * n];
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
void insert(int x) {
	queue[tail] = x;
	tail = (tail+1) % (M * N);	
}
int pop() {
	int old = head;
	head = (head+1) % (M * N);
	return queue[old];
}
int isEmpty() {
	return head==tail;
}
int Find() {
	a = 1; b = 1;
	while (1) {
		
		if(map[a][b]=='*'){              //포기
			if (isEmpty())return 1;
		}
		map[a][b] = '*';
		if (map[a - 1][b] == '0') { insert(a - 1);insert(b); }
		else if (map[a][b - 1] == '0') { insert(a); insert(b-1); }
		else if (map[a + 1][b] == '0') { insert(a + 1); insert(b); }
		else if (map[a][b + 1] == '0') { insert(a); insert(b+1); }
		else if (map[a + 1][b + 1] == '0') { insert(a + 1); insert(b+1); }
		else if (map[a - 1][b - 1] == '0') { insert(a - 1); insert(b-1); }
		else if (map[a - 1][b] == '0') { insert(a - 1); insert(b); }
		else if (map[a - 1][b + 1] == '0') { insert(a - 1); insert(b+1); }
		if (isEmpty())return 1;
		a = pop(); b = pop();
	}
}
int main() {
	fileInput();

	if (Find()) {
		printall();
		printf("미로 탈출 경로를 찾았습니다.\n");
	}
	return 0;
}