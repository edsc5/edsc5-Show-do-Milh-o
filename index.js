const readlineSync = require('readline-sync');

//ESTRUTURA DE DADOS E CONSTANTES

const PERGUNTAS = [
    {
        pergunta: "Qual é a capital da Austrália?",
        opcoes: ["Brisbane", "Sydney", "Melbourne", "Canberra"],
        resposta: 3
    },
    {
        pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
        opcoes: ["1965", "1972", "1957", "1969"],
        resposta: 3
    },
    {
        pergunta: "Qual é o animal terrestre mais rápido do mundo?",
        opcoes: ["Lobo", "Leão", "Cavalo", "Guepardo"],
        resposta: 3
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: ["William Shakespeare", "Miguel de Cervantes", "Dante Alighieri", "Jorge Luis Borges"],
        resposta: 1
    },
    {
        pergunta: "Qual é o maior oceano do mundo?",
        opcoes: ["Pacífico", "Atlântico", "Ártico", "Índico"],
        resposta: 0
    },
    {
        pergunta: "Qual é a pintura mais famosa de Leonardo da Vinci?",
        opcoes: ["A Anunciação", "O Homem Vitruviano", "A Última Ceia", "Mona Lisa"],
        resposta: 3
    },
    {
        pergunta: "Qual país tem o maior número de pirâmides?",
        opcoes: ["México", "Egito", "Peru", "Sudão"],
        resposta: 3
    },
    {
        pergunta: "Qual é a montanha mais alta do mundo?",
        opcoes: ["Monte Everest", "Aconcágua", "K2", "Kangchenjunga"],
        resposta: 0
    },
    {
        pergunta: "Qual é o elemento químico mais abundante na crosta terrestre?",
        opcoes: ["Alumínio", "Ferro", "Silício", "Oxigênio"],
        resposta: 3
    },
    {
        pergunta: "Quem foi o primeiro presidente do Brasil?",
        opcoes: ["Dom Pedro II", "Prudente de Morais", "Deodoro da Fonseca", "Getúlio Vargas"],
        resposta: 2
    },
    {
        pergunta: "Qual é o rio mais longo do mundo?",
        opcoes: ["Rio Amazonas", "Rio Mississippi", "Rio Yangtzé", "Rio Nilo"],
        resposta: 3
    },
    {
        pergunta: "Qual o nome do processo pelo qual as plantas produzem seu próprio alimento?",
        opcoes: ["Fotossíntese", "Respiração", "Transpiração", "Germinação"],
        resposta: 0
    },
    {
        pergunta: "Em que continente fica a Grécia?",
        opcoes: ["América do Sul", "Europa", "África", "Ásia"],
        resposta: 1
    },
    {
        pergunta: "Qual é a moeda oficial do Japão?",
        opcoes: ["Yuan", "Dólar", "Won", "Iene"],
        resposta: 3
    },
    {
        pergunta: "Qual destes planetas é conhecido como o 'Planeta Vermelho'?",
        opcoes: ["Júpiter", "Saturno", "Marte", "Vênus"],
        resposta: 2
    },
    {
        pergunta: "Quem foi a primeira mulher a ganhar um Prêmio Nobel?",
        opcoes: ["Marie Curie", "Irène Joliot-Curie", "Rosalind Franklin", "Dorothy Hodgkin"],
        resposta: 0
    }
];

const PREMIOS = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];


//FUNÇÕES PRINCIPAIS DO JOGO

function exibirResumoFinal(nomeJogador, nivelAtual, premioFinal, ultimaPergunta) {
    console.clear();
    const rodadasCompletas = nivelAtual;
    const rodadasFaltantes = PREMIOS.length - rodadasCompletas;
    const respostaCorretaTexto = ultimaPergunta.opcoes[ultimaPergunta.resposta];

    console.log("Fim de Jogo! Confira seu resumo:");
    console.log(`Jogador(a): ${nomeJogador}`);
    console.log(`Rodadas completadas: ${rodadasCompletas}`);
    console.log(`Rodadas faltantes: ${rodadasFaltantes}`);
    console.log(`A resposta correta da última pergunta era: "${respostaCorretaTexto}"`);
    console.log(`Premiação Final: R$ ${premioFinal.toLocaleString('pt-BR')}`);
}

