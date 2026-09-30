let tanulok = [
    {nev: "Gipsz Jakab", osztaly: "10.D", atlag: 3.8},
    {nev: "Kiss Anna", osztaly: "12.A", atlag: 4.7},
    {nev: "Horváth Gábor", osztaly: "11.C", atlag: 4.2},
    {nev: "Kovács Panna", osztaly: "11.D", atlag: 3.5},
    {nev: "Kovács Hanna", osztaly: "11.D", atlag: 3.0},
    {nev: "Lukács Anna", osztaly: "11.D", atlag: 2.0},
    {nev: "Stenk Attila", osztaly: "11.D", atlag: 1.5}
]

const tanuloNev = document.getElementById("tanuloNev")
const tanuloOsztaly = document.getElementById("tanuloOsztaly")
const tanuloAtlag = document.getElementById("tanuloAtlag")
const tablazatMegjelenites = document.getElementById("tablazatMegjelenites")
const hibaUzenet = document.getElementById("hibaUzenet")
const statisztikaDiv = document.getElementById("statisztika")
const keresoInput = document.getElementById("keresoInput")
const mentoGomb = document.getElementById("mentoGomb")
let szerkesztesAlattIndex = null

document.addEventListener("DOMContentLoaded", () => {
    tablaFrissit()
    if (keresoInput) {
        keresoInput.addEventListener("input", kereses)
    }
})

