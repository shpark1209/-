#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstdio>
using namespace std;

int A[100];
int S, lef, rig;
int srch(int x) {
	int s, e, m;
	s = 0;
	e = S-1;
	while (s <= e) {
		m = (s + e) / 2;
		if (A[m] == x) {
			lef = m;
			rig = m;
			return 1;
		}
		else if (A[m] > x) {
			e = m - 1;
		}
		else {
			s = m + 1;
		}
	}
	lef = e; rig = s;
	return -1;
}
void insrt(int x) {
	int i;
	for (i = S - 1; i >= rig; i--) {
		A[i + 1] = A[i];
	}
	A[rig] = x;
	S++;
}
void dlte(int x) {
	int i;
	for (i = lef; i < S-1; i++)
	{
		A[i] = A[i + 1];
	}
	S--;
}
int main() {
	char c;
	int x, i;
	S = 0;
	while (true) {
		printf("S=%d\n", S);
		for (i = 0; i < S; i++)
			printf("%3d    ", i);
		printf("\n");
		for (i = 0; i < S; i++)
			printf("%3d    ", A[i]);
		printf("\n");
		scanf(" %c", &c);

		if (c == 's') {
			scanf("%d", &x);
			if (srch(x) == -1) {
				printf("%d Not Found Should be between %d and %d\n", x, lef, rig);
			}
			else {
				printf("%d Found at Index %d\n", x, lef);
			}
		}
		else if (c == 'i') {
			scanf("%d", &x);
			if (srch(x) == -1) {
				insrt(x);
			}
		}
		else if (c == 'd') {
			scanf("%d", &x);
			if (srch(x) == 1) {
				dlte(x);
			}
		}
		else if (c == 'q') {
			break;
		}
		else {
			printf("�߸� �Է��ϼ̽��ϴ�.\n");
		}
	}
	return 0;
}