function jogar(nomeJogador) {
    let nivelAtual = 0;
    let pulosDisponiveis = 1;
    let premioAtual = 0;
    let premioSeguro = 0;
    
    //Copia as perguntas para não modificar a lista original
    const perguntasDoJogo = JSON.parse(JSON.stringify(PERGUNTAS));
    const perguntasEmbaralhadas = [...perguntasDoJogo].sort(() => Math.random() - 0.5);

    for (const perguntaAtual of perguntasEmbaralhadas) {
        if (nivelAtual >= PREMIOS.length) break;

        const premioAcertar = PREMIOS[nivelAtual];
        const premioParar = premioAtual;
        const premioErrar = premioSeguro;
        
        console.clear();
        console.log(`Jogador(a): ${nomeJogador}`);
        console.log(`Rodada: ${nivelAtual + 1} de ${PREMIOS.length}`);
        console.log("VALORES DA RODADA");
        console.log(`Acertar: R$ ${premioAcertar.toLocaleString('pt-BR')}`);
        console.log(`Parar:   R$ ${premioParar.toLocaleString('pt-BR')}`);
        console.log(`Errar:   R$ ${premioErrar.toLocaleString('pt-BR')}`);
        
        console.log(`\nPergunta: ${perguntaAtual.pergunta}\n`);

        const menuCompleto = [...perguntaAtual.opcoes];
        if (pulosDisponiveis > 0) {
            menuCompleto.push(`Pular Pergunta (${pulosDisponiveis} restantes)`);
        }
        menuCompleto.push("Parar e Levar o Prêmio");

        const indiceEscolhido = readlineSync.keyInSelect(menuCompleto, "Qual sua escolha?");
        const escolhaTexto = menuCompleto[indiceEscolhido];

        if (escolhaTexto && escolhaTexto.includes("Pular")) {
            pulosDisponiveis--;
            console.log("\nVocê pulou a pergunta! Próxima rodada...");
            readlineSync.keyInPause();
            continue;
        }
        
        if (escolhaTexto && escolhaTexto.includes("Parar")) {
            exibirResumoFinal(nomeJogador, nivelAtual, premioParar, perguntaAtual);
            return;
        }

        if (indiceEscolhido === perguntaAtual.resposta) {
            premioAtual = premioAcertar;
            console.log(`\nRESULTADO: Acertou! Você garantiu R$ ${premioAtual.toLocaleString('pt-BR')}!`);

            if ((nivelAtual + 1) % 5 === 0) {
                premioSeguro = premioAtual;
                console.log(`PARABÉNS! Você atingiu um porto seguro! R$ ${premioSeguro.toLocaleString('pt-BR')} estão garantidos!`);
            }
            
            nivelAtual++;

            if (nivelAtual === PREMIOS.length) {
                exibirResumoFinal(nomeJogador, nivelAtual, premioAtual, perguntaAtual);
                return;
            }

            readlineSync.keyInPause();
        } else {
            exibirResumoFinal(nomeJogador, nivelAtual, premioErrar, perguntaAtual);
            return;
        }
    }
}

function mostrarRegras() {
    console.clear();
    console.log("Regras do Show do Milhão");
    console.log("Responda a uma série de perguntas de múltipla escolha.");
    console.log("A cada resposta correta, o valor do prêmio aumenta.");
    console.log("Você tem direito a 1 'Pulo' para pular uma pergunta.");
    console.log("A cada 5 perguntas corretas, o prêmio se torna um 'porto seguro'.");
    console.log("Se errar, você ganha o valor do último 'porto seguro' atingido.");
    console.log("Você pode 'Parar' a qualquer momento e levar o prêmio acumulado.");
    console.log("\nBoa sorte!");
    readlineSync.keyInPause();
}

function menuPrincipal() {
    console.clear();
    console.log("Bem-vindo ao Show do Milhão!");

    const nomeJogador = readlineSync.question("Qual e o seu nome? ");
    console.log(`\nOlá, ${nomeJogador}! Vamos ao menu principal.`);
    readlineSync.keyInPause();

    let sair = false;
    while (!sair) {
        console.clear();
        console.log(`Menu Principal | Jogador(a): ${nomeJogador}`);

        //Menu
        const opcoes = ["Iniciar Novo Jogo", "Ver Regras"];
        const indice = readlineSync.keyInSelect(opcoes, "O que você gostaria de fazer?", {
            cancel: "Sair do Programa"
        });

        switch (indice) {
            case 0:
                jogar(nomeJogador);
                console.log("Voltando ao menu principal...");
                readlineSync.keyInPause("Pressione qualquer tecla para continuar.");
                break;
            case 1:
                mostrarRegras();
                break;
            case -1: //Corresponde à opção "Sair do Programa"
                sair = true;
                break;
        }
    }
    console.log(`\nObrigado por jogar, ${nomeJogador}! Até a próxima!`);
}

//INICIA O JOGO
menuPrincipal();