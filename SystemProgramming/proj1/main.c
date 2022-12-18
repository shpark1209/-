#include "proj1.h"
void signal_handler(){
	//printf("signal caught");
	;
}
// 1. Set the number of input and process using arguments.
// 2. Fill the sets_shared memory function in proj1.c file
// 3. Block the SIGCONT signal
// 4. 
// 4-1. Create child processes 
// 4-2. Unblock the SIGCONT signal
// 4-3  and pause them.
int main(int argc, char**argv){

	int n_input, n_process;
	scanf("%d %d", &n_input, &n_process);

	void *arr= sets_shared_memory();
	generate_input((int *)arr,n_input);
	/*for (int i = 0; i < n_input; i++) {
		int* array = (int*)arr;
		printf("%d ", array[i]);
	}
	printf("\n");*/
	sigset_t mask, prev_mask;
	sigemptyset(&mask);
	sigaddset(&mask, SIGCONT);
	sigprocmask(SIG_BLOCK, &mask, &prev_mask);


	pid_t* pid_arr = malloc(sizeof(pid_t) * n_process);
	pid_t pid=0;
	int min = BILLION;
	int cnt = 0;
	for (int i = 0; i < n_process; i++) {
		signal(SIGCONT, signal_handler);
		if ((pid_arr[i] = fork()) == 0) {
			sigprocmask(SIG_SETMASK, &prev_mask, NULL);
			puts("child made");
			if (i == n_process - 1) { 
				kill(getppid(), SIGCONT);
				//puts("end of child\n");
			}
			pause();
			//printf("child resumed\n");
			if (n_input % n_process == 0) {
				int chunk = n_input / n_process;
				int process_idx = i;
				min = child_find_min_value(process_idx, (int*)arr, chunk);
				put_value((int*)arr, n_input, process_idx, min);
				kill(pid_arr[i], SIGINT);
				//printf("%d", min);
			}
			else {
				int chunk = n_input / n_process;
				int process_idx = i;
				
				//printf("process idx=%d\n", process_idx);
				if (process_idx == n_process-1)min = child_find_min_value((-1)*cnt*chunk, (int*)arr, chunk + n_input % n_process);
				else { min = child_find_min_value(process_idx, (int*)arr, chunk); cnt++; }
				put_value((int*)arr, n_input, process_idx, min);
				//printf("%d", min);
			}
			exit(0);
		}
		//puts("parent resumed\n");
	}
	
	for (int i = 0; i < n_process; i++) {
		int status;
		kill(pid_arr[i], SIGCONT);
		waitpid(pid_arr[i], &status, 0);
		//puts("wait\n");
	}
	
	//sigprocmask(SIG_BLOCK, &mask, &prev_mask);
	//sigprocmask(SIG_SETMASK, &prev_mask, NULL);
	int final_min = parent_find_min_value(arr, n_input, n_process);
	printf("Final Min: %d", final_min);
	munmap(arr, MEM_SIZE);
	shm_unlink(SHM_NAME);
	// 5. Childs: After resuming, find the minimum value from their chunk.
	// 6. Childs: After finding the minimum value, store it to the share memory spaces.
	//            Dest : arr + (size of int * number of input + child process index)
	//    

	/*for (int i = 0; i<n_process; i++) {

	}*/
        //7. 
	//7.1 Unblock the SIGCONT signal
	//7.2 Pause parent after creating child processes
	
	//8. After resuming, parent reaps child processes
	
	//9. Find min values from the results of child processes.
	//parent_find_min_value(arr, n_input, n_process);

	//10. Print the minimum value.

	//11. Unmap, and Unlink shared memory region
	return 0;

}
