@echo building gml library...
@pushd %SRC%
@copy /y tsconfigs\lib.json tsconfig.json > NUL
@call tsc
@popd

@echo building gml2d library...
@pushd %SRC%
@copy /y tsconfigs\lib2d.json tsconfig.json > NUL
@call tsc
@popd
