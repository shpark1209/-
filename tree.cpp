#include <stdio.h>
int main()
{
	int a, b, v, day=0;
	scanf("%d %d %d", &a, &b, &v);
/*	while(1)
	{
		v=v-a;
		day++;
		if(v<=0)
		{
			printf("%d", day);
			break;
		}
		v=v+b;
	}
	*/
	day=(v-a)/(a-b)+1;
	printf("%d", day);
	return 0;
}
