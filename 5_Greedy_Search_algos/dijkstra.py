# Dijkstra Algorithm

import sys

n = int(input("Enter number of vertices: "))

graph = []

print("Enter adjacency matrix:")

for i in range(n):

    row = list(map(int, input().split()))

    graph.append(row)

source = int(input("Enter source vertex: "))

distance = [sys.maxsize] * n

visited = [False] * n

distance[source] = 0

for count in range(n):

    minimum = sys.maxsize

    u = -1

    for i in range(n):

        if (
            not visited[i]
            and distance[i] < minimum
        ):

            minimum = distance[i]

            u = i

    visited[u] = True

    for v in range(n):

        if (
            graph[u][v] > 0
            and not visited[v]
            and distance[v] >
                distance[u] + graph[u][v]
        ):

            distance[v] = (
                distance[u] + graph[u][v]
            )

print("\nShortest Distances:")

for i in range(n):

    print(
        f"Vertex {i} : {distance[i]}"
    )