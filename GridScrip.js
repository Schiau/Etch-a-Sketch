const containerRef = document.getElementsByClassName("container").item(0)
const gridSizeBtnRef = document.getElementById("containerBtn")
const darkerBtnUp = document.getElementById("darkerUp")
const darkerBtnDown = document.getElementById("darkerDown")
const MAX_GRID_SIZE = 100

function clickEvenet(e, currentDiv, divColor){

    let opacity = +currentDiv.style.opacity+0.1
    if(opacity > 1) opacity = 1
    currentDiv.style.opacity = opacity
    currentDiv.style.backgroundColor = divColor
}

function newColor(){
    let r =Math.round(Math.random()*254)
    let g =Math.round(Math.random()*254)
    let b =Math.round(Math.random()*254)
    return `rgb(${r},${g},${b})`
}

function createNewDiv(flexBasis){
    let divColor = newColor()
    let div = document.createElement("div")
    div.className = "container-element"
    div.style.flexBasis= flexBasis
    div.style.opacity = 0.1
    div.addEventListener("click",(e) => clickEvenet(e,div, divColor))
    return div
}


function createGrid(grid_size){
    flexBasis = 100/grid_size+"%"
    containerRef.innerHTML = ""
    for(let i = 0; i<grid_size; i++){
        for(let j = 0; j<grid_size; j++){
            let div = createNewDiv(flexBasis)
            containerRef.appendChild(div)
        }

    }
}

function newGrid(e){
    let promptAnswear=prompt("Please enter your grid size:", "32")
    if(promptAnswear != null){
        let grid_size = parseInt(promptAnswear)
        if(!isNaN(grid_size) && grid_size<=MAX_GRID_SIZE){
            createGrid(grid_size)
            return
        }
    }
    alert(`Invalid grid size(max ${MAX_GRID_SIZE})`)
}

function ChangeDarkness(e, incremenet){
    currentDarkness+=incremenet
    currentDarkness = Math.max(0, Math.min(1, currentDarkness));
    let containerElements = document.getElementsByClassName("container-element");
    Array.from(containerElements).forEach(element => {
        element.style.opacity = currentDarkness;
    });
}

darkerBtnUp.addEventListener("click",e => ChangeDarkness(e, 0.1))
darkerBtnDown.addEventListener("click",e => ChangeDarkness(e, -0.1))
gridSizeBtnRef.addEventListener("click", newGrid);
newGrid(null)
