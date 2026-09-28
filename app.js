let tanulok = [{nev: "Gipsz Jakab", osztaly: "10.D", atlag: 3.8},
               {nev: "Kiss Anna", osztaly: "12.A", atlag: 4.7},
               {nev: "Horváth Gábor", osztaly: "11.C", atlag: 4.2},
               {nev: "Kovács Panna", osztaly: "11.D", atlag: 3.5}]

const tanuloNev = document.getElementById("tanuloNev")
const tanuloOsztaly = document.getElementById("tanuloOsztaly")
const tanuloAtlag = document.getElementById("tanuloAtlag")
const tablazatTesz = document.querySelector("table tbody")
const hibaUzenet = document.getElementById("hibaUzenet")
let szerkesztesAlattIndex = null
function tanuloMent(event){
    if(event) event.preventDefault()

    try {
        const nev = tanuloNev.value.trim()
        const osztaly = tanuloOsztaly.value.trim()
        const atlag = parseFloat(tanuloAtlag.value)

        if (isNaN(atlag)) throw new Error("Nem számot adtál meg!") 
        else if(atlag < 1 || atlag > 5){throw new Error("1 és 5 közötti számmot adj meg") }

        const ujTanulo = {
            nev: nev,
            osztaly: osztaly,
            atlag: atlag
        }

        tanulok.push(ujTanulo);

        tanuloNev.value = ""
        tanuloOsztaly.value = ""
        tanuloAtlag.value = ""
        hibaUzenet.innerHTML = ""
        tablaFrissit()
    } catch (hiba) {
        hibaUzenet.innerHTML = `Hiba: ${hiba.message}`
    } 
}

function tablaFrissit(){
    tablazatTesz.innerHTML = ""
    tanulok.forEach((tanulo, index) => {
        const sor = document.createElement("tr")
        sor.className = "bg-white border-b border-gray-200 hover:bg-gray-50"

        sor.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${tanulo.nev}</td>
            <td class="px-6 py-4">${tanulo.osztaly}</td>
            <td class="px-6 py-4">${tanulo.atlag.toFixed(2)}</td>
            <td class="px-6 py-4">
                <button onclick="tanuloTorol(${index})" class="font-medium text-red-600 hover:underline cursor-pointer">Törlés</button>
            </td>
            <td class="p-4">
                <button onclick="tanuloModosit(${index})" class="font-medium text-blue-600 hover:underline cursor-pointer">Módosítás</button>
            </td>
        `

        tablazatTesz.appendChild(sor)
    })
}

function tanuloModosit(){
    const tanulo = tanulok[index]
    
    tanuloNev.value = tanulo.nev
    tanuloOsztaly.value = tanulo.osztaly
    tanuloAtlag.value = tanulo.atlag
    
    szerkesztesAlattIndex = index
    
    const mentoGomb = document.querySelector("form button[type='submit']")
    if (mentoGomb) mentoGomb.textContent = "Módosítás mentése"
}

function tanuloTorol(index) {
    tanulok.splice(index, 1)
    tablaFrissit()
    statisztika()
}
function kereses(){

}
function statisztika(){

}