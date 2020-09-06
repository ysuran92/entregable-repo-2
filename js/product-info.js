let productsArray = [];
let comentariosArray = [];

function showProduct(array, arrayComments) {
    let verProducto = JSON.parse(localStorage.getItem("product"));
    for (let i = 0; i < productsArray.length; i++) {
        let product = array[i];
        let info = "";
        let imgs = "";
        let comments = "<hr>";

        if (product.name == verProducto.productid) {
            info += "<h2>" + product.name + "</h2>";
            info += "<strong>" + product.cost + "</strong><br><br>";
            info += "" + product.description + "<br>";
            info += libro.isbn + "<br>";
            info += libro.paginas + " págs.<br>";

            imgs += '<img class="img" src="img/' + libro.titulo +
                '/1.jfif" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + libro.titulo +
                '/2.jfif" width="100px" height="150px" alt="">';
            imgs += '<img class="img" src="img/' + libro.titulo +
                '/3.jfif" width="100px" height="150px" alt="">';

            for (let comment in arrayComments) {
                if (arrayComments[comment].id_libro == verLibro.productid) {
                    comments += "<strong>" + arrayComments[comment].usuario + "</strong> dice: <br>";
                    comments += "<p>" + arrayComments[comment].comentario + "</p><br>";
                    comments += "Calificación: <strong>" + arrayComments[comment].calificacion + "</strong><br>";
                    comments += "<br><hr>"
                }
            }

            document.getElementById("contenido").innerHTML = info;
            document.getElementById("imagenes").innerHTML = imgs;
            document.getElementById("comentarios").innerHTML = comments;
        }
    }


}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProduct(productsArray, comentariosArray);
        }
    });
});