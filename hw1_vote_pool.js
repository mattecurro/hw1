function onJSON_aggiornaOpzioni(json) {
    const id_sondaggio = document.querySelector("input[name='id']").value;

    document.querySelector("#sec_risultati").classList.add("hidden");
    
    document.querySelector("#sec_dettagli").classList.add("hidden");

    document.querySelector("#sec_registra_voto").classList.remove("hidden");

    document.querySelector("#sec_registra_voto").innerHTML = "";


    document.querySelector("#risultati").classList.remove("underlined");
    document.querySelector("#dettagli").classList.remove("underlined");
    
    document.querySelector("#registra_voto").classList.add("underlined");



    const form = document.createElement("form");
    form.setAttribute('name', 'scelta');
    form.setAttribute('action', "hw1_add_vote.php"); 
    form.setAttribute('method', 'GET');

    
    for(voto of json)  {
        if(id_sondaggio == voto.Sondaggio){
            const input = document.createElement("input");
            input.setAttribute('type', 'submit');
            input.setAttribute('name', 'scelta');
            input.setAttribute('value', voto.Opzione);
    
            const input_hidden_voto = document.createElement("input");
            input_hidden_voto.setAttribute('type', 'hidden');
            input_hidden_voto.setAttribute('name', 'voto');
            input_hidden_voto.setAttribute('value', voto.Id);      
            
            const input_hidden_id_sondaggio = document.createElement("input");
            input_hidden_id_sondaggio.setAttribute('type', 'hidden');
            input_hidden_id_sondaggio.setAttribute('name', 'id_sondaggio');
            input_hidden_id_sondaggio.setAttribute('value', voto.Sondaggio);            
         
         
            document.querySelector("section").appendChild(form);
            form.appendChild(input);
            form.appendChild(input_hidden_voto);
            form.appendChild(input_hidden_id_sondaggio);
        }
    }
    const container = document.createElement("div");
    container.classList.add("vote_container");
    const descrizione = document.createElement("div");
    descrizione.textContent = "Il tuo nome";
    const username = document.createElement("input");
    username.setAttribute('type', 'text');
    username.setAttribute('name', 'username');
    container.appendChild(descrizione);
    container.appendChild(username);
    form.appendChild(container);



    document.querySelector('form').addEventListener("submit", controllo);


    document.querySelector('#registra_voto').removeEventListener("click", aggiornaOpzioni);
    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);
    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);

}



function responseAggiorna(response) {
    return response.json();
}

function aggiornaOpzioni() {
    //Richiedo la lista dei sondaggi
    fetch("hw1_get_options.php").then(responseAggiorna).then(onJSON_aggiornaOpzioni);
}

//carico opzioni del sondaggio cliccato
aggiornaOpzioni();

document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);




function controllo(event)   {
    const form = event.currentTarget;

    if(form.username.value.length == 0) {
            alert("Compilare il campo utente");
            event.preventDefault();
    }

    
}



function onJSON_aggiornaRisultati(json) {
    const id_sondaggio = document.querySelector("input[name='id']").value;
    
    document.querySelector("#sec_registra_voto").classList.add("hidden");
    
    document.querySelector("#sec_dettagli").classList.add("hidden");

    document.querySelector("#sec_risultati").classList.remove("hidden");

    document.querySelector("#sec_risultati").innerHTML = "";



    document.querySelector("#registra_voto").classList.remove("underlined");
    document.querySelector("#dettagli").classList.remove("underlined");
    
    document.querySelector("#risultati").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_risultati").appendChild(container);


    for(content of json) {

       
        const mini_container = document.createElement("div");
        mini_container.classList.add("mini_container");

        
        const opzione = document.createElement("div");
        opzione.textContent = content.opzione + "";

        //barra che si riempie 

        const n_voti = document.createElement("em");
        n_voti.textContent = "Voti: "; 
        const n_voti_value = document.createElement("strong");
        n_voti_value.textContent = content.n_occ_voto + " ";


        const n_votanti = document.querySelector("input[name='n_vot']").value;

        const perc_voti = document.createElement("em");
        perc_voti.textContent = "Percentuale: "; 
        const perc_voti_value = document.createElement("strong");
        perc_voti_value.textContent = (100 * content.n_occ_voto / n_votanti) + "%  ";

        //container.appendChild(opzione);
        container.appendChild(mini_container);
        mini_container.appendChild(opzione);
        mini_container.appendChild(n_voti);
        mini_container.appendChild(n_voti_value);
        mini_container.appendChild(perc_voti);
        mini_container.appendChild(perc_voti_value);
    }

    
    document.querySelector('#risultati').removeEventListener("click", aggiornaRisultati);

    document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);
    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);

}






