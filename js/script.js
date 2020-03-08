//cambio icona su focus barra messaggi
    $('#messaggio').focus(function(){
        $(this).css({'border': '2px solid #00ccb8', 'color': 'black', 'border-radius': '20px'});
        $('.fa-microphone').addClass('hidden');
        $('.fa-paper-plane').removeClass('hidden');
    }).blur(function(){
        $(this).css({'border-color': '#fff', 'color': 'black'});
        $('.fa-microphone').removeClass('hidden');
        $('.fa-paper-plane').addClass('hidden');
    })

$('.search-bar input').focus(function(){
    $(this).css('border-color', '#00ccb8')
})

$('#invia').click(function(){
    invioMsg();
});
$('#messaggio').keypress(function(event){
    $('.fa-microphone').addClass('hidden');
    $('.fa-paper-plane').removeClass('hidden');
    if (event.key == 'Enter'){
        $('.fa-microphone').removeClass('hidden');
        $('.fa-paper-plane').addClass('hidden');
        invioMsg();
    }
});

var risposteRandom =[       // risposte random su invio messaggio
    'A dopo!',
    'A che ora ci vediamo?',
    'Oggi non ci sono!',
    'Ti ricordi l\'appuntamento?',
    'Finalmente ti fai sentire!!',
    'Non posso rispondere ora, scusa!'
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

$('.utente').click(function(){
    //cambia utente in chat al click su uno dei contatti
    var imgSelected = $(this).find('img').attr('src');
    var nameSelected = $(this).find('h3').text();
    $('.chat-contact').find('img').attr('src', imgSelected);
    $('.chat-contact').find('h3').text(nameSelected);
    $('.chat-contact').find('p').text('Online');
    //aggiungo stile background su utente selezionato
    $('.utente').css('background-color','#fff')
    $(this).css('background-color', '#00ccb8');

    // cambio chat a seconda utente cliccato
    // devo matchare il data dell'utente cliccato con l'id della chat corrispondente
    var chatId = $(this).data('chat');
    $('.main-chat').removeClass('active');
    $(chatId).addClass('active');
});

$(document).on('click', '.speech-bubble-sent', function(){
    $(this).find('.dropdown-sent').slideDown(500);
    $('.main-chat').click(function(){
        $('.dropdown-sent').hide();
    });
});
$(document).on('click', '.speech-bubble-received', function(){
    $(this).find('.dropdown-received').slideDown(500);
    $('.main-chat').click(function(){
        $('.dropdown-received').hide();
    });
});

/*FUNZIONI*/
// Invio messaggio
function invioMsg(){
    $('.fa-microphone').removeClass('hidden')   // cambio icona una volta inviato messaggio
    $('.fa-paper-plane').addClass('hidden')
    invioRicezione();
}

//Messaggio e risposta
function invioRicezione(){
    var messaggioInput = $('#messaggio').val();
    $('#messaggio').val('');

    var messaggio = $('.active .box-sent .template').clone(); //copia contenuto messaggio inviato che è dentro il box (che è display none)
    messaggio.find('p').text(messaggioInput); //modif. testo messaggio inviato che e inserimento nel bubble
    messaggio.find('.time-sent').text(orario()); //aggiungo ora
    $('.active').append(messaggio); // creo cascata messaggi nella main chat
    scroll()

    setTimeout(function(){
        var risposta = $('.active .box-received .template2').clone(); //copia contenuto risposta che è dentro il box (che è display none)
        risposta.find('p').text(risposteRandom[randomNum(risposteRandom.length)]); //modif. testo risposta che e inserimento nel bubble
        risposta.find('.time-received').text(orario()); //aggiungo ora
        $('.active').append(risposta); // creo cascata messaggi nella main chat
        scroll()
    }, 1000)
}

// Genera un numero random
function randomNum(num) {
  var random = Math.floor(Math.random() * (num));
  return random;
}

//orario per messaggi
function orario(){
var data = new Date();
var hours = addZero(data.getHours());
var minutes = addZero(data.getMinutes());
var time = hours + ':' + minutes;
return time
}

// Aggiunge zero
function addZero(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// Funzione di autoscorrimento in basso
function scroll() {
        var pixelScroll = $('.main-chat.active').height();
        $('.main-chat.active').scrollTop(pixelScroll);
    }
