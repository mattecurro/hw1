

function onThumbnailclick(event){
    premuto=event.currentTarget.attributes.num.nodeValue;
    io=event.currentTarget.attributes.user.nodeValue;
    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    conte = document.createElement('div');
    conte.className="chiudi";
    let header = document.createElement('img');
    header.src="http://nicolaaliuni.altervista.org/mhw4/immagini/close.png";
    header.onclick = function() {
        document.body.classList.remove( 'no-scroll');
        modalView.classList.add('hidden');
        modalView.innerHTML = '';
    };
      conte.appendChild(header);
         modalView.appendChild(conte);
         modalView.classList.remove('hidden');
      header = document.createElement('section');
      header.className="conversazione";
      modalView.appendChild(header);
      const link="apichat.php?num="+premuto;
      fetch(link).then(onResponse2).then(onText2);
}
    


function aggiev()
 {
 	document.querySelector('.chat').addEventListener('click', onThumbnailclick);
 }

var premuto;
var io;

const modalView = document.querySelector('#modal-view');
aggiev();