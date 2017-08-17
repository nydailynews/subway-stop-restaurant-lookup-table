#!/usr/bin/bash
rm data/eating*; for i in `cat json.txt`; do cd data; wget "$i"; cd ../; done
