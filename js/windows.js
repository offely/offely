$(function(){

    //var http = 'localhost/offely/api';
    var http = 'api.offely.ga';

    var start = 9;

    var url =  'http://' + http + '/json.php?';
    
    var load = function (category = "off") {
        if(category=='off') {
            var urls = 'off';
        }
        else
        {
            start = 9;
            $('.promos').html('');
            var urls = category;
        }
        //console.log(url + 'category=' + urls + '&qtde=' + start);
        $.ajax({
            type: "GET",
            contentType: 'application/json',
            url: url + 'category=' + urls + '&qtde=' + start,
                success: function (data) {
                var len = data.length;
                //console.log(data);
                if (len == 0) count = 0;
                for (var i = 0; i < len; i++) {
                    var id = data[i].id;
                    var tira = data[i].price;
                    var desc = data[i].buscape;
                    var rep = tira.replace(",", ".");
                    var drep = desc.replace(",", ".");
                    var soma = (rep % drep).toFixed(0);
                    //console.log(soma);
                    var link = 'http://' + http + '/views.php?id=' + id + '&url=' + data[i].link;
                    $('.promos').append(
                        '<li class="promos_item">' +
                        '<div class="promo">' +
                        '<div class="promo_clicks">' + soma + '%</div>' +
                        '<div class="promo_views">' + data[i].views + '</div>' +
                        '<div class="promo_image" style="background-image: url(' + data[i].image + ');"></div>' +
                        '<div class="promo_content">' +
                        '<div class="promo_title">' + data[i].name + '</div>' +
                        '<div class="promo_price">R$ <span>' + data[i].price + '</span></div>' +
                        '<div class="promo_cupon" style="display: none;">Cupons</div>' +
                        '<a href="' + link + '"><button class="btn btn--block promo_btn">Offely It! (' + data[i].store + ')</button></a>' +
                        '<div class="promo_date">' + data[i].dia + '</div>' +
                        '<div class="promo_chat"><a id="comments">' + data[i].comments + ' Comentarios</a></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>');
                }
            }
        });
    };

    $(window).scroll(function () {
        if($(window).scrollTop() === $(document).height() - $(window).height()) {
            start += 9;
            load();
        }
    });

     load();

    $("#loading").click(function() {
        load();     
    });

    $("#btnmais").click(function() {
        location.reload();   
    });

    $('.scroll li a').click(function() {
        var id = $(this).attr('id');
        var categoria = $('#' + id).text();
        console.log(categoria);
        $("#categoria").text(categoria);
        load(categoria);
        setCookie("categoria", categoria, 365);
    });
    $("#comments").click(function() {
        console.log('go');
        $(".boxcomments").css("margin-top","120px");
        $(".popup").css("display","display");  
    });
	$(".closeboxcomments").click(function() {
        $(".boxlogin").css("margin-top","1020px");
        $(".popup").css("display","none");       
    });

    var minha_conta = function () {
        $("#conectado").css("display","none");
        $(".minhaconta").css("display","block");
    };

    if(getCookie("conectado")=='true') {
        console.log('conectado');
        minha_conta();
        var id = getCookie("id");
        $("#idref").text("http://offely.com/ref.php?id=" + id);
    }

    $('#fblogin').click(function() {

        $.fblogin({
            fbId: '818527968260861',
        })
        .done(function (data) {
            minha_conta();
            $("#referido").css("display","none");
            $("#sobre").css("display","none");
            $("#home").css("display","none");
            $("#loadmore").css("display","none");
            $("#login").css("display","none");
            $("#conta").css("display","block");    
            setCookie("conectado", 'true', 365);
            $("#idref").text("http://offely.com/ref.php?id=" + data.id);
            setCookie("id", data.id, 365);
            setCookie("email", data.email, 365);
            setCookie("name", data.name, 365);
        });
    });

    $("#btnsair").click(function() {
        delCookie("conectado");
        console.log('desconectado')
        $("#conectado").css("display","block");
        $(".minhaconta").css("display","none");
        location.reload();
    });

    setInterval(function(){

        $.ajax({
            dataType: 'json',
            url: url + '&qtde=1',
            success: function (data) { 

            var idpromo = data[1].id;
            var x = getCookie("idpromo");

            if(idpromo>x) {

                setCookie("idpromo", idpromo, 365);
                var v = idpromo-x;
                console.log(v);
                document.title = "(" + v + ") Offely.com | Aqui quem ganha é sempre você.";
                $("#mais").css("display","block");
                $("#mais span").text(v);
            }
        }});

    }, 8800000 );

    $("#btnlogin").click(function() {
        $("#conta").css("display","none");
        $("#referidos").css("display","none");
        $("#sobre").css("display","none");
        $("#home").css("display","none");
        $("#loadmore").css("display","none");
        $("#login").css("display","block");       
    });

    $("#btnconta").click(function() {
        $("#referidos").css("display","none");
        $("#sobre").css("display","none");
        $("#home").css("display","none");
        $("#loadmore").css("display","none");
        $("#login").css("display","none");
        $("#conta").css("display","block");    
    });
    
    $("#btntop").click(function() {
        load('top');
    });  

    $("#btnhome").click(function() {
        location.reload();
    });    

    $("#btnsobre").click(function() {
        $("#conta").css("display","none");
        $("#referidos").css("display","none");
        $("#loadmore").css("display","none");
        $("#home").css("display","none");
        $("#login").css("display","none");
        $("#sobre").css("display","block");       
    });

    $("#btnreferidos").click(function() {
        $("#conta").css("display","none");
        $("#sobre").css("display","none");
        $("#home").css("display","none");
        $("#loadmore").css("display","none");
        $("#login").css("display","none");  
        $("#referidos").css("display","block"); 
    });

});
