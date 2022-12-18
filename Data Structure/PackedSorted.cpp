#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
int A[100];
int N, lef,rig;
int srch(int x) {        //binary search
	int l, r, m;
	l = 0; r = N-1;
	while (l<=r) {
		m = (l + r) / 2;
		if (A[m] == x) {
			lef = m;
			rig = m;
			return 1;
		}
		else if (A[m] > x) {
			r = m-1;
		}
		else {
			l = m + 1;
		}
	}
	lef = r; rig = l;              //binary search�� ���� ������ ��� �ȵȴٸ�, l�� r�� ���� ������.
	return -1;
}
void dlte(int x) {
	for (int i = lef; i < N - 1; i++) {    //������� ����
		A[i] = A[i + 1];
	}
	N--;
}
void insrt(int x) {
	for (int i = N-1; i >=rig; i--)              //rig~N-1���� �Ѵٸ�, N-1���� ������
	{
		A[i + 1] = A[i];                 //���������� �о
	}
	A[rig] = x;
	N++;
}
int main() {
	char c;
	int x,i;
	N = 0;
	while (true) {
		printf("�迭�� ũ��=%d\n", N);
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
				printf("%d Found At Index %d\n", x, lef);
			}
			else {
				printf("%d Not Found, Should be between Index %d and %d\n", x, lef, rig);
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
			printf("�߸� �Է��ϼ̽��ϴ�.\n");
		}
	}
	
}