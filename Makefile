.PHONY: folders lib test
SHELL = /bin/bash

SRC=src
TEST=test
DIST=dist
DIST_TEST=$(DIST)/$(TEST)

lib: folders
	@echo "building gml library..."
	@( pushd $(SRC); cp -r tsconfigs/lib.json tsconfig.json; tsc; popd ) > /dev/null
	@( pushd $(SRC); cp -r tsconfigs/dec.json tsconfig.json; tsc; popd ) > /dev/null

lib2d: folders
	@echo "building gml2d library..."
	@( pushd $(SRC); cp -r tsconfigs/lib2d.json tsconfig.json; tsc; popd ) > /dev/null
	@( pushd $(SRC); cp -r tsconfigs/dec2d.json tsconfig.json; tsc; popd ) > /dev/null

folders:
	@mkdir -p $(DIST)
	@mkdir -p $(DIST)/lib
	@mkdir -p $(DIST_TEST)

test: update lib
	@echo "setting up tests..."
	@cp -rf $(TEST)/* $(DIST_TEST)/ > /dev/null
	@pushd $(DIST_TEST) > /dev/null && npm install && popd > /dev/null
	@cp -f dist/gml.js $(DIST_TEST)/perf/ > /dev/null
	@pushd $(DIST_TEST) > /dev/null && ./node_modules/.bin/karma start && popd > /dev/null

update:
	@echo "updating vendor & library code...";
	@( pushd $(TEST)/vendor > /dev/null && sh update.sh && popd > /dev/null )
