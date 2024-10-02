import fs from "fs";
/*  
    A fájlkezelést az FS módullal tudjuk kezelni, hogyha csináltunk egy npm init utána megkaptuk a package.json fájlt, ott kell "type": "module",

    Csináltunk egy gyumolcsok.txt file-t és majd ezt szeretnénk beolvasni
    READFILE
*/
//Ez a callback alapú megoldás 
fs.readFile("gyumolcsok.txt", "utf-8", (err, data)=> {
    console.log(data); //visszaadja amit beírtunk a gyumolcsok.txt-be
    console.log(err); //ha nincsen err, akkor ez null lesz 
});

/*
    az fs.readFile() 3 paramétert vár 
    1. a fájl neve (jelen esetben gyumolcsok.txt)
    2. karakterkódolás, amivel beolvassuk  -> utf-8 
    3. callback function (ahol van egy err meg egy data) -> (err, data)=> {

    fs.readFile("gyumolcsok.txt", "utf-8", (err, data)=> {
    console.log(data); //visszaadja amit beírtunk a gyumolcsok.txt-be
    console.log(err);

    Az err-nak akkor vesszük hasznát ha valamilyen hiba keletkezett a kódban
    pl. ha a gyumolcsok2.txt próbáljuk beolvasni, ami nem is létezik 
    ->
    fs.readFile("gyumolcsok2.txt", "utf-8", (err, data)=> {
    Akkor kapunk egy ilyen error messsage-t, innen megtudhatjuk, hogy mi a probléma 
    ráadásul kiírja nekünk ezt is, hogy no such file or directory

    [Error: ENOENT: no such file or directory, open 'C:\Users\Norbert\Repository\express_back_file_upload\gyumolcsok2.txt'] {
    errno: -4058,
    code: 'ENOENT',
    syscall: 'open',
    path: 'C:\\Users\\Norbert\\Repository\\express_back_file_upload\\gyumolcsok2.txt'

    Megpróbáljuk ezt ascii-ben beolvasni 
    -> 
    fs.readFile("gyumolcsok.txt", "ascii", (err, data)=> {
    És akkor nem utf-8-ban ha van ékezet a fájlban, akkor ezt így fogja beolvasni
    - gC6rC6gdinnye

}
});
*/

fs.copyFile("gyumolcsok.txt", "gyumolcsok_copy.txt", (err)=> {
    console.log(err);
});

/*
    A COPYFILE is vár 3 paramétert 
    1. a fájl neve, amit másolunk (gyumolcsok.txt)
    2. a fájl neve, amire másoljuk (gyumolcsok_copy.txt)
    3. callback (err, data)=> { -> de itt majd nem kapunk vissza data-t, csak lemásolja a fájlt 

    Tehát a gyumolcsok.txt tartalmát bemásoltuk a gyumolcsok_copy.txt-be és ezzel létre is hoztuk a fájlt, másolatot 

    Az err az egészen addig null, ameddig nincsen hiba, ha meg nem null, akkor meg van hiba
*/

fs.writeFile("gyumolcsok.txt", "- görögdinnye", (err)=> {
    console.log(err);
});

/*
    Ez is vár 3 paramétert 
    1. fájl neve -> gyumolcsok.txt
    2. az érték, hogy mit akarunk beletenni ebbe a fájlba -> "- görögdinnye"
    3. callback function 

    És most benne van csomó dolog a gyumolcsok.txt-be de miután a writeFile-val megadunk neki valamit itt pl. "- görögdinnye"
    akkor utána már csak az lesz a fájl-ban, hogy - görögdinnye és a többi dolog meg eltünik, ami eddig benne volt!!!! 

    És a gyumolcsok.txt ezután már csak az található, hogy - görögdinnye, azért mert a writeFile 
    újraírja a fájl tartalmát 

    És ha szeretnénk valamit hozzáfüzni a fájlhoz, tehát nem úgy mint itt, hogy kitörölni aztán meg újraírni 
    ->
    APPENDFILE
*/

fs.appendFile("gyumolcsok.txt", "\n- eper", (err)=> {
    console.log(err);
});

/*
    Ez is vár 3 paramétert 
    1. fájl neve (gyumolcsok.txt)
    2. az érték, amit hozzá akarunk adni, füzni -> "\n- eper" \n az jelenti majd, hogy új sorban lesz ez az érték 
    3. callback function 

    És elötte az volt benne, hogy - görögdinnnye, hozzáadtuk, hogy "\n - eper"
    - görögdinnye 
    - eper 

    Ilyenkor nem az van, mint a writeFile-val, hogy kitörli a tartalmát, hanem egyszerűen hozzáfüz az APPENDFILE
*/

fs.unlink("hibas_fajl.log", (err)=> {
    console.log(err);
});

/*
    UNLINK -> fájl törlése
    Ezzel tudunk majd törölni, csinálunk egy hibas_fajl.log-ot 
    És ilyenkor kitöröljük ezt a file-t 

    Vár 2 paramétert
    1. file neve, amit törölni szeretnénk 
    2. callback 

    Fontos, hogy nem létezik az a fájl, amit törölni szeretnénk, akkor kapunk majd egy err-t
    Tehát csak akkor tud letörölni ha létezik a fájl, különben meg dog egy err-t -> no such a file or directory, unlink 

    Van lehetőség, hogy megnézzük, hogy létezik-e a fájl 
    ->
    EXIST
*/

fs.exists("hibas_fajl.log", (exists)=> {
    console.log(exists); //ha létezik a file akkor true, ha nem akkor false 
});

/*
    Vár két paramétert 
    1. fájl neve 
    2. callback -> (exists)=> { amit itt visszakapunk az egy boolean érték lesz 
*/ 

fs.rename("asdf.txt", "sdfg.txt", (err)=> {
    console.log(err);
});

/*
    RENAME

    Csináltunk egy asdf.txt-t, ezt fogjuk majd átnevezni 

    A rename vár 3 paramétert 
    1. fájl neve, amit át akarunk majd írni (asdf.txt)
    2. a fájl neve, amire majd át akarjuk írni (sdfg.txt)
    3. callback 

    És akkor már nincs olyan, hogy asdf, hanem egy olyan van, hogy sdfg.txt, mert átneveztük a fájlt
    Ha volt valami tartalom az meg fog maradni, csak a fájl neve fog megváltozni 
*/

/*
    Létezik a callback-es megoldás, meg létezik a async-os megoldás csinálunk majd függvényeket 
    -> 
    file_handling_async.js
*/

const existsFile = fs.existsSync("mappa");
console.log(existsFile); // true 

/*
    Akkor ez a jobbik megoldás, mert itt nem kell callback-et hívogatni meg ilyesmit mit itt 
    ->
    fs.exists("hibas_fajl.log", (exists)=> {
    console.log(exists);

    Az exists és az existsSync fájlokra és könyvtárakra is alkalmazhatóak
*/