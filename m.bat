@set SRC=src
@set TEST=test
@set DIST=dist
@set DIST_TEST=%DIST%\%TEST%

@if not exist %DIST% mkdir %DIST%
@if not exist %DIST%\lib mkdir %DIST%\lib
@if not exist %DIST_TEST% mkdir %DIST_TEST%

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
