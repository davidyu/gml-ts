.PHONY: folders lib test
SHELL = /bin/bash

SRC=src
TEST=test
DIST=dist
DIST_TEST=$(DIST)/$(TEST)

lib: folders
	pushd $(SRC); cp -r tsconfigs/lib.json tsconfig.json; tsc; popd
	pushd $(SRC); cp -r tsconfigs/dec.json tsconfig.json; tsc; popd

lib2d: folders
	pushd $(SRC); cp -r tsconfigs/lib2d.json tsconfig.json; tsc; popd
	pushd $(SRC); cp -r tsconfigs/dec2d.json tsconfig.json; tsc; popd

folders:
	@mkdir -p $(DIST)
	@mkdir -p $(DIST)/lib
	@mkdir -p $(DIST_TEST)

test: update lib
	pushd $(SRC);
	cp -rf $(TEST)/* $(DIST_TEST)/
	@( pushd $(DIST_TEST) && npm install && popd ) > /dev/null
	cp -f dist/gml.js $(DIST_TEST)/perf/
	pushd $(DIST_TEST) && ./node_modules/.bin/karma start --browsers Firefox --single run && popd

update:
	pushd $(TEST)/vendor && sh update.sh && popd
