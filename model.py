import sys

hours = float(sys.argv[1])
attendance = float(sys.argv[2])

marks = (hours * 10) + (attendance * 0.5)

print(round(marks, 2))