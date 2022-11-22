// metodo de envio de mensagens do telegram
var request = new XMLHttpRequest();
var messageId = ''
var chat = '5841796326:AAGWhmIGp5OFBxGa6_HYZp4tzPwWEB6W9CQ'
var token = '-1001587239127'

function enviarMsgTelegram(msg) {
    try {
        if (token != undefined && token != '' && chat != undefined && chat != '') {

            request.onreadystatechange = function () {
                if (request.readyState == XMLHttpRequest.DONE) {
                    messageId = JSON.parse(request.response).result.message_id
                }
            }
            request.open("POST", `https://api.telegram.org/bot${token}/sendMessage`, true)
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            request.send(JSON.stringify({ chat_id: chat, text: msg }))

        } else {
            console.log('Não foi possivel enviar o sinal para o Telegram - token ou chat_id vazio')
        }
    } catch (err) {
        console.log('Erro na Api do Telegram - não enviou a mensagem')
    }

}

function apagarMsgTelegram() {
    try {
        if (token != undefined && token != '' && chat != undefined && chat != '') {
            request.open("POST", `https://api.telegram.org/bot${token}/deleteMessage`, true)
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            request.send(JSON.stringify({ chat_id: chat, message_id: messageId }))
        } else {
            console.log('Não foi possivel enviar o sinal para o Telegram - token ou chat_id vazio')
        }
    } catch (err) {
        console.log('Erro na Api do Telegram - não apagou a mensagem')
    }

}


var displayLobbyExists = false
var displayRoletaExists = false
var statusBot

var voisinsRep = 0
var ficha = 0
var stopGain = 0
var stopLoss = 0
var gale = 0

var fichaAposta = 0
var fichaZero = 0
var contagemAcertos = 0
var contagemErros = 0

var visaoLobby = 0
var fichasRoletas = []

