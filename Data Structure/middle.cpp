#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
class Node {                                         //Ʈ�� ��� Ŭ����
public:
	int data;
	Node* L, * R;
};
class PQMin {                 //���� ���� �ö󰡴�
public:
	PQMin();
	void insert(int x);
	int top();
	void del();
	int N;
	int a[1000];
	int Size();
};
PQMin::PQMin() {                         //��Ʈ ��尪�� ū ���� �ξ� �Է� ������ �ڽ� ���� ����

	N = 0;
}
int PQMin::Size() { return N; }
int PQMin::top() { return a[1]; }
void PQMin::insert(int x) {
	int index;
	N++;
	a[N] = x;
	index = N;
	while (index != 1) {                      //parent ��尡 ���ٸ� ����
		if (a[index / 2] <= a[index])         //parent�� �ڽ��� ���Ͽ� ��Ұ��� ��
			break;
		swap(a[index / 2], a[index]);
		index = index / 2;                            //parent ���� �Ž��� �ö�
	}
}
void PQMin::del() {
	int index=1, temp;
	a[1] = a[N];
	N--;
	while (true) {
		if (index * 2 > N)break;              //�ڽ� ��尡 ���� �� break
		if (index * 2 == N) {                 //���� �ڽĳ�常 ����  
			if (a[index] <= a[index * 2])
				break;
			else {
				swap(a[index], a[index * 2]);
				index = index * 2;
			}
		}
		else {                               //�¿� �ڽĳ�� ��� ����
			if (a[index * 2] < a[index * 2 + 1])temp = index * 2;      //�¿� ��� �� ���� ��� = temp
			else temp = index * 2 + 1;
			if (a[index] <= a[temp])
				break;
			else {
				swap(a[index], a[temp]);
				index = temp;
			}
		}
	}
}
class PQMax {                 //���� ���� �ö󰡴�
public:
	PQMax();
	void insert(int x);
	int top();
	void del();
	int N, a[1000];
	int Size();
};
PQMax::PQMax() {                         //��Ʈ ��尪�� ū ���� �ξ� �Է� ������ �ڽ� ���� ����

	N = 0;
}
int PQMax::Size() { return N; }
int PQMax::top() { return a[1]; }
void PQMax::insert(int x) {
	int index;
	N++;
	a[N] = x;
	index = N;
	while (index != 1) {                      //parent ��尡 ���ٸ� ����
		if (a[index / 2] >= a[index])         //parent�� �ڽ��� ���Ͽ� ��Ұ��� ��
			break;
		swap(a[index / 2], a[index]);
		index = index / 2;                            //parent ���� �Ž��� �ö�
	}
}
void PQMax::del() {
	int index = 1, temp;
	a[1] = a[N];
	N--;
	while (true) {
		if (index * 2 > N)break;              //�ڽ� ��尡 ���� �� break
		if (index * 2 == N) {                 //���� �ڽĳ�常 ����  
			if (a[index] >= a[index * 2])
				break;
			else {
				swap(a[index], a[index * 2]);
				index = index * 2;
			}
		}
		else {                               //�¿� �ڽĳ�� ��� ����
			if (a[index * 2] > a[index * 2 + 1])temp = index * 2;      //�¿� ��� �� ���� ��� = temp
			else temp = index * 2 + 1;
			if (a[index] >= a[temp])
				break;
			else {
				swap(a[index], a[temp]);
				index = temp;
			}
		}
	}
}
int main() {
	char c;
	int x, y, lcnt=0, rcnt=0;
	PQMax Left;
	PQMin Right;
	while (true) {
		scanf(" %c", &c);
		if (c == 'q')break;
		else if (c == 'd') {
			if (Left.Size() == 0) {
				printf("No Data to delete\n");
			}
			else {
				y = Left.top();
				Left.del();
				if (lcnt == rcnt) {
					x = Right.top();
					Right.del();
					Left.insert(x);
					rcnt--;
				}
				else {
					lcnt--;
				}
				printf("Middle number = %d, has been deleted\n", y);
			}
		}
		else if (c == 'i') {
			scanf("%d", &x);
			if (lcnt == 0) {            //top�� ����
				Left.insert(x);
				lcnt = 1;
			}
			else if (lcnt == rcnt) {
				if (x <= Right.top()) {          //top���� ������ ���ʿ� ����
					Left.insert(x);
				}
				else {
					y = Right.top();
					Right.del();
					Left.insert(y);
					Right.insert(x);
				}
				lcnt++;
			}
			else {                       //lcnt=rcnt+1
				if (x <= Left.top()) {
					y = Left.top();
					Left.del();
					Right.insert(y);
					Left.insert(x);
				}
				else {
					Right.insert(x);
				}
				rcnt++;
			}
		}
		else if (c == 'p') {
			if (Left.Size() == 0) {
				printf("No data\n");
			}
			else {
				printf("Middle member = %d\n", Left.top());
			}
		}
		else {
			printf("�߸� �Է��ϼ̽��ϴ�.\n");
		}
	}
}