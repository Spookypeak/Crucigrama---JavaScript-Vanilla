window.onload = function () {
    iniciar()
}
function llenarDivs(abc) {
    let cruxChildren = document.getElementsByClassName('col');
    for (let i = 0; i < cruxChildren.length; i++) {
        cruxChildren[i].addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.strt = [getIndex(this.parentElement), getIndex(this)];
        });
        cruxChildren[i].addEventListener('mouseup', function (e) {
            e.preventDefault()
            window.end = [getIndex(this.parentElement), getIndex(this)];
            comparar();
        });
        if (!cruxChildren[i].textContent)
            cruxChildren[i].textContent = abc[Math.floor(Math.random() * 26)];
    }
}
function filas(padre, dif, call) {
    for (let i = 0; i < dif; i++) {
        let fila = document.createElement('div');
        fila.className = 'row';
        colms(fila, dif);
        padre.appendChild(fila);
    }
    call();
}
function colms(padre, dif) {
    for (let i = 0; i < dif; i++) {
        let fila = document.createElement('div');
        fila.className = 'col';
        padre.appendChild(fila);
    }
}
function llenarPalabras(tabla, plbrs, callback) {
    let row = Math.floor(Math.random() * 20);
    let col = Math.floor(Math.random() * 20);
    plbrs.map((p, idx) => {
        verificar(tabla, p, idx, plbrs, col, row, (tabla, plbrs, call) => {
            if (plbrs)
                llenarPalabras(tabla, plbrs, call);
        });
        callback();
    });
}
function dibujarTabla(abc, plbrs) {
    let crux = document.getElementsByClassName('crux');
    let tabla = document.getElementsByClassName('row');
    filas(crux[0], 20, () => {
        let palabras = plbrs.join('').length;
        llenarPalabras(tabla, plbrs, () => {
            let words = document.getElementsByClassName('col');
            for (let i = 0; i < words.length; i++) {
                if (words[i].textContent != '')
                    palabras--;
            }
            if (palabras > 0) {
                iniciar();
            } else
                llenarDivs(abc);
        })
    });
}
function verificar(tabla, p, idx, plbrs, col, row, call) {
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    let res = 'i';
    if (col - p.length >= 0)
        for (let i = 0; i < p.length; i++)
            if (tabla[row].children[i].textContent != undefined) {
                res = null;
                break;
            }
            else {
                res = 'd';
                for (let i = 0; i < p.length; i++)
                    if (tabla[row].children[i].textContent != undefined) {
                        res = null;
                        break;
                    }
            }
    if (res != null)
        if (res == 'd') {
            for (let i = 0; i < p.length; i++) {
                tabla[row].children[col].textContent = p[i];
                tabla[row].children[col].style.color = colorArray[plbrs.length];
                col++;
            }
        }
        else {
            for (let i = p.length - 1; i >= 0; i--) {
                tabla[row].children[col].textContent = p[i];
                tabla[row].children[col].style.color = colorArray[plbrs.length];
                col++;
            }
        }
    if (res != null)
        plbrs.splice(idx, 1);
    call(tabla, plbrs, call);
}
function iniciar() {
    document.getElementsByClassName("crux")[0].innerHTML = '';
    let palabras = [
        'PERRO', 'SOL', 'CANOA', 'MONJA', 'TELEVISIÓN', 'ZAPATO', 'MUÑECA', 'POLICIA', 'CAJÓN', 'PAPELERÍA', 'JUAN'
    ];
    window.palabras = palabras;
    var abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ñ'];
    let ul = document.getElementsByClassName("palabras")[0];
    ul.innerHTML = '';
    palabras.map((p) => {
        let li = document.createElement('div');
        li.textContent = p;
        ul.appendChild(li);
    });
    dibujarTabla(abc, palabras);

}
function getIndex(child) {
    var parent = child.parentNode;
    var children = parent.children;
    var i = children.length - 1;
    for (; i >= 0; i--) {
        if (child == children[i]) {
            break;
        }
    }
    return i;
}
function comparar() {
    let tabla = document.getElementsByClassName("crux")[0];
    let palabra = '';
    if (window.strt[0] == window.end[0] && window.strt[1] < window.end[1])
        for (let i = window.strt[1]; i < window.end[1] + 1; i++) {
            palabra += tabla.children[window.strt[0]].children[i].textContent;
        }
    else
        for (let i = window.strt[1]; i > window.end[1] - 1; i--) {
            palabra += tabla.children[window.strt[0]].children[i].textContent;
        }
    if (!buscar(palabra)) {
        let pal = '';
        for (let i = palabra.length - 1; i >= 0; i--) {
            pal += palabra[i];
        }
        buscar(pal);
    }

}
function buscar(palabra) {
    let table = document.getElementsByClassName("palabras")[0].children;
    let res = false;
    for (let i = 0; i < table.length; i++) {
        if (table[i].textContent == palabra) {
            document.getElementsByClassName("palabras")[0].children[i].style.color = 'white';
            document.getElementsByClassName("palabras")[0].children[i].style.background = 'black';
            res = true;
            break;
        }
    }
    return res;
}