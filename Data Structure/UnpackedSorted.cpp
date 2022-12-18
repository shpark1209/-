#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
int A[100],B[100];
int N, lef, rig;
int srch(int x) {        //binary search
	int l, r, m;
	l = 0; r = N - 1;
	while (l <= r) {
		m = (l + r) / 2;
		if (A[m] == x) {
			lef = m;
			rig = m;
			if (B[m] == 1)return 1;
			else return -1;
		}
		else if (A[m] > x) {
			r = m - 1;
		}
		else {
			l = m + 1;
		}
	}
	lef = r; rig = l;              //binary search가 끝날 때까지 출력 안된다면, l과 r이 서로 교차함.
	return -1;
}
void dlte(int x) {
	B[lef] = 0;
}
void insrt(int x) {                                 //만약 이미 있는데 mark가 0이라면, 없는데 0과 붙어있을 때, 없는데 N과 붙어있을때, 그 이외
	int i=0;
	if (lef == rig)B[lef] = 1;              //이미 있는데 mark가 0
	else if (lef == -1) {                   //없는데 삽입 위치가 0과 붙어있음
		i = rig;
		while (B[i] == 1 && i < N) {       //빈자리 찾기
			i++;
		}
		if (i == N) {                       //빈자리가 없음, 새로운 칸을 삽입해야함
			for (int j = N - 1; j >= rig; j--) {
				A[j + 1] = A[j]; B[j + 1] = B[j];
			}
			A[rig] = x; B[rig] = 1; N++;
		}
		else{								//빈자리 찾음, 기존에 있던 칸 활용 (N 증가X)
			for (int j = i - 1; j >= rig; j--) {
				A[j + 1] = A[j]; B[j + 1] = B[j];
			}
			A[rig] = x; B[rig] = 1;
		}
	}
	else if (rig == N) {                                                   //삼입 위치가 N과 붙어있음
		i = lef;
		while (B[i] == 1 && i >=0) {
			i--;
		} 
		if (i == -1) {                               //빈자리가 없기 때문에 N번째에 삽입
			A[N] = x; B[N] = 1; N++;
		}
		else {                                         //빈자리 찾음, 기존에 있더 칸 활용
			for (int j = i; j < rig; j++) {
				A[j] = A[j+1]; B[j] = B[j+1];
			}
			A[rig - 1] = x; B[rig - 1] = 1;
		}
	}
	else {
		i = lef;
		while (B[i] == 1 && i >= 0) {
			i--;
		}
		if (i == -1) {                                                //lef의 왼쪽에 없다면, lef의 오른쪽도 탐색
			i = rig;
			while (B[i] == 1 && i < N) {       //빈자리 찾기
				i++;
			}
			if (i == N) {                       //빈자리가 없음, 새로운 칸을 삽입해야함
				for (int j = N - 1; j >= rig; j--) {
					A[j + 1] = A[j]; B[j + 1] = B[j];
				}
				A[rig] = x; B[rig] = 1; N++;
			}
			else {								//빈자리 찾음, 기존에 있던 칸 활용 (N 증가X)
				for (int j = i - 1; j >= rig; j--) {
					A[j + 1] = A[j]; B[j + 1] = B[j];
				}
				A[rig] = x; B[rig] = 1;
			}
			
		}
		else {                                                         //빈자리가 lef의 왼쪽에 있다면
			for (int j = i; j < rig; j++) {
				A[j] = A[j+1]; B[j] = B[j+1];
			}
			A[rig] = x; B[rig] = 1;
		}
	}
}
int main() {
	char c;
	int x, i;
	N = 0;
	while (true) {
		printf("배열의 크기=%d\n", N);
		for (i = 0; i < N; i++)
			printf("%3d    ", i);
		printf("\n");
		for (i = 0; i < N; i++)
			printf("%3d    ", A[i]);
		printf("\n");
		for (i = 0; i < N; i++)
			printf("%3d    ", B[i]);
		printf("\n");
		scanf(" %c", &c);

		if (c == 'q')break;
		else if (c == 's') {
			scanf("%d", &x);
			if (srch(x) == -1 && lef!=rig) {
				printf("%d Not Found, Should be between Index %d and %d\n", x, lef, rig);
			}
			else if (srch(x) == -1 && lef == rig) {
				printf("%d Not Found, Stored as deleted value at %d\n", x, lef);
			}
			else {
				printf("%d Found At Index %d\n", x, lef);
			}
		}
		else if (c == 'd') {
			scanf("%d", &x);
			if (srch(x) == 1) {
				dlte(x);
			}
			else {
				printf("%d Not Found in Array\n", x);
			}
		}
		else if (c == 'i') {
			scanf("%d", &x);
			if (srch(x) == -1) {
				insrt(x);
			}
		}
		else {
			printf("잘못 입력하셨습니다.\n");
		}
	}

}