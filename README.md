# General file identification

http://www.shikadi.net/moddingwiki/Descent

https://www.descent-freespace.com/ddn/index.html

https://web.archive.org/web/20081120054017/http://www.descent2.com/ddn/specs/rdl

https://mark0.net/onlinetrid.html

https://hexed.it/

https://gitpod.io/#https://github.com/gitpod-io/spring-petclinic



# HOG file

Download HOG file from here:
https://www.dxx-rebirth.com/game-content/

Original game source code here:
https://github.com/videogamepreservation/descent

* 3 magic bytes = "DHF"
* Filename ending with 0
* 2 bytes with ?
* 2 bytes length or offset to the next file
* 41632 + 22 bytes = descent.txb file

read-hog.ts will read all files from HOG file and extract them to files/

# BBM file

Some kind of bitmap with FORM prefix, two types 'PBM ' and 'ILBM'. Check iff_bitmap_header structure. Data starts after BODY.

# LVL file

Game levels. See GameSave.c file.

* 4 bytes = 'LVLP'. Line 1656.
* Version 4 bytes == 1
* minedata_offset
* gamedata_offset
* hostagetext_offset

http://www.descent2.de/

# PCX file

This is supposed to be a standard PCX image file, but it seems it's missing a palette.

https://www.npmjs.com/package/pcx-js?activeTab=readme

https://www.fileformat.info/format/pcx/egff.htm

