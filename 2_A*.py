# Assignment 2
# A* Algorithm
# A* uses: f(n)=g(n)+h(n)
# g(n).    actual cost from start
# h(n).    estimated cost to goal
# f(n).    total estimated cost

open_set = set(['A'])

closed_set = set()

g = {}

g['A'] = 0

parents = {}

parents['A'] = 'A'

# Graph with distances

graph = {

    'A': [('B', 1), ('C', 3)],

    'B': [('D', 3), ('E', 1)],

    'C': [('F', 5)],

    'D': [('G', 3)],

    'E': [('G', 1)],

    'F': [('G', 2)],

    'G': []

}

# Heuristic values

heuristic = {

    'A': 5,

    'B': 3,

    'C': 4,

    'D': 2,

    'E': 1,

    'F': 2,

    'G': 0
}

start = input("Enter Start Node: ")

goal = input("Enter Goal Node: ")

open_set = set([start])

g[start] = 0

parents[start] = start

while len(open_set) > 0:

    n = None

    # Find node with lowest f(n)

    for v in open_set:

        if n == None or g[v] + heuristic[v] < g[n] + heuristic[n]:

            n = v

    if n is None:
        break

    if n == goal:

        path = []

        while parents[n] != n:

            path.append(n)

            n = parents[n]

        path.append(start)

        path.reverse()

        print("\nShortest Path Found:")

        print(" -> ".join(path))

        print("\nTotal Cost =", g[goal])

        break

    print(f"\nCurrent Node: {n}")

    for (m, weight) in graph[n]:

        if m not in open_set and m not in closed_set:

            open_set.add(m)

            parents[m] = n

            g[m] = g[n] + weight

            print(f"Added {m} to open set")

        else:

            if g[m] > g[n] + weight:

                g[m] = g[n] + weight

                parents[m] = n

                if m in closed_set:

                    closed_set.remove(m)

                    open_set.add(m)

    open_set.remove(n)

    closed_set.add(n)

    print("Open Set:", open_set)

    print("Closed Set:", closed_set)