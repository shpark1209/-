all: proj1.o main.o
	gcc -o a.out proj1.o main.o -lrt
proj1.o: proj1.c
	gcc -c proj1.c
main.o: main.c
	gcc -c main.c
clean:
	rm *.o a.out
