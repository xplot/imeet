import os
import fileinput
import shutil


PREFIX = 'imeet_'

def environment_dict():
    imeet_dict = {}
    for variable in os.environ.keys():
        variablel = variable.lower()
        if PREFIX in variablel:
            imeet_dict[variablel.replace(PREFIX, "")] = os.environ[variablel]
    return imeet_dict


def get_existing_env_variable_in_line(line, imeet_dict):
    for key in imeet_dict.keys():
        if key in line:
            return key
    return None


shutil.copy("config/settings.py.example", "config/settings.py")
imeet_dict = environment_dict()
for line in fileinput.input("config/settings.py", inplace=True):
    env_variable = get_existing_env_variable_in_line(line, imeet_dict)
    if env_variable:
        print(line.replace(line[line.index(":"):-1], ":'" + imeet_dict[env_variable] + "',"))
    else:
        print(line)