if (document.baseURI.includes('c365play')) {
    fichasRoletas = [{ nome: 'Super Spin Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'bet365 Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'bet365 Dutch Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Who Wants To Be a Millionaire? Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Mega Fire Blaze Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Age Of The Gods Bonus Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Hindi Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Greek  Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Turkish Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Roleta Brasileira', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Prestige Roulette', valores: ['5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'UK Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Bucharest Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Roulette Italiana', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Arabic Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] }]
} else if (document.baseURI.includes('cachedownload')) {
    fichasRoletas = [
        { nome: 'Roleta Brasileira', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Mega Fire Blaze Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Who Wants To Be a Millionaire? Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k', '5k'] },
        { nome: 'Age Of The Gods Bonus Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Prestige Roulette', valores: ['5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'UK Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Roulette Italiana', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Bucharest Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Greek Quantum Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Turkish Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Deutsches Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Arabic Roulette', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Hindi Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Greek  Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] }]

}

var voisins = ['B', '0', '2', '3', '4', '7', '12', '15', '17', '18', '19', '21', '22', '25', '26', '28', '29', '32', '34', '35']

var roletasLobby = []

var rodada = 0
var ciclo = 0
var sequenciaAtual = []
// 1- duzia 2- coluna 3- altos baixos 4- cores 5- impar par
var estrategiaEncontrada = ''
var cicloGale = 1

//chaves de aposta
var chaveVoisins = false


var configuracao = {
    voisins: 0,
    ficha: 0,
    gain: 0,
    loss: 0,
    gale: 0
}

function salvarConfig() {
    chrome.storage.local.set({
        configuracao,
    }, () => {
    })
}

function carregarConfiguracao() {
    chrome.storage.local.get(["configuracao"], (res) => {
        if (res.configuracao == undefined) {
            configuracao.voisins = 5
            configuracao.ficha = 1
            configuracao.gain = 5
            configuracao.loss = 1
            configuracao.gale = 1

            voisinsRep = configuracao.voisins
            ficha = configuracao.ficha
            stopGain = configuracao.gain
            stopLoss = configuracao.loss
            gale = configuracao.gale

            salvarConfig()
        } else {
            configuracao = res.configuracao

            statusBot = configuracao.status
            voisinsRep = configuracao.voisins
            ficha = configuracao.ficha
            stopGain = configuracao.gain
            stopLoss = configuracao.loss
            gale = configuracao.gale
        }
    })
}

function dataHora() {
    var date = new Date
    var seconds = date.getSeconds()
    var minutes = date.getMinutes()
    var hour = date.getHours()

    return `${hour}:${minutes}:${seconds}`
}

function inserirTextoDisplay(texto, tela) {
    if (tela == 1) {
        var textoDisplay = document.getElementById("displaybotlobby")
        textoDisplay.textContent = `${texto}`
    } else if (tela == 2) {
        var textoDisplay = document.getElementById("displaybotroleta")
        textoDisplay.textContent = `${texto}`
    }

}

function analisandoEstrategias() {
    qtdRoletas = document.getElementsByClassName('lobby-tables__item').length
    if (qtdRoletas > 1) {
        apostouDuzia = false
        apostouColuna = false

        if (!displayLobbyExists) {
            if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
            } else if (document.querySelector('.lobby__filter')) {
                painelLobby = document.querySelector('.lobby__filter')
            }
            painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
            displayRoletaExists = false
            displayLobbyExists = true
        }

        inserirTextoDisplay(`Bot Auto Fire - ${contagemAcertos} win - ${contagemErros} loss - online`, 1)
        listarRoletasLobby(qtdRoletas)
        for (let i = 0; i < roletasLobby.length; i++) {
            if (validarRoleta(roletasLobby[i].nome)) {
                if (estrategiaVoisins(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'voisins'
                    console.log(`${dataHora()} entrou na roleta - ${roletasLobby[i].nome}`)
                    roletasLobby = []
                    document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__game-logo')[0].click()
                    break
                } else {
                    inserirTextoDisplay(`Bot Auto Fire- ${contagemAcertos} win - ${contagemErros} loss - online`, 1)
                }
            }
        }
    } else {
        var cargaRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB').length
        if (cargaRoleta > 0) {
            if (!displayRoletaExists) {
                painelRoleta = document.querySelector('.account-panel');
                painelRoleta.insertAdjacentHTML('beforeend', '<span id = "displaybotroleta" style="margin: 10px;width: 90%;color: white;text-align: left;"></span>');
                displayRoletaExists = true
                displayLobbyExists = false
            }
            var nomeRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB')[0].outerText
            var roleta = carregarRoleta()

            if (document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7').length == 1) {
                document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7')[0].click()
            }

            if (document.getElementsByClassName('timer').length == 1) {
                executarAposta()
            }

            if (JSON.stringify(sequenciaAtual) != JSON.stringify(roleta[0].sequencia)) {
                sequenciaAtual = roleta[0].sequencia
                if (estrategiaEncontrada == 'voisins') {
                    if (rodada == 0) {
                        rodada++
                        enviarMsgTelegram(`🔥AUTO BOT FIRE\n\n🔥confirmando estrategia\n\n🔥${nomeRoleta}\n\nNÚMERO -${roleta[0].sequencia[0]}\n\n🎰BET365 OU BETANO`)
                        inserirTextoDisplay('confirmando estratégia voizins', 2)
                        console.log(`${dataHora()} - ${nomeRoleta} - confirmando estratégia voizins`)
                    } else if (rodada == 1) {
                        if (!voisins.includes(roleta[0].sequencia[0]) && !voisins.includes(roleta[0].sequencia[1])) {
                            rodada++
                            chaveVoisins = true
                            apagarMsgTelegram()
                            enviarMsgTelegram(`🔥AUTO BOT FIRE\n\n🔥APOSTE NOS 9 VIZINHOS DO 0\n\nNÚMERO -${roleta[0].sequencia[0]}\n\n🔥${nomeRoleta}\n\n🎰BET365 OU BETANO`)
                            inserirTextoDisplay('apostando numeros Voisins', 2)
                            console.log(`${dataHora()} - ${nomeRoleta} - apostando numeros Voisins`)
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                            console.log(`${dataHora()} - ${nomeRoleta} - não confirmou`)
                        }

                    } else if (rodada > 1) {
                        if (voisins.includes(roleta[0].sequencia[0])) {
                            console.log(`${dataHora()} - ${nomeRoleta} - green`)
                            cicloGale = 1
                            contagemAcertos++
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            enviarMsgTelegram(`🔥AUTO BOT FIRE\n\n✅✅✅GREEN✅✅✅\n\nNÚMERO -${roleta[0].sequencia[0]}\n\n🔥${nomeRoleta}\n\n🎰BET365 OU BETANO`)
                            document.getElementsByClassName('close-button header__close-button')[0].click()

                        } else {
                            if (gale > rodada - 2) {
                                cicloGale++
                                rodada++
                                chaveVoisins = true
                                inserirTextoDisplay('Gale numeros Voisins', 2)
                                console.log(`${dataHora()} - ${nomeRoleta} - Gale numeros Voisins`)
                            } else {
                                console.log(`${dataHora()} - ${nomeRoleta} - loss`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                apagarMsgTelegram()
                            enviarMsgTelegram(`🔥AUTO BOT FIRE\n\n❌❌❌LOSS❌❌❌\n\nNÚMERO -${roleta[0].sequencia[0]}\n\n🔥${nomeRoleta}\n\n🎰BET365 OU BETANO`)
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else {
                    document.getElementsByClassName('close-button header__close-button')[0].click()
                }
            }
        }
    }

}

function listarRoletasLobby(qtd) {

    carregarVisao()

    for (let i = 0; i < qtd; i++) {
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container').length == 1) {
            nomeRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container')[0].outerText
        } else {
            nomeRoleta = ''
        }
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP').length == 1) {
            sequenciaRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
        } else {
            sequenciaRoleta = []
        }

        if (sequenciaRoleta.length != 0) {
            var listaSequenciaOld = sequenciaRoleta.split("\n")
            var sizesequencia = listaSequenciaOld.length
            var listaSequenciaNew = []
            for (let i = 0; i < sizesequencia; i++) {
                if (listaSequenciaOld[i].charAt(0) != "x") {
                    listaSequenciaNew.push(listaSequenciaOld[i])
                }
            }

            if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta }).length == 0) {
                roletasLobby.push({ nome: nomeRoleta, sequencia: listaSequenciaNew, lobby: listaSequenciaNew })
            } else if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta }).length == 1) {
                if (JSON.stringify(listaSequenciaNew) != JSON.stringify(roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].lobby)) {
                    roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].lobby = listaSequenciaNew
                    roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.unshift(listaSequenciaNew[0])
                    if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.length > 30) {
                        roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.pop()
                    }
                }
            }

        } else {
            roletasLobby.push({ nome: nomeRoleta, sequencia: sequenciaRoleta })
        }

    }

}

