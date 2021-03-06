let product = {};
let comentariosArray = {};
let relatedProductsArray = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";

    for (let i = 0; i < array.length; i++) {

        if (i == 0) {
            htmlContentToAppend += `
        <div class="carousel-item active">
                            <img src="img/prod1.jpg" class="d-block w-100" alt="...">
                        </div>
        `
        } else {
            htmlContentToAppend += `
        <div class="carousel-item">
                        <img src="` + array[i] + `" class="d-block w-100" alt="...">
                      </div>
        `
        }
        htmlContentToAppend2 += `
        <li data-target="#carouselExampleIndicators" data-slide-to="` + [i] +
            `"></li>
`

        document.getElementById("indicatorsID").innerHTML = htmlContentToAppend2;
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(arrayComments) {
    let comments = "";
    arrayComments.forEach(function(comment) {
        let score = "";
        comments += `
        <strong>${comment.user}</strong> dice:<br>
        <p> ${comment.description} </p>
        `;
        for (let i = 1; i <= comment.score; i++) {
            score += ` <span class="fa fa-star checked"></span> `;
        }
        for (let i = comment.score; i < 5; i++) {
            score += ` <span class="fa fa-star"></span> `;
        }
        comments += ` <sub> ${comment.dateTime} </sub> <br> `
        comments += ` <div style="text-align: right;"> ${score} </div> `;
    })
    let commentsHTML = document.getElementById("comentarios");
    commentsHTML.innerHTML = comments;
}

//////////////////// STAR RATING START

jQuery(document).ready(function($) {
    $('.rating_stars span.r').hover(function() {
        // get hovered value
        var rating = $(this).data('rating');
        var value = $(this).data('value');
        $(this).parent().attr('class', '').addClass('rating_stars').addClass('rating_' + rating);
        highlight_star(value);
    }, function() {
        // get hidden field value
        var rating = $("#rating").val();
        var value = $("#rating_val").val();
        $(this).parent().attr('class', '').addClass('rating_stars').addClass('rating_' + rating);
        highlight_star(value);
    }).click(function() {
        // Set hidden field value
        var value = $(this).data('value');
        $("#rating_val").val(value);

        var rating = $(this).data('rating');
        $("#rating").val(rating);

        highlight_star(value);
    });

    var highlight_star = function(rating) {
        $('.rating_stars span.s').each(function() {
            var low = $(this).data('low');
            var high = $(this).data('high');
            $(this).removeClass('active-high').removeClass('active-low');
            if (rating >= high) $(this).addClass('active-high');
            else if (rating == low) $(this).addClass('active-low');
        });
    }
});

///////////////////// STAR RATING END

// HIDE COMMENT BOX WHEN NOT LOGGED IN
let loggedInCondition = localStorage.getItem("User-Logged");
if (loggedInCondition) {
    document.getElementById("commentContainer").style = "display: flex;";
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
            showComments(comentariosArray);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            relatedProductsArray = resultObj.data;
            relatedProducts(relatedProductsArray, product.relatedProducts);
        }
    });
});

document.getElementById("sendComment").addEventListener("click", function() {
    let fecha = new Date();
    let dateTime = ` ${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} `;
    dateTime += ` ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()} `;
    let newComment = {
        score: parseInt(document.getElementById("rating").value),
        description: document.getElementById("commentBox").value,
        user: JSON.parse(localStorage.getItem("User-Logged")).email,
        dateTime: dateTime
    };
    comentariosArray.push(newComment);
    showComments(comentariosArray);
});

function relatedProducts(productosArray, arrayRelated) {
    let related = '<hr>';

    arrayRelated.forEach(function(i) {
        related += '<strong>' + productosArray[i].name + ' </strong>';
        related += productosArray[i].description + '<br>';
        related += '<img src="' + productosArray[i].imgSrc + '">';
        related += '<a href="product-info.html"><button class="btn btn-light" style="float: right;">Ver producto</button></a><br><br>';
        related += '<br><hr><br>'
    });
    document.getElementById("relatedProducts").innerHTML = related;
};