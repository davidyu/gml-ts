.PHONY: folders lib test
SHELL = /bin/bash

SRC=src
TEST=test
DIST=dist
DIST_TEST=$(DIST)/$(TEST)

lib: folders
	pushd $(SRC); cp -r tsconfigs/lib.json tsconfig.json; tsc; popd
	pushd $(SRC); cp -r tsconfigs/dec.json tsconfig.json; tsc; popd

folders:
	@mkdir -p $(DIST)
	@mkdir -p $(DIST)/lib
	@mkdir -p $(DIST_TEST)

test: lib
	pushd $(SRC);
	cp -rf $(TEST)/* $(DIST_TEST)/
	@( pushd $(DIST_TEST) && npm install && popd ) > /dev/null
