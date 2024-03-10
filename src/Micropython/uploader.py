from machine import reset

def writeCode(code, filename):
    with open(filename, "w") as file:
        file.write(str(code))
    file.close()