function tanuloMent(event) {
    if (event) event.preventDefault()

    try {
        const nev = tanuloNev.value.trim()
        const osztaly = tanuloOsztaly.value.trim()
        const atlagInput = tanuloAtlag.value.trim()

        const atlag = parseFloat(atlagInput.replace(",", "."))

        const nevRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+(?: [A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+)*$/
        const osztalyRegex = /^(1[0-3]|[1-9])\.[a-zA-Z]$/
        const atlagRegex = /^\d+(?:[,.]\d+)?$/


        if (!nev) {throw new Error("A név megadása kötelező!")}
        else if (nev.length < 3) {throw new Error("A névnek legalább 3 karakter hosszúnak kell lennie!")}
        else if (!nevRegex.test(nev)) {throw new Error("A név csak betűket és szóközt tartalmazhat!")}
        else if (!osztaly) {throw new Error("Az osztály megadása kötelező!")}
        else if (!osztalyRegex.test(osztaly)) {throw new Error("Az osztály formátuma hibás! Például: 9.a vagy 12.b")}
        else if (!atlagInput) {throw new Error("Az átlag megadása kötelező!")}
        else if (!atlagRegex.test(atlagInput)) {throw new Error("Az átlag csak szám lehet! Például: 4,99 vagy 4.99")}
        else if (isNaN(atlag)) {throw new Error("Az átlag nem érvényes szám!")}
        else if (atlag < 1 || atlag > 5) {throw new Error("Az átlag csak 1 és 5 közötti szám lehet!")}

        const tanuloAdat = {
            nev: nev,
            osztaly: osztaly,
            atlag: atlag
        }

        if (szerkesztesAlattIndex !== null) {
            tanulok[szerkesztesAlattIndex] = tanuloAdat
            szerkesztesAlattIndex = null

            if (mentoGomb) {
                mentoGomb.textContent = "Mentés"
            }
        } 
        else {
            tanulok.push(tanuloAdat)
        }

        tanuloNev.value = ""
        tanuloOsztaly.value = ""
        tanuloAtlag.value = ""
        hibaUzenet.innerHTML = ""

        tablaFrissit()

    } catch (hiba) {
        hibaUzenet.innerHTML =
            `<span class="text-red-600 font-medium py-2">
                Hiba: ${hiba.message}
            </span>`
    }
}


function tablaFrissit(szurtLista = null){
    tablazatMegjelenites.innerHTML = ""

    const listaMegjelenitesre = szurtLista ? szurtLista : tanulok

    listaMegjelenitesre.forEach((tanulo) => {
        const eredetiIndex = tanulok.indexOf(tanulo)
        
        const sor = document.createElement("tr")
        sor.className = "bg-white border-b border-gray-200 hover:bg-gray-50"

        sor.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${tanulo.nev}</td>
            <td class="px-6 py-4">${tanulo.osztaly}</td>
            <td class="px-6 py-4">${tanulo.atlag.toFixed(2)}</td>
            <td class="px-6 py-4">
                <button onclick="tanuloTorol(${eredetiIndex})" class="font-medium text-red-600 hover:underline cursor-pointer">Törlés</button>
            </td>
            <td class="p-4">
                <button onclick="tanuloModosit(${eredetiIndex})" class="font-medium text-blue-600 hover:underline cursor-pointer">Módosítás</button>
            </td>
        `
        tablazatMegjelenites.appendChild(sor)
    })
    
    statisztika()
}

function tanuloModosit(index){
    const tanulo = tanulok[index]
    
    tanuloNev.value = tanulo.nev
    tanuloOsztaly.value = tanulo.osztaly
    tanuloAtlag.value = tanulo.atlag
    
    szerkesztesAlattIndex = index
    
    if (mentoGomb) mentoGomb.textContent = "Módosítás mentése"
    tanuloNev.focus()
}

function tanuloTorol(index) {
    tanulok.splice(index, 1)
    
    if (szerkesztesAlattIndex === index) {
        szerkesztesAlattIndex = null
        if (mentoGomb) mentoGomb.textContent = "Mentés"
        tanuloNev.value = ""
        tanuloOsztaly.value = ""
        tanuloAtlag.value = ""
    }
    
    if (keresoInput && keresoInput.value.trim() !== "") {
        kereses()
    } else {
        tablaFrissit()
    }
}

function kereses(){
    const keresendo = keresoInput.value.toLowerCase().trim()
    
    const szurtTanulok = tanulok.filter(tanulo => 
        tanulo.nev.toLowerCase().includes(keresendo))    
    tablaFrissit(szurtTanulok)
}

function statisztika(){
    if (!statisztikaDiv) return
    
    if (tanulok.length === 0) {
        statisztikaDiv.innerHTML = `
            <div class="max-w-3xl mx-auto mt-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200 text-center">
                Nincsenek tanulók a rendszerben a statisztika számításához.
            </div>
        `
        return
    }

    let legjobbTanulo = tanulok[0]
    let jeles = 0
    let jo = 0
    let kozepes = 0
    let elegseges = 0
    let elegtelen = 0

    for(let tanulo of tanulok){
        if(tanulo.atlag > legjobbTanulo.atlag){
            legjobbTanulo = tanulo
        }
        if(tanulo.atlag >= 4.5){
            jeles++
        }
        else if(tanulo.atlag >= 3.5){
            jo++
        }
        else if(tanulo.atlag >= 2.5){
            kozepes++
        }
        else if(tanulo.atlag >= 2.0){
            elegseges++
        }
        else{
            elegtelen++
        }
    }

    let osztalyok = {}

    for (let t of tanulok) {     // osztályonként csoportosítás
        const osztalyNev = t.osztaly.toUpperCase()
        if (!osztalyok[osztalyNev]) {
            osztalyok[osztalyNev] = {
                osszeg: 0,
                darab: 0
            }
        }
        osztalyok[osztalyNev].osszeg += t.atlag
        osztalyok[osztalyNev].darab++
    }

    let eredmeny = [] // átlagok új tömbbe
    for (let osztalyNev in osztalyok) {
        let adat = osztalyok[osztalyNev]
        eredmeny.push({
            osztaly: osztalyNev,
            atlag: Number((adat.osszeg / adat.darab).toFixed(2))
        })
    }
    
    //statisztika
    const letszamkiir = document.getElementById("tanulokSzama")
    letszamkiir.innerHTML = tanulok.length

    const osztalyAtlag = document.getElementById("osztalyatlag")
    osztalyAtlag.innerHTML = ""
    for(let e of eredmeny){
        osztalyAtlag.innerHTML += `${e.osztaly}: ${e.atlag}<br>`
    }

    const legjobb = document.getElementById("legjobbTanulok")
    legjobb.innerHTML = legjobbTanulo.nev

    //jegystatisztika
    const jeleskiir = document.getElementById("tanulokJeles")
    jeleskiir.innerHTML = jeles

    const jokiir = document.getElementById("tanulokJo")
    jokiir.innerHTML = jo

    const kozepeskiir = document.getElementById("tanulokKozepes")
    kozepeskiir.innerHTML = kozepes
    
    const elegsegeskiir = document.getElementById("tanulokMegfelelt")
    elegsegeskiir.innerHTML = elegseges

    const elegtelenkiir = document.getElementById("tanulokElegtelen")
    elegtelenkiir.innerHTML = elegtelen
}

/*function csokkenoSorrend(){
    let kiiras = document.getElementById("novekvoSorrendKiiras")
    kiiras.innerHTML = ""
    let rendezett = [...tanulok].sort((a, b) => b.atlag - a.atlag)
    rendezett.forEach(t => {
        if (t.atlag >= 4.5) {
            kiiras.innerHTML += `<span style="color: green;">${t.atlag}</span> `
        }
        else if (t.atlag <= 1.5) {
            kiiras.innerHTML += `<span style="color: red;">${t.atlag}</span> `
        }
        else {
            kiiras.innerHTML += `<span>${t.atlag}</span> `
        }
    })
}

function abcSOrrend(){
    let rendezett = [...tanulok].sort((a, b) => 
        a.nev.localeCompare(b.nev, 'hu')
    )

    const abcnevekTomb = rendezett.map(tanulo => tanulo.nev)
    const abckiir = document.getElementById("abcnevek")
    abckiir.textContent = abcnevekTomb.join(', ')  
}

function csakKituno(){
    let kitunok=[];
    for (let tanulo of tanulok){
        if(tanulo.atlag >= 4.5){
            kitunok.push(tanulo.nev)
        }
    }
    const kitunokiir = document.getElementById("kitunonevek")
    kitunokiir.textContent =kitunok.join(', ')
}*/

function csokkenoSorrend(){
    let rendezett = [...tanulok].sort((a, b) => b.atlag - a.atlag)
    tablaFrissit(rendezett)
}


function abcSOrrend(){
    let rendezett = [...tanulok].sort((a, b) => 
        a.nev.localeCompare(b.nev, 'hu')
    )
    tablaFrissit(rendezett)
}

function csakKituno(){
    let kitunok = tanulok.filter(tanulo => tanulo.atlag >= 4.5)

    tablaFrissit(kitunok)
}