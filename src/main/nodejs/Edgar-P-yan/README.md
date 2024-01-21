# 1brc Node.js by [@Edgar-P-yan](https://github.com/Edgar-P-yan)

## Details:

- Machine: MacBook Pro M1 Max 32GB;
- Best results I could get with **Node.js is 23s**;
- Utilizes all cores of the system (10 on mine) via worker threads;
- A custom input-specific and quite fast float point to integer parser;
- Byte-by-byte processing of the whole file;
- Statically typed code that gets JITed very efficiently;

## What should be improved:

- Custom hashmap with 2-byte hashes. Right now I just use the builtin `Map`, which is too general purpose for this task, hence quite slow, around 30% of spent time is on the Map.
- Set higher watermarks for the GC, it might save some milliseconds too.
- Do fewer allocations. Right now for each station name in each row a new string gets allocated.
