//cambio icona su focus barra messaggi + cambio stile su input
    $('#messaggio').focus(function(){
        $(this).css({'border': '2px solid #00ccb8', 'color': 'black', 'border-radius': '20px'});
        $('.fa-microphone').addClass('hidden');
        $('.fa-paper-plane').removeClass('hidden');
    }).blur(function(){
        $(this).css({'border-color': '#fff', 'color': 'black'});
        $('.fa-microphone').removeClass('hidden');
        $('.fa-paper-plane').addClass('hidden');
    })
// cambio stile su focus ricerca utenti
$('.search-bar input').focus(function(){
    $(this).css('border-color', '#00ccb8')
})
//invio messaggi e cambio incona su clich invio e pressione tasto Enter
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
// risposte random su invio messaggio
var risposteRandom =[
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
    $('.utente').removeClass('selezionato');
    $(this).addClass('selezionato');


    // cambio chat a seconda utente cliccato
    // devo matchare il data dell'utente cliccato con l'id della chat corrispondente
    var chatId = $(this).data('chat');
    $('.main-chat').removeClass('active');
    $(chatId).addClass('active');
});

$(document).on('click', '.speech-bubble-sent', function(){
    $(this).addClass('sent-erase')
    $(this).find('.dropdown-sent').slideDown(500);
    $('.main-chat').click(function(){
        $('.dropdown-sent').hide();
    });
    $(document).on('click', '.erase-sent', function(){
        $('.sent-erase').remove();
    })
});
$(document).on('click', '.speech-bubble-received', function(){
    $(this).addClass('received-erase')
    $(this).find('.dropdown-received').slideDown(500);
    $('.main-chat').click(function(){
        $('.dropdown-received').hide();
    });
    $(document).on('click', '.erase-received', function(){
        $('.received-erase').remove();
    })
});

// feature bonus: click su icona per aggiungere contatti (non completa xè mancano le funzionalità dei precedenti contatti + errori vari da fixare)
$('.aggiungi-contatto').click(function(){
    var nuovoContatto = $('.utente').first().clone();
    nuovoContatto.find('h3').text(nomiRandom[randomNum(nomiRandom.length)]);
    $('.users-contact').append(nuovoContatto);
    console.log(nuovoContatto);
});

var nomiRandom =[
    'Alfonso D.',
    'Giovanni',
    'Andrea S.',
    'Gustavo',
    'Paolo',
    'Edoardo F.'
];

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

    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
        testo: messaggioInput,
        ora: orario()
    };
    var html = template(context);

    $('.active').append(html); // creo cascata messaggi nella main chat
    scroll()

    setTimeout(function(){
        var source = $('#entry-template2').html();
        var template = Handlebars.compile(source);
        var context = {
            prova: risposteRandom[randomNum(risposteRandom.length)],
            ora: orario()
        };
        var risp = template(context);

        $('.active').append(risp); // creo cascata messaggi nella main chat
        scroll()

        $('.selezionato').find('.users-contact-time').text(context.ora);
        $('.selezionato').find('p').text(context.prova);
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
