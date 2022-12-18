#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
using namespace std;
int n;
int arr[1000];
void print() {
	int i;
	for (i = 1; i <= n; i++) {
		printf("%4d", arr[i]);
	}
	printf("\n");
}
int find(int a) {
	int t, root, p;
	t = a;
	while (arr[t] != 0) {             //부모가 0이면 종료
		t = arr[t];
	}
	root = t; t = a;
	while (arr[t] != 0) {             //부모가 0이면 종료
		p = t;
		t = arr[t];
		arr[p] = root;
	}
	return t;
}
void union_(int a, int b) {
	int pa, pb;
	pa = find(a);              //부모 노드 탐색
	pb = find(b);
	if (pa != pb) {
		arr[pb] = pa;
	}
}
int main() {
	char c;
	int a, b;
	printf("Size? ");
	scanf("%d", &n);
	while (true) {
		print();
		scanf(" %c", &c);
		if (c=='u') {
			scanf("%d %d", &a, &b);
			union_(a, b);
		}
		else if (c=='f') {
			scanf("%d", &a);
			printf("%d belongs to group %d\n", a, find(a));
		}
		else if (c=='q') {
			break;
		}
		else {
			printf("Unknown command\n");
		}
	}
	return 0;
}