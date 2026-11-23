#!/bin/sh
# Downloads a thumbnail for every video in projects.js that doesn't have one yet.
# Run from this folder after adding videos:  sh thumbs.sh
cd "$(dirname "$0")"
mkdir -p thumbs
grep -oE 'type: "(drive|youtube)", id: "[^"]+"' projects.js | while read -r line; do
  type=$(echo "$line" | sed 's/type: "\([a-z]*\)".*/\1/')
  id=$(echo "$line" | sed 's/.*id: "//;s/"//')
  [ -s "thumbs/$id.jpg" ] && continue
  if [ "$type" = youtube ]; then
    curl -sL -o "thumbs/$id.jpg" "https://img.youtube.com/vi/$id/hqdefault.jpg"
  else
    curl -sL -o "thumbs/$id.jpg" "https://drive.google.com/thumbnail?id=$id&sz=w600"
  fi
  echo "added thumbs/$id.jpg"
done
