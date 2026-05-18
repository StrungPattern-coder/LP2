# Selection Sort

arr = list(map(int, input("Enter elements: ").split()))

n = len(arr)

print("\nOriginal Array:")
print(arr)

for i in range(n):

    min_index = i

    for j in range(i + 1, n):

        if arr[j] < arr[min_index]:

            min_index = j

    arr[i], arr[min_index] = arr[min_index], arr[i]

    print(f"\nStep {i+1}:")
    print(arr)

print("\nSorted Array:")
print(arr)