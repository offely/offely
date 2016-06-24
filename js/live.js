$(function(){

    //var http = 'localhost/offely/api';
    var http = 'offely-cf.umbler.net';

    var start = 1;

    var url =  'https://' + http + '/json.php?';
    
    var load = function (category = "off") {
        if(category=='off') {
            var urls = 'off';
        }
        $.ajax({
            dataType: 'json',
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
                    $('.promos').append(
                        '<li class="promos_item">' +
                        '<div class="promo">' +
                        '<div class="promo_clicks">' + soma + '%</div>' +
                        '<div class="promo_views">' + data[i].views + '</div>' +
                        '<div class="promo_image" style="background-image: url(' + data[i].image + ');"></div>' +
                        '<div class="promo_content">' +
                        '<div class="promo_title">' + data[i].name + '</div>' +
                        '<div class="promo_price">R$ <span>' + data[i].price + '</span></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>');
                }
            }
        });
    };
    load();
    setInterval(function(){
       location.reload();
    }, 10000 );


});
