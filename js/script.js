$('#invia').click(function(){
    var messaggioInput = $('#messaggio').val();
    $('#messaggio').val('');

    var messaggio = $('.template .speech-bubble-sent').clone(); //copia contenuto messaggio inviato che è dentro il template (che è display none)
    messaggio.children('.testo-bubble-sent').text(messaggioInput); //modif. testo messaggio inviato che e inserimento nel bubble
    messaggio.children('.time-sent').text('05:05'); //aggiungo ora
    $('.sent').append(messaggio); // creo cascata messaggi nella main chat

setTimeout(function(){
    var risposta = $('.template2 .speech-bubble-received').clone(); //copia contenuto rispostao che è dentro il template (che è display none)
    risposta.children('.testo-bubble-received').text(messaggioInput); //modif. testo risposta che e inserimento nel bubble
    risposta.children('.time-received').text('05:05'); //aggiungo ora
    $('.received').append(risposta); // creo cascata messaggi nella main chat
}, 1000)
})
