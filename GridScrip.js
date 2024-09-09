const containerRef = document.getElementsByClassName("container").item(0)
const gridSizeBtnRef = document.getElementsByClassName("makeNewCanvaBtn").item(0)
const eraserCheckRef = document.getElementById("eraser");
let erase = false
const MAX_GRID_SIZE = 100

function clickEvenet(e, currentDiv, divColor, incremenet){
    let opacity = 0.0
    if(!erase){
        opacity = +currentDiv.style.opacity+incremenet
        opacity = Math.max(0.1, Math.min(opacity, 1))
    } else{
        divColor = "white"
    }

    currentDiv.style.opacity = opacity
    currentDiv.style.backgroundColor = divColor  
}

function clickLeft(e,div, divColor){
    clickEvenet(e,div, divColor, 0.1)
} 
function clickRight(e,div, divColor){ 
    if(e.ctrlKey){
        clickEvenet(e,div, divColor, -0.2)
    }
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
    div.addEventListener("click",(e) => clickLeft(e,div, divColor))
    div.addEventListener("click", (e => clickRight(e,div, divColor)))
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


function checkEraser(e){
    erase = !erase
}

gridSizeBtnRef.addEventListener("click", newGrid);
eraserCheckRef.addEventListener("change", checkEraser)
newGrid(null)
