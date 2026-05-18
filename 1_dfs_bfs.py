# Assignment 1
# BFS and DFS on Undirected Graph

from collections import deque

# ---------- GRAPH INPUT ----------

graph = {}

n = int(input("Enter number of vertices: "))

for i in range(n):

    vertex = input(f"\nEnter vertex {i+1}: ")

    neighbours = input(
        f"Enter neighbours of {vertex} separated by space: "
    ).split()

    graph[vertex] = neighbours

print("\nUndirected Graph:")
print(graph)

# ---------- DFS ----------

visited_dfs = set()

def dfs(node):

    if node not in visited_dfs:

        print(f"\nVisited -> {node}")

        visited_dfs.add(node)

        for neighbour in graph[node]:

            print(f"{node} --> {neighbour}")

            dfs(neighbour)

# ---------- BFS ----------using Queue

def bfs(start):

    visited_bfs = set()

    queue = deque()

    step = 1

    visited_bfs.add(start)

    queue.append(start)

    print("\n--- BFS Traversal Steps ---")

    while queue:

        current = queue.popleft()

        print(f"\nStep {step}")

        print(f"Visited Node: {current}")

        print(f"Queue Before Exploring: {list(queue)}")

        for neighbour in graph[current]:

            if neighbour not in visited_bfs:

                visited_bfs.add(neighbour)

                queue.append(neighbour)

                print(f"Added {neighbour} to queue")

        print(f"Queue After Exploring: {list(queue)}")

        step += 1

# ---------- START NODE ----------

start_node = input("\nEnter starting node: ")

# ---------- DFS OUTPUT ----------

print("\n==============================")
print("DEPTH FIRST SEARCH (DFS)")
print("==============================")

dfs(start_node)

# ---------- BFS OUTPUT ----------

print("\n==============================")
print("BREADTH FIRST SEARCH (BFS)")
print("==============================")

bfs(start_node)