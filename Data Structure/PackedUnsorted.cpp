#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
int A[100];
int N, loc;
int srch(int x) {       
	int i;
	for (i = 0; i < N; i++)
	{
		if (A[i] == x) {

			loc = i;
			return 1;
		}
	}
	if (i == N)return -1;
	
}
void dlte(int x) {
	A[loc] = A[N - 1];
	N--;
}
void insrt(int x) {
	A[N] = x;
	N++;
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
		scanf(" %c", &c);

		if (c == 'q')break;
		else if (c == 's') {
			scanf("%d", &x);
			if (srch(x) == 1) {
				printf("%d Found At Index %d\n", x, loc);
			}
			else {
				printf("%d Not Found\n", x);
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