function carregarVisao() {
    if (visaoLobby == 0) {
        if (document.getElementsByClassName('lobby-tables__item').length > 0) {
            document.getElementsByClassName('lobby-tables__item')[0].scrollIntoView()
            visaoLobby++
        }
    } else if (visaoLobby == 1) {
        if (document.getElementsByClassName('lobby-tables__item').length > 10) {
            document.getElementsByClassName('lobby-tables__item')[10].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 2) {
        if (document.getElementsByClassName('lobby-tables__item').length > 20) {
            document.getElementsByClassName('lobby-tables__item')[20].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 3) {
        if (document.getElementsByClassName('lobby-tables__item').length > 30) {
            document.getElementsByClassName('lobby-tables__item')[30].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 4) {
        if (document.getElementsByClassName('lobby-tables__item').length > 40) {
            document.getElementsByClassName('lobby-tables__item')[30].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else {
        visaoLobby = 0
    }
}

function validarRoleta(nome) {
    validouFichaAposta = false
    for (let i = 0; i < fichasRoletas.length; i++) {
        if (fichasRoletas[i].nome == nome) {
            if (ficha == 1) {
                if (fichasRoletas[i].valores.includes('0.5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('0.5')
                    validouFichaAposta = true
                }
            } else if (ficha == 2) {
                if (fichasRoletas[i].valores.includes('1')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('1')
                    validouFichaAposta = true
                }
            } else if (ficha == 3) {
                if (fichasRoletas[i].valores.includes('2.5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2.5')
                    validouFichaAposta = true
                }
            } else if (ficha == 4) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5')
                    validouFichaAposta = true
                }
            } else if (ficha == 5) {
                if (fichasRoletas[i].valores.includes('20')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('20')
                    validouFichaAposta = true
                }
            } else if (ficha == 6) {
                if (fichasRoletas[i].valores.includes('25')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('25')
                    validouFichaAposta = true
                }
            } else if (ficha == 7) {
                if (fichasRoletas[i].valores.includes('50')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('50')
                    validouFichaAposta = true
                }
            } else if (ficha == 8) {
                if (fichasRoletas[i].valores.includes('100')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('100')
                    validouFichaAposta = true
                }
            } else if (ficha == 9) {
                if (fichasRoletas[i].valores.includes('125')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('125')
                    validouFichaAposta = true
                    break
                }
            } else if (ficha == 10) {
                if (fichasRoletas[i].valores.includes('500')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('500')
                    validouFichaAposta = true
                }
            } else if (ficha == 11) {
                if (fichasRoletas[i].valores.includes('2k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2k')
                    validouFichaAposta = true
                }
            } else if (ficha == 12) {
                if (fichasRoletas[i].valores.includes('2.5k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2.5k')
                    validouFichaAposta = true
                }
            } else if (ficha == 13) {
                if (fichasRoletas[i].valores.includes('5k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5k')
                    validouFichaAposta = true
                }
            } else if (ficha == 14) {
                if (fichasRoletas[i].valores.includes('25k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('25k')
                    validouFichaAposta = true
                }
            }

            if (validouFichaAposta) {
                break
            }

        }
    }

    if (validouFichaAposta) {
        return true
    } else {
        return false
    }


}

function carregarRoleta() {
    roleta = []
    nomeRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB')[0].outerText
    sequenciaRoleta = document.getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
    var listaSequenciaOld = sequenciaRoleta.split("\n")
    var sizesequencia = listaSequenciaOld.length
    var listaSequenciaNew = []
    for (let i = 0; i < sizesequencia; i++) {
        if (nomeRoleta == 'Age Of The Gods Bonus Roulette') {
            if (listaSequenciaOld[i].charAt(0) == "x") {
                listaSequenciaNew.push('B')
            } else {
                listaSequenciaNew.push(listaSequenciaOld[i])
            }
        } else if (listaSequenciaOld[i].charAt(0) != "x") {
            listaSequenciaNew.push(listaSequenciaOld[i])
        }
    }

    roleta.push({ nome: nomeRoleta, sequencia: listaSequenciaNew })

    return roleta

}

function estrategiaVoisins(roleta) {
    repeticao = 0

    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (!voisins.includes(roleta[i])) {
            repeticao++
        } else {
            repeticao = 0
        }
    }
    if (parseInt(voisinsRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticao == parseInt(voisinsRep)) {
        roleta.reverse()
        return 1
    } else {
        roleta.reverse()
        return 0
    }
}

function executarAposta() {
    if (chaveVoisins) {
        click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

        if (cicloGale > 1) {
            dobrarAposta()

            console.log(`dobrou a aposta`)
        } else {
            if (document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1] != undefined) {
                apostarBonusGodRoullete()
            }
            apostar0()
            apostar2()
            apostar3()
            apostar4()
            apostar7()
            apostar12()
            apostar15()
            apostar17()
            apostar18()
            apostar19()
            apostar21()
            apostar22()
            apostar25()
            apostar26()
            apostar28()
            apostar29()
            apostar32()
            apostar34()
            apostar35()

            console.log(`clicou nos vizinhos`)
        }



        chaveVoisins = false
    }

}

function click(x, y) {
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });
    var el = document.elementFromPoint(x, y);
    el.dispatchEvent(ev);
}

function dobrarAposta() {

    click((Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().height / 2)))

    click((Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarBonusGodRoullete() {

    if (document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[2] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell roulette-table-cell_straight-bonus roulette-table-cell_group-straight roulette-table-cell_color-purple')[1].children[2].getBoundingClientRect().height / 2)))

    }

    console.log('clicou bonus')
}

function apostar0() {
    if (document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().height / 2)))
    } else if (document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().height / 2)))
    }

    console.log('clicou 0')
}