function aggiornaRisultati(){
    //ho come info: INPUT "HIDDEN" id.sondaggio e la sessione 
    const id_sondaggio = document.querySelector("input[name='id']").value;
    //Richiedo OPZIONI: partecipanti - opzione  
    fetch("hw1_get_results.php?id_sondaggio="+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaRisultati);
}

document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);





function onJSON_aggiornaDettagli(json) {
    //const id_sondaggio = document.querySelector("input[name='id']").value;
    
    document.querySelector("#sec_registra_voto").classList.add("hidden");
    
    document.querySelector("#sec_risultati").classList.add("hidden");

    document.querySelector("#sec_dettagli").classList.remove("hidden");

    document.querySelector("#sec_dettagli").innerHTML = "";



    document.querySelector("#registra_voto").classList.remove("underlined");
    document.querySelector("#risultati").classList.remove("underlined");
    
    document.querySelector("#dettagli").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_dettagli").appendChild(container);
    
    
    for(content of json.opzioni){
        const mini_container = document.createElement("div");
        mini_container.classList.add("mini_container");
        container.appendChild(mini_container);


        const div_opzione = document.createElement("div");
        div_opzione.textContent = content.Opzione;
        div_opzione.setAttribute('id', content.Opzione);
        div_opzione.setAttribute('class', 'title');

        mini_container.appendChild(div_opzione);    
    }

    for(content of json.utenti){
        const username = document.createElement("div");
        username.textContent = content.Username;
        username.setAttribute('class', 'subtitle')
        document.getElementById(content.Opzione).appendChild(username);

    }


    document.querySelector('#dettagli').removeEventListener("click", aggiornaDettagli);

    document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);
    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);

}



function aggiornaDettagli(){    
    const id_sondaggio = document.querySelector("input[name='id']").value;
    //Richiedo OPZIONI: partecipanti - opzione  
    fetch("hw1_get_details.php?id_sondaggio="+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaDettagli);
}




document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);




