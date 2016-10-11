@echo copying eyeball test files...
@xcopy /eiy %TEST%\* %DIST_TEST%\ > NUL
@xcopy /y %DIST%\gml2d.js %DIST_TEST%\eyeball\2d\ > NUL
@xcopy /y %DIST%\gml.js %DIST_TEST%\eyeball\3d\ > NUL
