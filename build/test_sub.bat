@echo setting up tests...
@pushd %TEST%\vendor
@call update.bat
@popd
@xcopy /eiy %TEST%\* %DIST_TEST%\ > NUL
@xcopy /y %DIST%\gml*.js %DIST_TEST%\ > NUL
@pushd %DIST_TEST%
@call npm install --silent
@call .\node_modules\.bin\karma start
@popd
