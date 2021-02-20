import os
from pathlib import Path
src_path = Path(os.getcwd()).parent/'src'
files = []
for file in src_path.glob('**/*'):
    if file.is_file():
        files.append(str((file.relative_to(src_path))).replace('\\', "/"))
print(files)
with open(src_path/'cache.appcache', 'w') as f:
    f.write("CACHE MANIFEST\n")
    for c in files:
        f.write(c+"\n")

