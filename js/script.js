//cambio icona mentre scrivo il messaggio
$('#messaggio').keyup(function(){
    $('.fa-microphone').addClass('hidden')
    $('.fa-paper-plane').removeClass('hidden')
});


$('#invia').click(function(){
    $('.fa-microphone').removeClass('hidden')   // cambio icona una volta inviato messaggio
    $('.fa-paper-plane').addClass('hidden')

    var messaggioInput = $('#messaggio').val();
    $('#messaggio').val('');

    var messaggio = $('.box-sent .template').clone(); //copia contenuto messaggio inviato che è dentro il box (che è display none)
    messaggio.find('.testo-bubble-sent').text(messaggioInput); //modif. testo messaggio inviato che e inserimento nel bubble
    messaggio.find('.time-sent').text(orario()); //aggiungo ora
    $('.main-chat').append(messaggio); // creo cascata messaggi nella main chat

setTimeout(function(){
    var risposta = $('.box-received .template2').clone(); //copia contenuto risposta che è dentro il box (che è display none)
    risposta.find('.testo-bubble-received').text(risposteRandom[randomNum(risposteRandom.length)]); //modif. testo risposta che e inserimento nel bubble
    risposta.find('.time-received').text(orario()); //aggiungo ora
    $('.main-chat').append(risposta); // creo cascata messaggi nella main chat
}, 1000)
});

var risposteRandom =[       // risposte random su invio messaggio
    'A dopo.',
    'A che ora ci vediamo?',
    'Oggi non ci sono!',
    'Ti ricordi l\'appuntamento?',
    'Tutto annullato.',
    'Non posso rispondere ora, ti chiamo dopo!'
];

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

/*FUNZIONI GENERICHE*/

// Genera un numero random
function randomNum(num) {
  var random = Math.floor(Math.random() * (num));
  return random;
}

//orario per messaggi
function orario(){
var data = new Date();
var hours = (data.getHours());
var minutes = (data.getMinutes());
var time = hours + ':' + minutes;
return time
}
