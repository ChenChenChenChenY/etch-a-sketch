const container = document.querySelector(".container")
const widthInput = document.querySelector(".widthInput")
const heightInput = document.querySelector(".heightInput")
const sizeBt = document.querySelector(".sizeBt")
const R = document.querySelector(".R")
const G = document.querySelector(".G")
const B = document.querySelector(".B")
const colorBt = document.querySelector(".colorBt")

let rValue = 0
let gValue = 0
let bValue = 0

//生成一个长宽值为输入值的网格
function generateSketchPad(width, height) {
    container.innerHTML = '' //clear sketch pad，清除网格
    for (let i = 0; i < width; i++) {
        const column = document.createElement("div")
        column.setAttribute("class", "column")
        container.appendChild(column)
        for (let i = 0; i < height; i++) {
            const rowItem = document.createElement("div")
            rowItem.textContent = ""
            rowItem.setAttribute("class", "rowItem")
            column.appendChild(rowItem)
        }
    }
}

let isMouseDown = false;

// Track the mouse down state globally
document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

//如果鼠标被按下且滑过pixel，则改变pixel颜色为设定的RGB颜色
function changeColor(pixel) {
    pixel.addEventListener("mouseover", () => {
        if (isMouseDown) {
            pixel.style.backgroundColor = `rgb(${rValue},${gValue},${bValue})`;
        }
    });
}

sizeBt.addEventListener("click", () => {
    let widthValue = parseInt(widthInput.value, 10);
    let heightValue = parseInt(heightInput.value, 10);//当每次点击按钮的时候，取得长宽数值

    if (widthValue > 100 || heightValue > 100) {
        alert("Width and Height should be no more than 100.")
        if (width > 100) { width = 100 }
        if (height > 100) { height = 100 }
    } //判定长宽数值是否大于100

    if (!Number.isInteger(widthValue) || !Number.isInteger(heightValue)) {
        alert("Enter solid numbers!")
    }//判定长款数值是否为整数

    generateSketchPad(widthValue, heightValue)//用function生成网格，网格包含rowItem pixel
})

colorBt.addEventListener("click", () => {
    rValue = parseInt(R.value, 10);
    gValue = parseInt(G.value, 10);
    bValue = parseInt(B.value, 10);//当每次点击按钮的时候，取得RBG数值

    if (rValue > 255 || gValue > 255 || bValue > 255) {
        alert("RBG value should be no more than 255.")
    } else if (!Number.isInteger(rValue) || !Number.isInteger(gValue) || !Number.isInteger(bValue)) {
        alert("Enter solid numbers!")
    }//判定RBG数值是否合理

    const pixel = document.querySelectorAll(".rowItem")//选择所有的pixel
    pixel.forEach(changeColor)//让所有的pixel加上event listener，让所有pixel都可以改变到设定的RGB颜色
})
