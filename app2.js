let tanulok = [
    {nev: "Gipsz Jakab", osztaly: "10.D", atlag: 3.8},
    {nev: "Kiss Anna", osztaly: "12.A", atlag: 4.7},
    {nev: "Horváth Gábor", osztaly: "11.C", atlag: 4.2},
    {nev: "Kovács Panna", osztaly: "11.D", atlag: 3.5},
    {nev: "Kovács Hanna", osztaly: "11.D", atlag: 3.0},
    {nev: "Lukács Anna", osztaly: "11.D", atlag: 2.0},
    {nev: "Stenk Attila", osztaly: "11.D", atlag: 1.5},
]

const tanuloNev = document.getElementById("tanuloNev")
const tanuloOsztaly = document.getElementById("tanuloOsztaly")
const tanuloAtlag = document.getElementById("tanuloAtlag")
const tablazatTesz = document.querySelector("table tbody")
const hibaUzenet = document.getElementById("hibaUzenet")
const statisztikaDiv = document.getElementById("statisztika")
const keresoInput = document.getElementById("keresoInput")
const mentoGomb = document.querySelector("mentoGomb")

let szerkesztesAlattIndex = null

document.addEventListener("DOMContentLoaded", () => {
    tablaFrissit()
    if (keresoInput) {
        keresoInput.addEventListener("input", kereses)
    }
})

function tanuloMent(event){
    if(event) event.preventDefault()

    try {
        const nev = tanuloNev.value.trim()
        const osztaly = tanuloOsztaly.value.trim()
        const atlag = parseFloat(tanuloAtlag.value)

        if (!nev || !osztaly) throw new Error("Minden mezőt ki kell tölteni!")
        if (isNaN(atlag)) throw new Error("Nem számot adtál meg az átlagnál!")
        else if(atlag < 1 || atlag > 5){ throw new Error("1 és 5 közötti számot adj meg!") }

        const tanuloAdat = {
            nev: nev,
            osztaly: osztaly,
            atlag: atlag
        }

        if (szerkesztesAlattIndex !== null) {
            tanulok[szerkesztesAlattIndex] = tanuloAdat
            szerkesztesAlattIndex = null
            if (mentoGomb) mentoGomb.textContent = "Mentés"
        } else {
            tanulok.push(tanuloAdat)
        }

        tanuloNev.value = ""
        tanuloOsztaly.value = ""
        tanuloAtlag.value = ""
        hibaUzenet.innerHTML = ""
        
        tablaFrissit()
    } catch (hiba) {
        hibaUzenet.innerHTML = `<span class="text-red-600 font-medium py-2">Hiba: ${hiba.message}</span>`
    } 
}

function tablaFrissit(szurtLista = null){
    tablazatTesz.innerHTML = ""

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

        tablazatTesz.appendChild(sor)
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
        tanulo.nev.toLowerCase().includes(keresendo) || 
        tanulo.osztaly.toLowerCase().includes(keresendo)
    )
    
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

    let osszeg = 0;
    let legjobbTanulo = tanulok[0];
    let jeles = 0;
    let jo = 0;
    let kozepes = 0;
    let elegseges = 0;
    let elegtelen = 0;

    for(let tanulo of tanulok){
        osszeg += tanulo.atlag;

        if(tanulo.atlag > legjobbTanulo.atlag){
            legjobbTanulo = tanulo;
        }
        if(tanulo.atlag >= 4.5){
            jeles++;
        }
        else if(tanulo.atlag >= 3.5){
            jo++;
        }
        else if(tanulo.atlag >= 2.5){
            kozepes++;
        }
        else if(tanulo.atlag >= 2.0){
            elegseges++;
        }
        else{
            elegtelen++;
        }
    }

    const atlag = osszeg / tanulok.length;

    const letszamkiir = document.getElementById("tanulokSzama")
    letszamkiir.textContent = tanulok.length

    const osztalyAtlag = document.getElementById("osztalyatlag")
    osztalyAtlag.textContent = atlag

    const legjobb = document.getElementById("legjobbTanulok")
    legjobb.textContent = legjobbTanulo.nev


    const jeleskiir = document.getElementById("tanulokJeles")
    jeleskiir.textContent = jeles

    const jokiir = document.getElementById("tanulokJo")
    jokiir.textContent = jo

    const kozepeskiir = document.getElementById("tanulokKozepes")
    kozepeskiir.textContent = kozepes
    
    const elegsegeskiir = document.getElementById("tanulokMegfelelt")
    elegsegeskiir.textContent = elegseges

    const elegtelenkiir = document.getElementById("tanulokElegtelen")
    elegtelenkiir.textContent = elegtelen
    
    
}


