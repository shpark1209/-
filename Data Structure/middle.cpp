#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
class Node {                                         //트리 노드 클래스
public:
	int data;
	Node* L, * R;
};
class PQMin {                 //작은 값이 올라가는
public:
	PQMin();
	void insert(int x);
	int top();
	void del();
	int N;
	int a[1000];
	int Size();
};
PQMin::PQMin() {                         //루트 노드값을 큰 수로 두어 입력 값들을 자식 노드로 저장

	N = 0;
}
int PQMin::Size() { return N; }
int PQMin::top() { return a[1]; }
void PQMin::insert(int x) {
	int index;
	N++;
	a[N] = x;
	index = N;
	while (index != 1) {                      //parent 노드가 없다면 종료
		if (a[index / 2] <= a[index])         //parent와 자신을 비교하여 대소관계 비교
			break;
		swap(a[index / 2], a[index]);
		index = index / 2;                            //parent 노드로 거슬러 올라감
	}
}
void PQMin::del() {
	int index=1, temp;
	a[1] = a[N];
	N--;
	while (true) {
		if (index * 2 > N)break;              //자식 노드가 없을 때 break
		if (index * 2 == N) {                 //왼쪽 자식노드만 존재  
			if (a[index] <= a[index * 2])
				break;
			else {
				swap(a[index], a[index * 2]);
				index = index * 2;
			}
		}
		else {                               //좌우 자식노드 모두 존재
			if (a[index * 2] < a[index * 2 + 1])temp = index * 2;      //좌우 노드 중 작은 노드 = temp
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
class PQMax {                 //작은 값이 올라가는
public:
	PQMax();
	void insert(int x);
	int top();
	void del();
	int N, a[1000];
	int Size();
};
PQMax::PQMax() {                         //루트 노드값을 큰 수로 두어 입력 값들을 자식 노드로 저장

	N = 0;
}
int PQMax::Size() { return N; }
int PQMax::top() { return a[1]; }
void PQMax::insert(int x) {
	int index;
	N++;
	a[N] = x;
	index = N;
	while (index != 1) {                      //parent 노드가 없다면 종료
		if (a[index / 2] >= a[index])         //parent와 자신을 비교하여 대소관계 비교
			break;
		swap(a[index / 2], a[index]);
		index = index / 2;                            //parent 노드로 거슬러 올라감
	}
}
void PQMax::del() {
	int index = 1, temp;
	a[1] = a[N];
	N--;
	while (true) {
		if (index * 2 > N)break;              //자식 노드가 없을 때 break
		if (index * 2 == N) {                 //왼쪽 자식노드만 존재  
			if (a[index] >= a[index * 2])
				break;
			else {
				swap(a[index], a[index * 2]);
				index = index * 2;
			}
		}
		else {                               //좌우 자식노드 모두 존재
			if (a[index * 2] > a[index * 2 + 1])temp = index * 2;      //좌우 노드 중 작은 노드 = temp
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
			if (lcnt == 0) {            //top이 없음
				Left.insert(x);
				lcnt = 1;
			}
			else if (lcnt == rcnt) {
				if (x <= Right.top()) {          //top보다 작으면 왼쪽에 삽입
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
			printf("잘못 입력하셨습니다.\n");
		}
	}
}