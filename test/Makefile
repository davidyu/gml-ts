.PHONY: folders app update lib test
SHELL = /bin/bash

SRC=src
TEST=test
DIST=dist
DIST_TEST=$(DIST)/$(TEST)

folders:
	@mkdir -p $(DIST)
	@mkdir -p $(DIST)/lib
	@mkdir -p $(DIST_TEST)

lib:
	pushd $(SRC); cp -r tsconfigs/lib.json tsconfig.json; tsc; popd
	pushd $(SRC); cp -r tsconfigs/dec.json tsconfig.json; tsc; popd

test: lib folders
	pushd $(SRC);
	cp -rf $(TEST)/* $(DIST_TEST)/
	@( pushd $(DIST_TEST) && npm install && popd ) > /dev/null
