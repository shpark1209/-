#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
class Node {                                         //Ʈ�� ��� Ŭ����
public:
	int data;
	int Llength;
	int Rlength;
	Node* L, * R;
};
class AVL {
public:
	AVL();
	Node* Root;
	Node* search(int x);
	Node* searchp(Node* n, int x);
	void insert(int x);
	int insertp(int x, Node* n, Node** rp);
	void print();
	void printp(Node* n, int d, int LR);
};
AVL::AVL() {                         //��Ʈ ��尪�� ū ���� �ξ� �Է� ������ �ڽ� ���� ����
	Root = new Node;
	Root->data = 999;
	Root->L = NULL;
	Root->R = NULL;
	Root->Llength = 0;
	Root->Rlength = 0;
}
Node* AVL::search(int x) {
	return searchp(Root->L, x);          //���ʺ��� Ž�� ���� (��尡 �Ѱ� �̻� �ִٸ�, root ��尪���� �۱� ������ ���ʿ� ��尡 �ִ�)
}
Node* AVL::searchp(Node* n, int x) {
	if (n == NULL)return NULL;
	else {
		if (n->data < x) { return searchp(n->R, x); }       //x���� ���� ���� ��, ������ �ڽ� ���� �̵�
		else if (n->data > x) {
			return searchp(n->L, x);                        //x���� ���� Ŭ ��, ���� �ڽ� ���� �̵�
		}
		else return n;                         //x�� ���� ���� ��
	}
}
void AVL::insert(int x) {
	int length= insertp(x, Root->L, &(Root->L));           //���ʺ��� Ž�� ����
	Root->Llength = length+1;
}
int AVL::insertp(int x, Node* n, Node** rp) {
	Node* newnode;  int length;   Node* a, * b, * c, * temp , *temp2;//���� ��� ����
	if (n == NULL) {                            //���� �ڽ� ��尡 ���ٸ� ���� �����Ͽ� Ʈ���� ����
		newnode = new Node;
		newnode->data = x;
		newnode->L = NULL;
		newnode->R = NULL;
		newnode->Llength = 0;
		newnode->Rlength = 0;
		*rp = newnode;
		return 0;
	}
	else {
		if (n->data < x) { length = insertp(x, n->R, &(n->R)); n->Rlength = length + 1; }           //������ x�� ��� ������ ũ�ٸ� ������ �ڽ� ��忡 �־�� �ϹǷ� n->R Ž��
		else if (n->data > x){length = insertp(x, n->L, &(n->L)); n->Llength = length + 1;}    //������ x�� ��� ������ �۴ٸ� ���� �ڽ� ��忡 �־�� �ϹǷ� n->L Ž��
		else;                                        //������ �ִ� ���� ���ٸ� ��ŵ
	}
	if (n->Llength > n->Rlength+1||n->Rlength > n->Llength+1) {
		if (n->data > x && n->L->data > x) {           //LL case
			a = n; b = n->L; c = b->L;
			temp = b->R;
			b->R = a; 
			a->L = temp;
			if (a->L == NULL)a->Llength = 0;
			else a->Llength = max(a->L->Llength, a->L->Rlength) + 1;
			b->Llength = max(b->L->Llength, b->L->Rlength) + 1;
			b->Rlength = max(b->R->Llength, b->R->Rlength) + 1;
			*rp = b;
			return max(b->Llength, b->Rlength);
		}
		else if (n->data > x && n->L->data < x) {
			a = n; b = a->L; c = b->R;
			temp = c->L;
			temp2 = c->R;
			c->L = b;
			c->R = a;
			b->R = temp;
			a->L = temp2;
			if (b->R == NULL)b->Rlength = 0;
			else b->Rlength = max(b->R->Llength, b->R->Rlength) + 1;
			if (a->R == NULL)a->Llength = 0;
			else a->Llength = max(b->L->Llength, b->L->Rlength) + 1;
			c->Llength = max(c->L->Llength, c->L->Rlength) + 1;
			c->Rlength = max(c->R->Llength, c->R->Rlength) + 1;
			*rp = c;
			return max(c->Llength, c->Rlength);
		}
		else if (n->data<x && n->R->data<x) {       //case RR
			a = n; b = a->R; 
			temp = b->L;
			b->L = a;
			a->R = temp;
			if (a->R == NULL)a->Rlength = 0;
			else a->Rlength = max(a->R->Llength, a->R->Rlength) + 1;
			b->Llength = max(b->L->Llength, b->L->Rlength) + 1;
			b->Rlength = max(b->R->Llength, b->R->Rlength) + 1;
			*rp = b;
			return max(b->Llength, b->Rlength);
		}
		else if (n->data < x && n->R->data > x) {    //case RL
			a = n; b = a->R; c = b->L;
			temp = c->L;
			temp2 = c->R;
			c->L = a;
			c->R = b;
			a->R = temp;
			b->L = temp2;
			if (a->R == NULL)a->Rlength = 0;
			else a->Rlength = max(a->R->Llength, a->R->Rlength) + 1;
			if (b->L == NULL)b->Llength = 0;
			else b->Llength = max(b->L->Llength, b->L->Rlength) + 1;
			c->Llength = max(c->L->Llength, c->L->Rlength) + 1;
			c->Rlength = max(c->R->Llength, c->R->Rlength) + 1;
			*rp = c;
			return max(c->Llength, c->Rlength);
		}
	}
	else return max(n->Llength, n->Rlength);
}
void AVL::print() {
	printp(Root, 0, 0);
}
void AVL::printp(Node* n, int d, int LR) {              //d�� Ʈ���� ���� , LR�� ����(0)/������(1)�� ��Ÿ��
	if (LR == 1)for (int i = 0; i < d; i++)printf("            ");
	printf("[%2d|%4d|%2d]", n->Llength, n->data, n->Rlength);
	if (n->L == NULL)printf("\n");
	else printp(n->L, d + 1, 0);
	if (n->R == NULL);
	else printp(n->R, d + 1, 1);
}

int main() {
	char c;
	int x, i;
	AVL t;
	Node* r;
	while (true) {
		t.print();
		scanf(" %c", &c);
		if (c == 'q')break;
		else if (c == 's') {
			scanf("%d", &x);
			if ((r = t.search(x)) == NULL) {
				printf("%d Not Found\n", x);
			}
			else {
				printf("%d Found At Address %d\n", x, r);
			}
		}
		else if (c == 'i') {
			scanf("%d", &x);
			t.insert(x);
		}
		else {
			printf("�߸� �Է��ϼ̽��ϴ�.\n");
		}
	}

}