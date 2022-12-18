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
	lef = r; rig = l;              //binary search�� ���� ������ ��� �ȵȴٸ�, l�� r�� ���� ������.
	return -1;
}
void dlte(int x) {
	B[lef] = 0;
}
void insrt(int x) {                                 //���� �̹� �ִµ� mark�� 0�̶��, ���µ� 0�� �پ����� ��, ���µ� N�� �پ�������, �� �̿�
	int i=0;
	if (lef == rig)B[lef] = 1;              //�̹� �ִµ� mark�� 0
	else if (lef == -1) {                   //���µ� ���� ��ġ�� 0�� �پ�����
		i = rig;
		while (B[i] == 1 && i < N) {       //���ڸ� ã��
			i++;
		}
		if (i == N) {                       //���ڸ��� ����, ���ο� ĭ�� �����ؾ���
			for (int j = N - 1; j >= rig; j--) {
				A[j + 1] = A[j]; B[j + 1] = B[j];
			}
			A[rig] = x; B[rig] = 1; N++;
		}
		else{								//���ڸ� ã��, ������ �ִ� ĭ Ȱ�� (N ����X)
			for (int j = i - 1; j >= rig; j--) {
				A[j + 1] = A[j]; B[j + 1] = B[j];
			}
			A[rig] = x; B[rig] = 1;
		}
	}
	else if (rig == N) {                                                   //���� ��ġ�� N�� �پ�����
		i = lef;
		while (B[i] == 1 && i >=0) {
			i--;
		} 
		if (i == -1) {                               //���ڸ��� ���� ������ N��°�� ����
			A[N] = x; B[N] = 1; N++;
		}
		else {                                         //���ڸ� ã��, ������ �ִ� ĭ Ȱ��
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
		if (i == -1) {                                                //lef�� ���ʿ� ���ٸ�, lef�� �����ʵ� Ž��
			i = rig;
			while (B[i] == 1 && i < N) {       //���ڸ� ã��
				i++;
			}
			if (i == N) {                       //���ڸ��� ����, ���ο� ĭ�� �����ؾ���
				for (int j = N - 1; j >= rig; j--) {
					A[j + 1] = A[j]; B[j + 1] = B[j];
				}
				A[rig] = x; B[rig] = 1; N++;
			}
			else {								//���ڸ� ã��, ������ �ִ� ĭ Ȱ�� (N ����X)
				for (int j = i - 1; j >= rig; j--) {
					A[j + 1] = A[j]; B[j + 1] = B[j];
				}
				A[rig] = x; B[rig] = 1;
			}
			
		}
		else {                                                         //���ڸ��� lef�� ���ʿ� �ִٸ�
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
		printf("�迭�� ũ��=%d\n", N);
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
			printf("�߸� �Է��ϼ̽��ϴ�.\n");
		}
	}

}