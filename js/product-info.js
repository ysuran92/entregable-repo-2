var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(arrayComments) {
    let verLibro = JSON.parse(localStorage.getItem("libro"));
    for (let i = 0; i < librosArray.length; i++) {
        let comments = "<hr>";



        for (let comment in arrayComments) {
            if (arrayComments[comment].id_libro == verLibro.libroid) {
                comments += "<strong>" + arrayComments[comment].usuario + "</strong> dice: <br>";
                comments += "<p>" + arrayComments[comment].comentario + "</p><br>";
                comments += "Calificación: <strong>" + arrayComments[comment].calificacion + "</strong><br>";
                comments += "<br><hr>"
            }
        }


        document.getElementById("comentarios").innerHTML = comments;
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCriteria");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
    });
});