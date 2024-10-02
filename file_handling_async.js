/*
    Ezek innen jönnek, hogy fs/promises szóval ez nagyon fontos, hogy be legyen importálva
*/

import { read } from "fs";
import fs from "fs/promises";

async function readFile() {
    const txt = await fs.readFile("gyumolcsok.txt", "utf-8");
    /*
        Ha ez van beimportálva -> import fs from "fs/promises", akkor így tudunk hozzáférni a readFile-hoz 
        ha csak simán ez -> import fs from "fs"; akkor így await fs.promises.readFile()
    */
   console.log(txt);
};

/*
    Van egy ilyen, hogy readFileSync() ez blokkolja a kód futását, tehát addig nem megy tovább a kód, ameddig be nem olvasta a file-t!!!!
    const txt = await fs.readFileSync();
    és ezért van az használva, hogy const txt = await fs.readFile(); és ez beimportálva -> import fs from "fs/promises";
    Ezért van az, hogy a függvényben tudunk await-elni a fájlnak a tartalmára, mert a /promise lett beimportálva 
*/

readFile();
/*
    Itt meghívjuk a readFile-t és ez meg (const txt = await fs.readFile("gyumolcsok.txt", "utf-8" ), 
    console.log(txt) kiírja a konzolra (node file_handling_async.js) ami benne van ebben

    Fontos, hogy ugyanazok a paraméterek, csak itt nincsen callback, mert egy async függvényben await-elünk!!! 
*/

/*
    Ennek az a hátránya, hogyha van egy hiba, akkor leáll a kód futása, tehát az ami itt van utána az nem fog lefutni 
*/
console.log("asdf");
/*
    Mert az async await-es függvényt, mindig be kell dobni egy try-catch blokkba így!!!!!!!

    async function readFile() {
        try {
            const txt = await fs.readFile("gyumolcsok2.txt", "utf-8");  direkt hibásan írtuk, hogy gyumolcsok2.txt, hogy dobjon egy err-t 
        } catch(err) {
            console.log(err);
        }
    }

    Ilyenkor már nem állítja le a kód futását, tehát a console.log("asdf") az meg fog jelenni!! 
    Itt látszik aszinkronítás, mert a console.log("asdf")-et elöbb kiírta 
    mint a console.log(err)-t, hiszen időbe tellik amíg beolvassa a file-t 
*/
//*********************************************************************************************/
//mindenből létezik aszinkon változat is pl. writeFile
async function writeFile() {
    try {
        await fs.writeFile("gyumolcsok.txt", "- feketeribizli");
        /*
            Ennek nincsen visszatérési értéke (promise VOID), tehát nem kell const valamibe elmenteni 
        */
    } catch(err) {
        console.log(err);
    }
}

writeFile();
//ilyenkor csak az lesz a file-ban amit megadtunk itt paraméternek, semmi más "- feketeribizli"), mert ugyanyúgy kitörli a file eddigi tartalmát

//*********************************************************************************************/
async function appendFile() {
    try {
        await fs.appendFile("gyumolcsok.txt", "\n-görögdinnye");
    } catch(err) {
        console.log(err);
    }
}

appendFile();
//ugyanazok a metódus nevek, csak nem callback-el használjuk őket hanem async await 
/*
    Van két megoldás 
    1. import .. fs -> fs.promises.appendFile()
    2. import .. fs/promises -> fs.appendFile()
*/
//*********************************************************************************************/
//mkdir(make directory) - rmdir (remove directory)

async function mkdir() {
    try {
        await fs.mkdir("mappa")
    } catch(err) {
        console.log(err);
    }
}

mkdir();
/*
    Csinál az mkdir egy mappát, csak egy paramétert vár -> mappa neve 
    Kétszer ugyanolyan nevű mappát nem készíthetünk 
    Tehát, ha most elkészítettük ezt a mappát és mégegyszer el akarnánk, akkor a catch ágba megyünk be (két egyforma nevű mappa nem lehet)
*/

async function rmdir() {
    try {
        await fs.rmdir("mappa")
    } catch(err) {
        console.log(err);
    }
}

rmdir();
/*
    Letöröltük az elöbb készített mappát 
    Nem létező mappát nem tudunk letörölni, ilyenkor a catch ágba megyünk be
*/
//*********************************************************************************************/

//hogyha létezik olyan, hogy mappa 
async function stat() {
    try {
        const stat = await fs.stat("mappa");
        console.log(stat); //visszakapunk dolgokat, hogy mikor hoztuk létre, módosítottuk a mappát meg minden ilyen adatot (timestamp-eset is)
    } catch(err) {
        console.log(err);
    }
}

stat();
//*********************************************************************************************/

//exists meg tudja vele nézni, hogy létezik-e a mappa vagy file 
async function checkExists() {
    const exists = fs.exists("mappa");
    console.log(exists);
}

checkExists();

/*
    Ez így nem jó, mert az exists az simán az fs-ben van az fs/promises-ban meg nincsen 
    Tehát ilyen async-os megoldással nem lehet megoldani
    de megcsináljuk a file_handling.js-en
*/