function apostar1() {
    if (document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-1')[1].children[2].getBoundingClientRect().height / 2)))
    }

    console.log('clicou 1')
}

function apostar2() {
    if (document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-2')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 2')
}

function apostar3() {
    if (document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-3')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 3')
}

function apostar4() {
    if (document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-4')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 4')
}

function apostar5() {
    if (document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-5')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 5')
}

function apostar6() {
    if (document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-6')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 6')
}

function apostar7() {
    if (document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-7')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 7')
}

function apostar8() {
    if (document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-8')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 8')
}

function apostar9() {
    if (document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-9')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 9')
}

function apostar10() {
    if (document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-10')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 10')
}

function apostar11() {
    if (document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-11')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 11')
}

function apostar12() {
    if (document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-12')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 12')
}

function apostar13() {
    if (document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-13')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 13')
}

function apostar14() {
    if (document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-14')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 14')
}

function apostar15() {
    if (document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-15')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 15')
}

function apostar16() {
    if (document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-16')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 16')
}

function apostar17() {
    if (document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-17')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 17')
}

function apostar18() {
    if (document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-18')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 18')
}

function apostar19() {
    if (document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-19')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 19')
}

function apostar20() {
    if (document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-20')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 20')
}

function apostar21() {
    if (document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-21')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 21')
}

