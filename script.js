// testing git
// another test....

"use strict";

const GLOBALS = {
    gridContainer: document.getElementById("grid"),
    gridSide: document.getElementById("size").value,
    generate: document.getElementById("generate"),
    output: document.getElementById("output"),
    blockSize: 25
}

GLOBALS.generate.addEventListener("click", () => {
    Grid.init(GLOBALS.gridSide)
})

const Grid = {
    init: function(side) {
        this.side = side;
        this.area = side * side;
        this.array = [];
        this.stringOutput = "[";
        this.DOMelement = GLOBALS.gridContainer;
        // generate Y array
        for (let i = 0; i < this.area; i++) {
            this.array[i] = new block(i, this);
        }
    },
    switch: function(i) {
        this.array[i] = !this.array[i];
        this.output();
    },
    output: function() {
        for (let i = 1; i == this.array.length; i++) {
            string += toString(array[i]);
            i != this.array.length? string += ", " : string += "]";
        }
        GLOBALS.output.innerHTML = string;
    }
}

function block(i, g) {
    this.index      = i;
    this.gridParent = g;
    // get coordinates in the grid, not pixel coordinates, but like how many blocks right and down
    this.y          = Math.floor(this.index / this.gridParent.side);
    this.x          = this.index % this.gridParent.side;
    this.state      = false;
    this.createElement = function() {
            let div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = div.style.height = GLOBALS.blockSize + "px";
            div.style.left = this.x * GLOBALS.blockSize + "px";
            div.style.top = this.y * GLOBALS.blockSize + "px";
            div.style.border = "1pt solid black";
            return div;
        }
    this.switch = () => {
        // toggle state for this element and the parent's array of all elements
        this.state = !this.state;
        this.gridParent.switch(this.index);
        this.DOMelement.classList.toggle("on");
    }
    this.init = (() => {
        // create DOM element
        this.DOMelement = this.createElement();
        // add click function
        this.DOMelement.addEventListener("click", this.switch);
        // append to parent element
        this.gridParent.DOMelement.appendChild(this.DOMelement);
    })()
}