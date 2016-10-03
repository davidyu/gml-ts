@set SRC=src
@set TEST=test
@set DIST=dist
@set DIST_TEST=%DIST%\%TEST%

@if not exist %DIST% mkdir %DIST%
@if not exist %DIST%\lib mkdir %DIST%\lib
@if not exist %DIST_TEST% mkdir %DIST_TEST%

@if not "%1" == "" (
    @set TARGET=%1
) else (
    @set TARGET=lib
)

@if "%TARGET%"=="lib"  call build\lib_sub.bat
@if "%TARGET%"=="perf" call build\lib_sub.bat && call build\perf_sub.bat
@if "%TARGET%"=="test" call build\lib_sub.bat && call build\test_sub.bat
