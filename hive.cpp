#include <stdio.h>
int main()
{
	int num=0, cnt=1, i=1;
	scanf("%d", &num);
	while(i<num)
	{
		i=i+6*cnt;
		cnt++;
	}
	printf("%d", cnt);
	return 0;
}
