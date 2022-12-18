#include "proj1.h"

void generate_input(int*arr, int ninput){
   srand(time(NULL));
   int result = 0;
   int cnt =0;
   while(cnt < ninput){
   	result = rand()%BILLION;
	arr[cnt]=result;
	printf("all the input\n");
	printf("%d\n", result);
	cnt++;
   } 
}

void *sets_shared_memory(){ // FIX ME!
	void *ret = NULL;
	pid_t pid = 0;
	int fd = shm_open(SHM_NAME, O_RDWR | O_CREAT, 0666);
	ftruncate(fd, MEM_SIZE);
	ret= mmap(0, MEM_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
	return ret;
}

int child_find_min_value(int id, int*arr, int chunk){ // FIX ME
	int min = BILLION;
	if (id < 0) {
		id = (-1) * id;
		for (int i =id; i < id + chunk; i++) {
			//printf("min:%d found:%d", min, arr[i]);
			if (min > arr[i])min = arr[i];
		}
		return min;
	}
	else {
		for (int i = 0 + id * chunk; i < 0 + id * chunk + chunk; i++) {
			//printf("min:%d found:%d", min, arr[i]);
			if (min > arr[i])min = arr[i];
		}
		return min;
	}
		
	
}

void put_value(int *arr, int n_input, int id, int min){ // FIX ME
	arr[sizeof(int) * n_input + id] = min;
	
	return;
}

int parent_find_min_value(void *arr,int n_input, int n_process){ // FIX ME
	int min = BILLION;
	int* array = (int*)arr;
	for (int i = sizeof(int) * n_input; i < sizeof(int) * n_input + n_process; i++) {
		//printf("min: %d found:%d", min, array[i]);
		if (min > array[i])min = array[i];
	}
	
	return min;
}
