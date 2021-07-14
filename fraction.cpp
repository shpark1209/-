#include <stdio.h>
int main()
{
	int num, cnt=0;
	scanf("%d", &num);
	while(num>0)                   
	{ 
		cnt++;
		num=num-cnt;
	}
	if(cnt%2==0)
	{
		printf("%d/%d", cnt+num, 1-num);
	}
	else
	{
		printf("%d/%d", 1-num, cnt+num);
	}
	return 0;
}
