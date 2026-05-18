# Prim's Algorithm

INF = 9999999

n = int(input("Enter number of vertices: "))

graph = []

print("Enter adjacency matrix:")

for i in range(n):

    row = list(map(int, input().split()))

    graph.append(row)

selected = [0] * n

selected[0] = True

print("\nEdges Selected:")

edge_count = 0

total_cost = 0

while edge_count < n - 1:

    minimum = INF

    x = 0
    y = 0

    for i in range(n):

        if selected[i]:

            for j in range(n):

                if (
                    not selected[j]
                    and graph[i][j]
                ):

                    if minimum > graph[i][j]:

                        minimum = graph[i][j]

                        x = i
                        y = j

    print(f"{x} - {y} : {graph[x][y]}")

    total_cost += graph[x][y]

    selected[y] = True

    edge_count += 1

print("\nTotal Cost:", total_cost)