var labelConfig = document.getElementById('labelConfig')
var labelLogin = document.getElementById('labelLogin')

var statusBot = 0
var emailEdit = document.getElementById('email')
var passwordEdit = document.getElementById('password')
var btnLiberar = document.getElementById('btnLiberar')

var inputVoisins = document.getElementById('inputVoisins')
var txtVoisins = document.getElementById('txtVoisins')

var inputFicha = document.getElementById('inputFicha')
var txtFicha = document.getElementById('txtFicha')

var inputGain = document.getElementById('inputGain')
var txtGain = document.getElementById('txtGain')

var inputLoss = document.getElementById('inputLoss')
var txtLoss = document.getElementById('txtLoss')

var inputGale = document.getElementById('inputGale')
var txtGale = document.getElementById('txtGale')

var btnSalvar = document.getElementById('btnSalvar')

btnLiberar.addEventListener("click", () => {
    login()
})

btnSalvar.addEventListener("click", () => {
    salvarConfig()
    alert("Bot Auto - configuração atualizada")
})

inputVoisins.addEventListener("input", () => {
    txtVoisins.textContent = `Contra Vizinhos : sequencia ${inputVoisins.value}`
})

inputFicha.addEventListener("input", () => {
    if (inputFicha.value == 1) {
        txtFicha.textContent = `Apostar com ficha R$ 0,50`
    } else if (inputFicha.value == 2) {
        txtFicha.textContent = `Apostar com ficha R$ 1,00`
    } else if (inputFicha.value == 3) {
        txtFicha.textContent = `Apostar com ficha R$ 2.50`
    } else if (inputFicha.value == 4) {
        txtFicha.textContent = `Apostar com ficha R$ 5,00`
    } else if (inputFicha.value == 5) {
        txtFicha.textContent = `Apostar com ficha R$ 20,00`
    } else if (inputFicha.value == 6) {
        txtFicha.textContent = `Apostar com ficha R$ 25,00`
    } else if (inputFicha.value == 7) {
        txtFicha.textContent = `Apostar com ficha R$ 50,00`
    } else if (inputFicha.value == 8) {
        txtFicha.textContent = `Apostar com ficha R$ 100,00`
    } else if (inputFicha.value == 9) {
        txtFicha.textContent = `Apostar com ficha R$ 125,00`
    } else if (inputFicha.value == 10) {
        txtFicha.textContent = `Apostar com ficha R$ 500,00`
    } else if (inputFicha.value == 11) {
        txtFicha.textContent = `Apostar com ficha R$ 2000,00`
    } else if (inputFicha.value == 12) {
        txtFicha.textContent = `Apostar com ficha R$ 2500,00`
    } else if (inputFicha.value == 13) {
        txtFicha.textContent = `Apostar com ficha R$ 5000,00`
    } else if (inputFicha.value == 14) {
        txtFicha.textContent = `Apostar com ficha R$ 25000,00`
    }
})

inputGain.addEventListener("input", () => {
    txtGain.textContent = `Stop Gain - ${inputGain.value}`
})

inputLoss.addEventListener("input", () => {
    txtLoss.textContent = `Stop Loss - ${inputLoss.value}`
})

inputGale.addEventListener("input", () => {
    txtGale.textContent = `${inputGale.value} gale`
})

function ocultarLogin() {
    btnLiberar.style.display = 'none'
    labelLogin.style.display = 'none'
    emailEdit.style.display = 'none'
    passwordEdit.style.display = 'none'
    labelConfig.style.display = 'hidden'
    txtLoss.style.display = 'hidden'
    inputLoss.style.display = 'hidden'
    txtGale.style.display = 'hidden'
    inputGale.style.display = 'hidden'
    txtGain.style.display = 'hidden'
    inputGain.style.display = 'hidden'
    txtFicha.style.display = 'hidden'
    inputFicha.style.display = 'hidden'
    txtVoisins.style.display = 'hidden'
    inputVoisins.style.display = 'hidden'
    btnSalvar.style.display = 'hidden'
}

