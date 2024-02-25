'''
A Python script to remove the possible duplicate images.
'''

import hashlib, os, glob
duplicates = []
hash_keys = dict()
dup_files = {}

directory = '/home/abhay/Downloads/Newfolder/'
jpegFilenamesList = glob.glob(directory + '*.jpeg')

for i, f in enumerate(jpegFilenamesList):
  with open(f, 'rb') as f:
    filehash = hashlib.md5(f.read()).hexdigest()
  if filehash not in hash_keys:
    hash_keys[filehash] = i
  else:
    duplicates.append((i, hash_keys[filehash], f))
    if filehash in dup_files:
      dup_files[filehash].append(f.name)
    else:
      dup_files[filehash] = [f.name]
    os.remove(f.name)


print(dup_files)