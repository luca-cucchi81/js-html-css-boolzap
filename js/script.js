
$('#invia').click(function(){
    var messaggioInput = $('#messaggio').val();
    $('#messaggio').val('');

    var messaggio = $('.box-sent .template').clone(); //copia contenuto messaggio inviato che è dentro il box (che è display none)
    messaggio.find('.testo-bubble-sent').text(messaggioInput); //modif. testo messaggio inviato che e inserimento nel bubble
    messaggio.find('.time-sent').text('05:05'); //aggiungo ora
    $('.main-chat').append(messaggio); // creo cascata messaggi nella main chat

setTimeout(function(){
    var risposta = $('.box-received .template2').clone(); //copia contenuto risposta che è dentro il box (che è display none)
    risposta.find('.testo-bubble-received').text('OK!!'); //modif. testo risposta che e inserimento nel bubble
    risposta.find('.time-received').text('05:05'); //aggiungo ora
    $('.main-chat').append(risposta); // creo cascata messaggi nella main chat
}, 1000)
});


$('#cerca-contatti').keyup(function(event){
    var filtro = $(this).val().toLowerCase();
    $('.text-user h3').each(function(){ // Se nella lista contatti è presente il carattere digitato visualizzarlo
        // console.log($(this).text());
        if ($(this).text().toLowerCase().includes(filtro)) { // Se il nome del list item ha al suo interno i caratteri digitati visualizzalo
            $(this).parents('.utente').show();
        } else { // Altrimenti non visualizzarlo
            $(this).parents('.utente').hide();
        }
    });
})
