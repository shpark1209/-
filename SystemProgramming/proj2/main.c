#include "proj2.h"

int main(int argc, char **argv){
	int fd,j=0,num;
	char buf[BUF_SIZE];
	char *p;
	int num_thread = atoi(argv[1]);
	int *input_arr;
	int *output_arr;
	ssize_t ret_in;
	int result;
	// Read the data from the file (./input.txt)
	if ((fd = open("./input.txt", O_RDONLY)) == -1) {
		perror("File open error");
		return 1;
	}
	// 1. open the file (./input.txt)
	// 2. read the data from the file 

	read(fd, &buf, BUF_SIZE);
	
	// 2.1 Length : BUF_SIZE
	// 3. Using the following code, get the number of data
	p = strtok(buf," ");
	int input_num= atoi(p);
	printf("input_num: %d\n", input_num);
	printf("num_thread= %d \n", num_thread);
	// 4. Allocate the arrays for input 
	// The number of data in input array == input_num
	input_arr = (int *)malloc(sizeof(int) * input_num);
	// 5. Allocate the arrays for output 
	// The number of data in ouput array == num_thread 
	output_arr = (int *)malloc(sizeof(int) * num_thread);
	while(p!=NULL){
		p =strtok(NULL," ");
		if(p!=NULL){
			num = atoi(p);
			input_arr[j++]=num;	
			//printf("p: %d ", num);
		}
	}
	/*printf("\n");
	for (int i = 0; i < input_num; i++) {
		printf("%d ", input_arr[i]);
	}
	printf("\n");*/
	// Thread creation
	
	// 1. Allocate array of pthread_t
	pthread_t* thread_arr = malloc(sizeof(pthread_t) * num_thread); 
	// 2. Allocate arguments for the thread function
	int offset=0;
	struct thread_args argument;
	if (input_num % num_thread == 0) {
		offset = 0;
		//printf("here\n");
		for (int i = 0; i < num_thread; i++) {
			
			argument.arr = input_arr;
			argument.offset = offset;
			argument.size = input_num / num_thread;
			pthread_create(&thread_arr[i], NULL, thread_func, (void*)&argument);
			pthread_join(thread_arr[i], (void**)&result);
			//printf("i: %d\n", result);
			output_arr[i] = result;
			offset += (input_num / num_thread);
		}
	}
	else {
		for (int i = 0; i < num_thread; i++) {
			if (i == num_thread - 1) {
				argument.arr = input_arr;
				argument.offset = (input_num / num_thread) * (num_thread - 1);
				argument.size = input_num - offset;
				//printf("size=%d\n", argument.size);
				pthread_create(&thread_arr[i], NULL, thread_func, (void*)&argument);
				pthread_join(thread_arr[i], (void**)&result);
				//printf("i: %d\n", result);
				output_arr[i] = result;
			}
			else {
				argument.arr = input_arr;
				argument.offset = offset;
				argument.size = input_num / num_thread;
				pthread_create(&thread_arr[i], NULL, thread_func, (void*)&argument);
				pthread_join(thread_arr[i], (void**)&result);
				//printf("i: %d\n", result);
				output_arr[i] = result;
				offset += (input_num / num_thread);
			}
		}
		

	}
	// 3. Create the threads
	// 4. Join the threads
	/*
	for (int i = 0; i < num_thread; i++) {
		pthread_join(thread_arr[i], (void **)&result);
		printf("i: %d\n", result);
		output_arr[i] = result;
	}
	*/
	// 4-1. Get the result of the thread functions using pthread_join.
	// 4-2. Store the result of the thread function to the output_arr.
	// 5. Get the minimum value from the output_arr using the main thread. (The last line)

	printf("min: %d\n", find_min_value(output_arr,0,num_thread));
	// 6. close the file.
	return 0;
}