function apostar22() {
    if (document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-22')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 22')
}

function apostar23() {
    if (document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-23')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 23')
}

function apostar24() {
    if (document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-24')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 24')
}

function apostar25() {
    if (document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-25')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 25')
}

function apostar26() {
    if (document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-26')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 26')
}

function apostar27() {
    if (document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-27')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 27')
}

function apostar28() {
    if (document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-28')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 28')
}

function apostar29() {
    if (document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-29')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 29')
}

function apostar30() {
    if (document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-30')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 30')
}

function apostar31() {
    if (document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-31')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 31')
}

function apostar32() {
    if (document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-32')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 32')
}

function apostar33() {
    if (document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-33')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 33')
}

function apostar34() {
    if (document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-34')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 34')
}

function apostar35() {
    if (document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-35')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 35')
}

function apostar36() {
    if (document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[3].getBoundingClientRect().height / 2)))

    } else if (document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[2] != undefined) {

        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-36')[1].children[2].getBoundingClientRect().height / 2)))
    }
    console.log('clicou 36')
}


setInterval(() => {
    try {
        carregarConfiguracao()
        ciclo++
        if (statusBot == 0) {
            if (document.getElementsByClassName('lobby-tables__item').length > 1) {
                if (!displayLobbyExists) {
                    if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                        painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
                    } else if (document.querySelector('.lobby__filter')) {
                        painelLobby = document.querySelector('.lobby__filter')
                    }
                    painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
                    displayRoletaExists = false
                    displayLobbyExists = true
                }
                inserirTextoDisplay(`Bot Auto Fire bloqueado`, 1)
            }
        } else if (stopGain == contagemAcertos || stopLoss == contagemErros) {
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }
            if (document.getElementsByClassName('lobby-tables__item').length > 1) {
                if (!displayLobbyExists) {
                    if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                        painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
                    } else if (document.querySelector('.lobby__filter')) {
                        painelLobby = document.querySelector('.lobby__filter')
                    }
                    painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
                    displayRoletaExists = false
                    displayLobbyExists = true
                }
                inserirTextoDisplay(`Bot Auto Fire - ${contagemAcertos} win - ${contagemErros} loss - off`, 1)
            }
            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
            } else if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length == 0) {
                document.getElementsByClassName('close-button header__close-button')[0].click()
                ciclo = 0
            }
        } else {
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }

            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
                estrategiaEncontrada = ''
                ciclo = 0
            }
            if (document.getElementsByClassName('welcome-modal__footer welcome-footer').length == 1) {
                document.getElementsByClassName('welcome-modal__footer welcome-footer')[0].children[0].click()
            }

            if (document.getElementsByClassName('welcome-modal__footer welcome-footer').length == 1) {
                document.getElementsByClassName('welcome-modal__footer welcome-footer')[0].click()
            }

            if (document.getElementsByClassName('modal-button__textsTEBj_JYXKh_SqB6cL2k').length > 0) {
                document.getElementsByClassName('modal-button__textsTEBj_JYXKh_SqB6cL2k')[0].click()
            }

            analisandoEstrategias()
        }

    } catch (err) {
        console.log(err)
    }

}, 4000)
