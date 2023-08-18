class JogodaForcaView {

    teclado = document.querySelector('.teclado');
    tecladoLinha1 = document.querySelector('.tecladoLinha1');
    tecladoLinha2 = document.querySelector('.tecladoLinha2');
    tecladoLinha3 = document.querySelector('.tecladoLinha3');
    palpite = document.querySelector('.palpite');
    FimDeJogo = document.querySelector('.FimDeJogo');
    btnJogarNovamente = document.querySelector('.btnJogarNovamente');
    imagem = document.querySelector('.imagem');

    palavraSorteada = '';
    palavraPalpite = '';
    arrayPalpite = '';
    numeroAcertos = 0;
    numeroErros = 0;

    palavras = [
        "ABACATE", "ABACAXI", "ACEROLA", "AÇAI", "ARAÇA", "ABACATE", "BACABA", "BACURI", "BANANA",
        "CAJA", "CAJU", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA", "JENIPAPO",
        "MAÇA", "MANGABA", "MANGA", "MARACUJA", "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI",
        "TANGERINA", "UMBU", "UVA", "UVAIA"
    ];


    constructor() {
        this.registrarEventos();
        this.IniciarNovoJogo();

        console.log(this.palavraSorteada);
        console.log(this.palavraPalpite);
    }

    IniciarNovoJogo() {

        this.palavraPalpite = '';
        this.palavraSorteada = '';
        this.arrayPalpite = '';
        this.numeroAcertos = 0;
        this.numeroErros = 0;

        this.SortearPalavra();
        this.ConfigurarPalpite(this.palavraSorteada);
        this.HabilitarBotoes(this.teclado);
        this.FimDeJogo.style.visibility = 'hidden';
        this.btnJogarNovamente.style.visibility = 'hidden';

    }

    SortearPalavra() {
        const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);
        this.palavraSorteada = this.palavras[indiceAleatorio];
    }

    ConfigurarPalpite(palavraSorteada) {
        let palavraPalpite = "";
        for (let i = 0; i < palavraSorteada.length; i++) {
            palavraPalpite += "-"
        }
        this.palpite.textContent = palavraPalpite;
        this.arrayPalpite = palavraPalpite.split('');
        return palavraPalpite;
    }

    registrarEventos() {
        this.tecladoLinha1.childNodes.forEach(botao => {
            botao.addEventListener('click', (e) => this.digitarCaractere(e));
        });
        this.tecladoLinha2.childNodes.forEach(botao => {
            botao.addEventListener('click', (e) => this.digitarCaractere(e));
        });
        this.tecladoLinha3.childNodes.forEach(botao => {
            botao.addEventListener('click', (e) => this.digitarCaractere(e));
        });

        this.btnJogarNovamente.addEventListener('click', () => this.IniciarNovoJogo());
    }

    digitarCaractere(evento) {

        const letraClicada = evento.target.textContent;

        this.VerificarResultado(letraClicada, evento);

    }

    VerificarResultado(letraClicada, evento) {

        const botaoClicado = evento.target;

        let acertou = false
        for (let i = 0; i < this.palavraSorteada.length; i++) {
            if (this.palavraSorteada[i] == letraClicada) {
                this.arrayPalpite[i] = letraClicada;
                this.numeroAcertos++;
                acertou = true;

            }
        };

        if (acertou) {
            botaoClicado.style.backgroundColor = 'green';

        }
        else {
            botaoClicado.style.backgroundColor = 'red';
            this.numeroErros++;
            this.AtualizarForca();
        }

        botaoClicado.disabled = true;

        this.VerificarVitoria();

        this.palpite.textContent = this.arrayPalpite.join('');
    }
    AtualizarForca() {
        if (this.numeroErros == 0) this.imagem.style.backgroundImage = 'url("img/forca.png")';
        else if (this.numeroErros == 1) this.imagem.style.backgroundImage = 'url("img/forca01.png")';
        else if (this.numeroErros == 2) this.imagem.style.backgroundImage = 'url("img/forca02.png")';
        else if (this.numeroErros == 3) this.imagem.style.backgroundImage = 'url("img/forca03.png")';
        else if (this.numeroErros == 4) this.imagem.style.backgroundImage = 'url("img/forca04.png")';
        else if (this.numeroErros == 5) this.imagem.style.backgroundImage = 'url("img/forca05.png")';
        else if (this.numeroErros == 6) this.imagem.style.backgroundImage = 'url("img/forca06.png")';
    }

    VerificarVitoria() {
        if (this.numeroAcertos == this.palavraSorteada.length) {

            this.FimDeJogo.textContent = "Você Venceu!";
            this.FimDeJogo.style.visibility = 'visible';
            this.btnJogarNovamente.style.visibility = 'visible';
            console.log("Você venceu!");
            this.DesabilitarBotoes(this.teclado);
        }

        if (this.numeroErros == 6) {

            this.FimDeJogo.textContent = "Você Morreu! A palavra era " + this.palavraSorteada + ".";
            this.FimDeJogo.style.visibility = 'visible';
            this.btnJogarNovamente.style.visibility = 'visible';

            console.log("Você morreu!");
            this.DesabilitarBotoes(this.teclado);
        }
    };

    DesabilitarBotoes(div) {
        const botoes = div.querySelectorAll('button');
        botoes.forEach(botao => {
            botao.disabled = true;
        });
    }

    HabilitarBotoes(div) {
        const botoes = div.querySelectorAll('button');
        botoes.forEach(botao => {
            botao.style.backgroundColor = 'white';
            botao.disabled = false;
        });
    }

}

window.addEventListener('load', () => new JogodaForcaView());