function escapeJS(string){
    try {
		return string.replace(/['"`\\]/g,
		tag => ({
				"'":"\\\\'",
        '"':'\"',
        '`':"\\\\'"
	}[tag]));
	} catch (e) {
	console.error(e);
	}
}





function onJSON(json) {
	const section = document.querySelector('#modal-view section');
    for (commento of json)
    {
        //scrivo tutti i commenti già presenti
        //distinzione io, non io per motivi stilistici

		const container = document.createElement('div');
		
        const username = document.querySelector("input[name='username']").value;
   
        if(username == commento.Id_Utente){
            //da capire cosa fa e chiamare in modo diverso
    	    container.className="io";
        }else{
            container.className="nonio";
        }
        const h1 = document.createElement('h1');
        h1.textContent = commento.Id_Utente + " " + commento.username;
        
        const p = document.createElement('p');
        p.textContent = commento.Testo;


        container.appendChild(h1);
        container.appendChild(p);
        section.appendChild(container);
    }

    /*
    const form_commento = document.createElement('form');
    
    form_commento.setAttribute('name', 'commenta');
    form_commento.setAttribute('action', "hw1_add_comment.php");
    
    //farlo con il nome 'commenta'
    form_commento.className="scrivi";
    */  


    const container_input = document.createElement('div');
    container_input.className="scrivi";
    
    const textarea = document.createElement('textarea');
    
    
    textarea.className="scrivi_commento";
    textarea.setAttribute("placeholder", "Il mio commento");
    
    
    container_input.appendChild(textarea);
	
    
    const button = document.createElement('input');
    
    button.setAttribute("type", "button");

    //	button.setAttribute("value", "Commenta");
  
    button.onclick = function(){
        const container_text = document.querySelector('.scrivi_commento');
        if( container_text.value !== ""){
            const testo_safe = escapeJS(container_text.value);
            const id_sondaggio = document.querySelector("input[name='id']").value;
            const utente_id = document.querySelector("input[name='utente_id']").value;

            fetch("hw1_add_comment.php?id_sondaggio="+id_sondaggio+"&testo="+testo_safe+"&utente_id="+utente_id);
        }
    

	    const millis=1000;
	    const date = new Date();
	    let curDate = null;
	    do {
		    curDate = new Date();
	    }while(curDate-date < millis);
	    modalView.innerHTML = '';
        const container = document.createElement('div');
        container.className="chiudi";
        
        const img_close = document.createElement('img');
        img_close.src="close.png";
        //reimposto funzionamento al click della close
        img_close.onclick = function() {
        document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        modalView.innerHTML = '';
        };
        container.appendChild(img_close);
        modalView.appendChild(container);
        modalView.classList.remove('hidden');
        const section_conversazione = document.createElement('section');
        section_conversazione.className="conversazione";
        modalView.appendChild(section_conversazione);
        const id_sondaggio = document.querySelector("input[name='id']").value;
        fetch("hw1_comment.php?id_sondaggio="+id_sondaggio).then(onResponse).then(onJSON);
    };
    button.setAttribute("value", "Commenta");
    button.className="inv";
   

    container_input.appendChild(button);
    
    modalView.appendChild(container_input);
} 

  
function onResponse(response) {
    return response.json();
} 


function onThumbnailclick(){
    const id_sondaggio = document.querySelector("input[name='id']").value;
    const username = document.querySelector("input[name='username']").value;
    
 //   const username = document.querySelector("input[name='username']").value;
    if(username == ""){
        alert("Per accedere alla Sezione Commenti devi aver votato almeno una volta");
//        header("Location: hw1_vote_pool.php");
    } 
    else{
    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    const container = document.createElement('div');
    container.className="chiudi";
    const img_close = document.createElement('img');
    img_close.src="close.png";
    //reimposto funzionamento al click della close
    img_close.onclick = function() {
        document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        modalView.innerHTML = '';
    };
    container.appendChild(img_close);
    modalView.appendChild(container);
    modalView.classList.remove('hidden');
    const section_conversazione = document.createElement('section');
    section_conversazione.className="conversazione";
    modalView.appendChild(section_conversazione);
    fetch("hw1_comment.php?id_sondaggio="+id_sondaggio).then(onResponse).then(onJSON);
    }
}
    

function aggiungi_evento()
{
    let box = document.querySelector('.chat');
    box.addEventListener('click', onThumbnailclick);
    /*
 	let boxes = document.querySelectorAll('.chat');
 	for (const box of boxes)
   {
 		box.addEventListener('click', onThumbnailclick);
 	 }
      */
}


const modalView = document.querySelector('#modal-view');
aggiungi_evento();


function onJSON_API(json){
    const luogo = json.location.name;
    const meteo = json.current.condition.text;
    const div_meteo = document.createElement('span');
    div_meteo.textContent = "Meteo a " + luogo + " : " + meteo;
    document.querySelector('#ultimo').appendChild(div_meteo); 
}


function api(){
    const luogo = document.querySelector("input[name='luogo']").value;
    fetch("hw1_api_weather.php?luogo="+luogo).then(onResponse).then(onJSON_API);
}


api();

