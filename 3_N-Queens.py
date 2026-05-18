# Assignment 3
# N-Queens using Backtracking
# Constraint Satisfaction Problem

N = int(input("Enter value of N: "))

board = [[0 for i in range(N)] for j in range(N)]

# Function to print board

def print_board():

    print("\nSolution Board:\n")

    for row in board:

        for cell in row:

            if cell == 1:

                print("Q", end=" ")

            else:

                print(".", end=" ")

        print()

# Check if queen can be placed safely

def is_safe(row, col):

    # Check left side row

    for i in range(col):

        if board[row][i] == 1:

            return False

    # Upper diagonal

    i = row
    j = col

    while i >= 0 and j >= 0:

        if board[i][j] == 1:

            return False

        i -= 1
        j -= 1

    # Lower diagonal

    i = row
    j = col

    while i < N and j >= 0:

        if board[i][j] == 1:

            return False

        i += 1
        j -= 1

    return True

# Backtracking function

def solve(col):

    # All queens placed

    if col >= N:

        return True

    # Try every row

    for i in range(N):

        print(f"\nTrying Queen at Row {i}, Column {col}")

        if is_safe(i, col):

            board[i][col] = 1

            print(f"Placed Queen at Row {i}, Column {col}")

            # Recursive call

            if solve(col + 1):

                return True

            # Backtracking

            board[i][col] = 0

            print(f"Backtracking from Row {i}, Column {col}")

    return False

# Main

if solve(0):

    print_board()

else:

    print("Solution does not exist")