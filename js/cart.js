let cartArray = [];
let cartItemsArray = [];
let carrito = [];

function totalCost() {
    let total = 0;
    let cantidadSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantidadSub.length; i++) {
        total += parseInt(cantidadSub[i].innerHTML);
    }
    document.getElementById("sumaTot").innerHTML = total;
}

function subCost(unitCost, i) {
    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSub${i}`).innerHTML = subTot;
    totalCost();
}

function showCartList(atributos) {
    let content = "";
    for (let i = 0; i < atributos.length; i++) {
        let articles = atributos[i];
        let subT = articles.unitCost * articles.count;
        content += `
        <tr>
        <td><img src='${articles.src}' width="40px"></td>
        <td>${articles.name}</td>
        <td>${articles.count}</td>
        <td><input style="width:60px;" onchange="subCost(${articles.unitCost}, ${i})"
        type="number" id="cantidad${i}" value="${articles.count}" min="1"</td>
        <td><span id="sumaSub${i}" class="total" style="font-weight: bold;">${subT}</span></td>
        </tr>
        `
        document.getElementById("cartContainer").innerHTML = content;
    }
    totalCost();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data.articles;
            showCartList(carrito);
        }
    });
});