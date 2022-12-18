#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <algorithm>
#include <vector>
using namespace std;
class edge {
public:
	int x, y, w;
	bool operator <(const edge& ed)const {
		return w < ed.w;
	}
};
edge edset[1000];
int n, m;
int arr[1000];
vector<pair<int, int>> paira[1000];
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
int visited[1000];
void print(int node, int w , int d, int LR) {              //d는 트리의 높이 , LR은 왼쪽(0)/오른쪽(1)을 나타냄
	int first=1;
	visited[node] = 1;
	if (LR == 1)for (int i = 0; i < d; i++)printf("          ");
	printf("[%3d, %3d]", w, node);
	for (int i = 0; i < paira[node].size(); i++) {
		if (visited[paira[node][i].first] != 1) {
			if (first == 1) {
				print(paira[node][i].first, paira[node][i].second, d + 1, 0);
			}
			else {
				print(paira[node][i].first, paira[node][i].second, d + 1, 1);
			}
			first = 0;
		}
	}
	if (first == 1) {                 //자손이 없음
		printf("\n");
	}
}
int is_used[1000];
int main() {
	int sum = 0;
	scanf("%d %d", &n, &m);
	for (int i = 1; i <= m; i++) {
		scanf(" %d %d %d", &edset[i].x, &edset[i].y, &edset[i].w);
	}
	sort(edset + 1, edset + m + 1);
	for (int i = 1; i <= m; i++) {
		if (find(edset[i].x) != find(edset[i].y)) {
			is_used[i] = 1;
			union_(edset[i].x, edset[i].y);
		}
	}
	for (int i = 1; i <= m; i++) {
		if (is_used[i] == 1) {
			sum += edset[i].w;
		}
	}
	printf("weight sum=%d\n", sum);
	for (int i = 1; i <= m; i++) {
		if (is_used[i] == 1) {
			paira[edset[i].x].push_back(make_pair(edset[i].y, edset[i].w));
			paira[edset[i].y].push_back(make_pair(edset[i].x, edset[i].w));
		}
		
	}
	print(1, 0, 0, 0);
	return 0;
}
/*
5 10
1 2 10
1 4 5
1 5 6
2 3 1
2 4 3
2 4 4
3 4 9
3 5 4
3 5 6
4 5 2
*/