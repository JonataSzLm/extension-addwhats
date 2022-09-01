const form = document.querySelector('#form');
const numero = document.querySelector('#numero');
const btn = document.querySelector('#btn-submit');
const link = document.querySelector('.link');
const urlwpp = 'https://web.whatsapp.com/'
const urlSite = 'https://addwhats.herokuapp.com/';

const validaNumero = ({target}) => {
    if (target.value.length > 12) {
        btn.removeAttribute('disabled');
        return;
    }
    btn.setAttribute('disabled', '');
}

const redirecionarPagina = (url, redirect) => {
    if (redirect) {
        window.open(url, '_blank');
    } else {
        window.close();
        window.open(url);
    }
}

const abrirLink = () => {
    redirecionarPagina(urlSite, true);
}

const adicionaNumero = async (event) => {
    event.preventDefault();
    var url = urlwpp + 'send?phone="' + numero.value + '"';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url == urlwpp) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: redirecionarPagina,
            args: [url, false],
        });
    } else {
        redirecionarPagina(url, true);
    }
}

link.addEventListener('click', abrirLink);
numero.addEventListener('input', validaNumero);
form.addEventListener('submit', adicionaNumero);