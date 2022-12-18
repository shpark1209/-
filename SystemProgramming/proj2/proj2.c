#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <limits.h>
#include <pthread.h>


struct thread_args{
	int *arr;
	int offset;
	int size;
};

void *thread_func(void *args){
	int min = 2147483647;
	//implement the code
	struct thread_args* argument = (struct thread_args *)args;
	for (int i = argument->offset; i < argument->offset+argument->size; i++) {
		if (min > argument->arr[i])min = argument->arr[i];
	}
	return min;
}

int find_min_value(int *arr, int offset, int size){
	int min = 2147483647;
	for (int i = offset; i < offset + size; i++) {
		if (min > arr[i])min = arr[i];
	}
	return min;
}
