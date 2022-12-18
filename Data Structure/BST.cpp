#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <iostream>
using namespace std;
class Node {                                         //트리 노드 클래스
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
BST::BST(){                         //루트 노드값을 큰 수로 두어 입력 값들을 자식 노드로 저장
	Root = new Node;
	Root->data = 999;
	Root->L = NULL;
	Root->R = NULL;
}
Node *BST::search(int x) {
	prt = Root;                          //삭제 연산 수행시, 부모 노드를 알기 위한 변수
	return searchp(Root->L, x);          //왼쪽부터 탐색 시작 (노드가 한개 이상 있다면, root 노드값보다 작기 때문에 왼쪽에 노드가 있다)
}
Node *BST::searchp(Node* n, int x) {
	if (n == NULL)return NULL;
	else {
		if (n->data < x) { prt = n; searchp(n->R, x); }       //x보다 값이 작을 때, 오른쪽 자식 노드로 이동
		else if (n->data > x) {
			prt = n; searchp(n->L, x);                        //x보다 값이 클 때, 왼쪽 자식 노드로 이동
		}  
		else return n;                         //x와 값이 같을 때
	}
}
void BST::insert(int x) {                      
	insertp( x, Root->L, &(Root->L));           //왼쪽부터 탐색 시작
}
void BST::insertp(int x, Node *n, Node **rp) {
	Node *newnode;                              //삽입 노드 생성
	if (n == NULL) {                            //왼쪽 자식 노드가 없다면 새로 생성하여 트리에 삽입
		newnode = new Node;
		newnode->data = x;
		newnode->L = NULL;
		newnode->R = NULL;
		*rp = newnode;                          
	}
	else {
		if (n->data < x)insertp(x,n->R, &(n->R));           //삽입할 x가 노드 값보다 크다면 오른쪽 자식 노드에 있어야 하므로 n->R 탐색
		else if (n->data > x)insertp(x, n->L, &(n->L));     //삽입할 x가 노드 값보다 작다면 왼쪽 자식 노드에 있어야 하므로 n->L 탐색
		else return;                                        //기존에 있던 값과 같다면 스킵
	}
}
void BST::print() {
	printp(Root, 0, 0);
}
void BST::printp(Node *n, int d, int LR) {              //d는 트리의 높이 , LR은 왼쪽(0)/오른쪽(1)을 나타냄
	if(LR==1)for (int i = 0; i < d; i++)printf("        ");       
	printf("%8d", n->data);
	if (n->L == NULL)printf("\n");
	else printp(n->L, d + 1, 0);
	if (n->R == NULL);
	else printp(n->R, d + 1, 1);
}
void BST::Delete(int x) {
	Node *nn, *pp,*md, *mdp;             //nn은 삭제할 노드, pp는 삭제할 노드의 부모 노드, md는 , mdp는 md의 부모 노드
	nn = search(x);
	pp = prt;
	if (nn == NULL)return;                //해당 노드가 없을 때
	if (nn->L == NULL && nn->R == NULL) { //탐색한 노드의 자식 노드가 없다면
		if (pp->L == nn)pp->L = NULL;     //nn 노드를 가리키는 포인터, 노드 자체를 삭제
		else pp->R = NULL;
		delete nn;
	}
	else if (nn->L != NULL && nn->R == NULL) { //탐색한 노드의 왼쪽 자식 노드만 있다면,
		if (pp->L == nn)pp->L = nn->L;         //부모 노드의 왼쪽 자식 노드가 nn이라면, nn의 왼쪽 자식 노드와 연결
		else pp->R = nn->L;                    //부모 노드의 오른족 자식 노드가 nn이라면, nn의 왼쪽 자식 노드와 연결
		delete nn;                             //nn 삭제
	}
	else if (nn->L == NULL && nn->R != NULL) { //탐색한 노드의 오른쪽 자식 노드만 있다면,
		if (pp->L == nn)pp->L = nn->R;         //부모 노드의 왼쪽 자식 노드가 nn이면, nn의 오른쪽 자식 노드와 연결
		else pp->R = nn->R;                    //부모 노드의 오른쪽 자식 노드가 nn이면, nn의 오른쪽 자식 노드와 연결
		delete nn;
	}
	else {                               
		md = nn->R;                     
		mdp = nn;                       //md의 부모 노드
		while (md->L != NULL) {            //왼쪽 노드 전부 이동
			mdp = md;                      //md의 부모 노드
			md = md->L;                    //md의 왼쪽 자식 노드 탐색
		}
		nn->data = md->data;                     //삭제하기 위해 nn의 왼쪽 자식 노드들 중 가장 작은 값을 nn의 data 값으로 설정
		if (md->L == NULL && md->R == NULL) {    //md의 자식 노드가 없을 때
			if (mdp->L == md)mdp->L = NULL;      //mdp의 왼쪽 자식 노드가 md라면, md를 가리키는 포인터 삭제
			else mdp->R = NULL;					 //mdp의 오른쪽 자식 노드가 md라면, md를 가리키는 포인터 삭제
			delete md;                           //md 삭제
		}
		else if (md->L == NULL && md->R != NULL) { //md의 오른쪽 자식 노드가 존재
			if (mdp->L == md)mdp->L = md->R;       //mdp의 왼쪽 자식 노드가 md라면, mdp의 왼쪽 자식을 가리키는 포인터를 md의 오른쪽 자식 노드를 가리키는 포인터로 대체
			else mdp->R = md->R;                   //mdp의 오른쪽 자식 노드가 md라면, 이하동문
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
			printf("잘못 입력하셨습니다.\n");
		}
	}

}