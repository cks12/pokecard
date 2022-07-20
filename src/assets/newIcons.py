import os
icons = open("icons.tsx",'w')

files:str = []

for (dirPath, dirName, fileName) in os.walk("pokemon-icons"):
    files.extend(fileName)

imports = []
functions = []
exports = []
for file in files:
    fileName = file.split(".")[0]
    stringTemp = "import {ReactComponent as "+fileName.capitalize()+"} from '../assets/pokemon-icons/"+file+"';\n"
    funcTemp = '''{c}Icon: () => {{ return<{b}/>}},
'''.format(b=fileName.capitalize(),c=fileName)
    
    imports.append(stringTemp)
    functions.append(funcTemp)
string = '''
import React from "react";
{imp}
const Icons = {{
{funcs}
}}
export default Icons

'''.format(imp = "".join(map(str, imports)), funcs= "".join(map(str, functions)))

icons.write(string)
print(string)