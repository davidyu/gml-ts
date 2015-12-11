#!/bin/bash

# usage: download url target
# where target is the name of the local file target
download() {
    local url="$1"
    local target="$2"
    [ -f "$target" ] || curl -k "$url" -o "$target"
}

echo "updating vendor code..."

download https://raw.githubusercontent.com/toji/gl-matrix/master/dist/gl-matrix.js gl-matrix.js

echo all done.
