@echo running perf tests...
@xcopy /y %TEST%\perf\* %DIST_TEST%\perf\  > NUL
@xcopy /y %DIST%\gml*.js %DIST_TEST%\perf\ > NUL
@xcopy /y %TEST%\package.json %DIST_TEST%\ > NUL
@pushd %DIST_TEST%
@call npm install --silent
@call node perf\vec.js
@popd