function ocultarConfig() {
    btnLiberar.style.display = 'hidden'
    labelLogin.style.display = 'hidden'
    emailEdit.style.display = 'hidden'
    passwordEdit.style.display = 'hidden'
    labelConfig.style.display = 'none'
    txtLoss.style.display = 'none'
    inputLoss.style.display = 'none'
    txtGale.style.display = 'none'
    inputGale.style.display = 'none'
    txtGain.style.display = 'none'
    inputGain.style.display = 'none'
    txtFicha.style.display = 'none'
    inputFicha.style.display = 'none'
    txtVoisins.style.display = 'none'
    inputVoisins.style.display = 'none'
    btnSalvar.style.display = 'none'
}

function salvarConfig() {
    var configuracao = {
        status: statusBot,
        voisins: inputVoisins.value,
        ficha: inputFicha.value,
        gain: inputGain.value,
        gale: inputGale.value,
        loss: inputLoss.value
    }
    chrome.storage.local.set({
        configuracao,
    }, () => {
    })
}

function carregarConfiguracao() {
    chrome.storage.local.get(["configuracao"], (res) => {

        if (res.configuracao == undefined) {
            var configuracao = {
                status: 0,
                voisins: 5,
                ficha: 1,
                gain: 5,
                loss: 1,
                gale: 1
            }
            chrome.storage.local.set({
                configuracao,
            }, () => {
            })

            ocultarConfig()
        } else {

            statusBot = res.configuracao.status
            txtVoisins.textContent = `Contra Vizinhos : sequencia ${res.configuracao.voisins}`

            if (res.configuracao.ficha == 1) {
                txtFicha.textContent = `Apostar com ficha R$ 0,50`
            } else if (res.configuracao.ficha == 2) {
                txtFicha.textContent = `Apostar com ficha R$ 1,00`
            } else if (res.configuracao.ficha == 3) {
                txtFicha.textContent = `Apostar com ficha R$ 2.50`
            } else if (res.configuracao.ficha == 4) {
                txtFicha.textContent = `Apostar com ficha R$ 5,00`
            } else if (res.configuracao.ficha == 5) {
                txtFicha.textContent = `Apostar com ficha R$ 20,00`
            } else if (res.configuracao.ficha == 6) {
                txtFicha.textContent = `Apostar com ficha R$ 25,00`
            } else if (res.configuracao.ficha == 7) {
                txtFicha.textContent = `Apostar com ficha R$ 50,00`
            } else if (res.configuracao.ficha == 8) {
                txtFicha.textContent = `Apostar com ficha R$ 100,00`
            } else if (res.configuracao.ficha == 9) {
                txtFicha.textContent = `Apostar com ficha R$ 125,00`
            } else if (res.configuracao.ficha == 10) {
                txtFicha.textContent = `Apostar com ficha R$ 500,00`
            } else if (res.configuracao.ficha == 11) {
                txtFicha.textContent = `Apostar com ficha R$ 2000,00`
            } else if (res.configuracao.ficha == 12) {
                txtFicha.textContent = `Apostar com ficha R$ 2500,00`
            } else if (res.configuracao.ficha == 13) {
                txtFicha.textContent = `Apostar com ficha R$ 5000,00`
            } else if (res.configuracao.ficha == 14) {
                txtFicha.textContent = `Apostar com ficha R$ 25000,00`
            }
            txtGain.textContent = `Stop Gain - ${res.configuracao.gain}`
            txtLoss.textContent = `Stop Loss - ${res.configuracao.loss}`
            txtGale.textContent = `${res.configuracao.gale} gale`
            

            inputVoisins.value = res.configuracao.voisins
            inputFicha.value = res.configuracao.ficha
            inputGain.value = res.configuracao.gain
            inputLoss.value = res.configuracao.loss
            inputGale.value = res.configuracao.gale

            if (statusBot == 0) {
                console.log('ocultar login')
                ocultarConfig()
            } else {
                console.log('ocultar config')
                ocultarLogin()
            }
        }
    })
}

function login() {
    if (emailEdit.value != undefined && emailEdit.value != '' &&
        passwordEdit.value != undefined && passwordEdit.value != '') {
        chrome.runtime.sendMessage({ comand: "login", email: emailEdit.value, password: passwordEdit.value }, (response) => {
            if (response.data == 'ok') {
                alert('Bot Auto Liberado')
                statusBot = 1
                salvarConfig()
            } else {
                alert('Usuário sem permisão')
            }
        })
    } else {
        alert('todos os campos devem ser preenchidos corretamente')
    }
}

carregarConfiguracao()


