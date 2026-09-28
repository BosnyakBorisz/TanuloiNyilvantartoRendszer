let tanulok = [{nev: "Gipsz Jakab", osztaly: "10.D", atlag: 3.8},
               {nev: "Kiss Anna", osztaly: "12.A", atlag: 4.7},
               {nev: "Horváth Gábor", osztaly: "11.C", atlag: 4.2},
               {nev: "Kovács Panna", osztaly: "11.D", atlag: 3.5}]

//8 as feladat

function statisztika(){
    let osszeg = 0;
    let legjobbtanulo = tanulok[0];


    let jeles = 0;
    let jo = 0;
    let kozepes = 0;
    let elegseges = 0;
    let elegtelen = 0;

    for(const tanulo of tanulok){
        osszeg += tanulo.atlag;

        if(tanulo.atlag >  legjobbtanulo.atlag){
            legjobbtanulo = tanulo
        }
        if(tanulo.atlag >=4.5){
            jeles++
        }
        else if(tanulo.atlag >=3.5){
            jo++
        }
        else if(tanulo.atlag >=2.5){
            kozepes++
        }
        else if(tanulo.atlag >=2.0){
            elegseges++
        }
        else{
            elegtelen++
        }
    }

    const atlag = osszeg / tanulok.length

    console.log(`8. Statisztikák`);
    console.log(`Tanulók száma: ${tanulok.length} fő`);
    console.log(`Osztályátlag: ${atlag.toFixed(2).replace('.', ',')}`);
    console.log(`Legjobb tanuló: ${legjobbtanulo.nev}`);
    
    console.log(`\n9. Jegystatisztika`);
    console.log(`Jeles: ${jeles} fő`);
    console.log(`Jó: ${jo} fő`);
    console.log(`Közepes: ${kozepes} fő`);
    console.log(`Elégséges: ${elegseges} fő`);
    console.log(`Elégtelen: ${elegtelen} fő`);
}
statisztika()