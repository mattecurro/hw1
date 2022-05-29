document.querySelector("input[type=button]").addEventListener("click",aggiungi_opzione);


function aggiungi_opzione(event) {
    const button = event.currentTarget;
    const nuova_opzione = document.createElement("input");
    nuova_opzione.setAttribute('type', 'text');
    nuova_opzione.setAttribute('name', 'opzione[]');
    const container = document.querySelector("form div");
    container.classList.remove("hidden");
    container.append(nuova_opzione);    
}



function controllo(event)   {
    const form = event.currentTarget;
    if(form.descrizione.value.length == 0 ||
        form.orario.value.length == 0 ||
        form.luogo.value.length == 0 ||
        form.data.value.length == 0 ||
        form.categoria.value.length == 0)
    {
        //avviso utente
        alert("Compilare tutti i campi");
        event.preventDefault();
    }
}

document.querySelector('form[name="login"]').addEventListener("submit", controllo);

