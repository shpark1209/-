#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
class Node {                                         //Ʈ�� ��� Ŭ����
public:
	int data;
	Node *L, *R;
};
class BST {
public:
	BST();
	Node *Root;
	Node *prt;
	Node *search(int x);
	Node *searchp(Node *n, int x);
	void insert(int x);
	void insertp(int x, Node *n, Node **rp);
	void Delete(int x);
	void print();
	void printp(Node *n, int d, int LR);
};
BST::BST(){                         //��Ʈ ��尪�� ū ���� �ξ� �Է� ������ �ڽ� ���� ����
	Root = new Node;
	Root->data = 999;
	Root->L = NULL;
	Root->R = NULL;
}
Node *BST::search(int x) {
	prt = Root;                          //���� ���� �����, �θ� ��带 �˱� ���� ����
	return searchp(Root->L, x);          //���ʺ��� Ž�� ���� (��尡 �Ѱ� �̻� �ִٸ�, root ��尪���� �۱� ������ ���ʿ� ��尡 �ִ�)
}
Node *BST::searchp(Node* n, int x) {
	if (n == NULL)return NULL;
	else {
		if (n->data < x) { prt = n; searchp(n->R, x); }       //x���� ���� ���� ��, ������ �ڽ� ���� �̵�
		else if (n->data > x) {
			prt = n; searchp(n->L, x);                        //x���� ���� Ŭ ��, ���� �ڽ� ���� �̵�
		}  
		else return n;                         //x�� ���� ���� ��
	}
}
void BST::insert(int x) {                      
	insertp( x, Root->L, &(Root->L));           //���ʺ��� Ž�� ����
}
void BST::insertp(int x, Node *n, Node **rp) {
	Node *newnode;                              //���� ��� ����
	if (n == NULL) {                            //���� �ڽ� ��尡 ���ٸ� ���� �����Ͽ� Ʈ���� ����
		newnode = new Node;
		newnode->data = x;
		newnode->L = NULL;
		newnode->R = NULL;
		*rp = newnode;                          
	}
	else {
		if (n->data < x)insertp(x,n->R, &(n->R));           //������ x�� ��� ������ ũ�ٸ� ������ �ڽ� ��忡 �־�� �ϹǷ� n->R Ž��
		else if (n->data > x)insertp(x, n->L, &(n->L));     //������ x�� ��� ������ �۴ٸ� ���� �ڽ� ��忡 �־�� �ϹǷ� n->L Ž��
		else return;                                        //������ �ִ� ���� ���ٸ� ��ŵ
	}
}
void BST::print() {
	printp(Root, 0, 0);
}
void BST::printp(Node *n, int d, int LR) {              //d�� Ʈ���� ���� , LR�� ����(0)/������(1)�� ��Ÿ��
	if(LR==1)for (int i = 0; i < d; i++)printf("        ");       
	printf("%8d", n->data);
	if (n->L == NULL)printf("\n");
	else printp(n->L, d + 1, 0);
	if (n->R == NULL);
	else printp(n->R, d + 1, 1);
}
void BST::Delete(int x) {
	Node *nn, *pp,*md, *mdp;             //nn�� ������ ���, pp�� ������ ����� �θ� ���, md�� , mdp�� md�� �θ� ���
	nn = search(x);
	pp = prt;
	if (nn == NULL)return;                //�ش� ��尡 ���� ��
	if (nn->L == NULL && nn->R == NULL) { //Ž���� ����� �ڽ� ��尡 ���ٸ�
		if (pp->L == nn)pp->L = NULL;     //nn ��带 ����Ű�� ������, ��� ��ü�� ����
		else pp->R = NULL;
		delete nn;
	}
	else if (nn->L != NULL && nn->R == NULL) { //Ž���� ����� ���� �ڽ� ��常 �ִٸ�,
		if (pp->L == nn)pp->L = nn->L;         //�θ� ����� ���� �ڽ� ��尡 nn�̶��, nn�� ���� �ڽ� ���� ����
		else pp->R = nn->L;                    //�θ� ����� ������ �ڽ� ��尡 nn�̶��, nn�� ���� �ڽ� ���� ����
		delete nn;                             //nn ����
	}
	else if (nn->L == NULL && nn->R != NULL) { //Ž���� ����� ������ �ڽ� ��常 �ִٸ�,
		if (pp->L == nn)pp->L = nn->R;         //�θ� ����� ���� �ڽ� ��尡 nn�̸�, nn�� ������ �ڽ� ���� ����
		else pp->R = nn->R;                    //�θ� ����� ������ �ڽ� ��尡 nn�̸�, nn�� ������ �ڽ� ���� ����
		delete nn;
	}
	else {                               
		md = nn->R;                     
		mdp = nn;                       //md�� �θ� ���
		while (md->L != NULL) {            //���� ��� ���� �̵�
			mdp = md;                      //md�� �θ� ���
			md = md->L;                    //md�� ���� �ڽ� ��� Ž��
		}
		nn->data = md->data;                     //�����ϱ� ���� nn�� ���� �ڽ� ���� �� ���� ���� ���� nn�� data ������ ����
		if (md->L == NULL && md->R == NULL) {    //md�� �ڽ� ��尡 ���� ��
			if (mdp->L == md)mdp->L = NULL;      //mdp�� ���� �ڽ� ��尡 md���, md�� ����Ű�� ������ ����
			else mdp->R = NULL;					 //mdp�� ������ �ڽ� ��尡 md���, md�� ����Ű�� ������ ����
			delete md;                           //md ����
		}
		else if (md->L == NULL && md->R != NULL) { //md�� ������ �ڽ� ��尡 ����
			if (mdp->L == md)mdp->L = md->R;       //mdp�� ���� �ڽ� ��尡 md���, mdp�� ���� �ڽ��� ����Ű�� �����͸� md�� ������ �ڽ� ��带 ����Ű�� �����ͷ� ��ü
			else mdp->R = md->R;                   //mdp�� ������ �ڽ� ��尡 md���, ���ϵ���
			delete md;
		}
		
	}
	
}
int main() {
	char c;
	int x, i;
	BST t;
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
		else if (c == 'd') {
			scanf("%d", &x);
			t.Delete(x);
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