$(document).ready(function(){
    $('form').on('submit', function(){
        var datas = $('#todoItem').val();
        var sendData = {item : datas};
        $.ajax({
            type: "POST",
            url: '/todo',
            data: sendData,
            success: function(data){
                console.log("Post success!!!!!!!!", data);
                location.reload();
            }
        });
    });
    $('.ulList').on('click', 'li', function(){
        var datas = $(this).text();
        $.ajax({
            type: "DELETE",
            url: '/todo/' + datas,
            success: function(data){
                location.reload();
            }
          });
    });
})