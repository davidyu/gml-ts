@echo updating vendor code...

@if not exist gl-matrix.js call curl -O https://raw.githubusercontent.com/toji/gl-matrix/master/dist/gl-matrix.js

@echo all done.
