class Despesa{

    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id == null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {

        let id = this.getProximoId()

        localStorage.setItem('id', id)
        
        localStorage.setItem(id, JSON.stringify(d))
    }

    recuperarTodosRegistros() {

        let despesas = Array()

        let id = localStorage.getItem('id')

        // recuperar todas as despesas e, localStorage
        for(let i = 1; i <= id; i++){

            // recuperar a despesa, tranforma de json para objeto
            let despesa = JSON.parse(localStorage.getItem(i))

            // verifica se há algum item com valor null ou caso tenha sido removido
            if(despesa == null){
                continue
            }

            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)

        }

        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)

        }

        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)

        }

        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        }

        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        }

        return
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else{
        console.log('Dados invalidos')
    }
}

function gravar(d) {
    localStorage.setItem('despesa', JSON.stringify(d))
}



// CONSULTA


function carregaListaDespeza() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d) {
        console.log(d)

        // criando uma linha para cada elemento do array
        let linha = listaDespesas.insertRow()

        // criar coluna
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
            break

            case '2': d.tipo = 'Educação'
            break

            case '3': d.tipo = 'Lazer'
            break

            case '4': d.tipo = 'Saúde'
            break

            case '5': d.tipo = 'Transpoorte'
            break
        }
        
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao)

    let despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(d) {
        console.log(d)

        // criando uma linha para cada elemento do array
        let linha = listaDespesas.insertRow()

        // criar coluna
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
            break

            case '2': d.tipo = 'Educação'
            break

            case '3': d.tipo = 'Lazer'
            break

            case '4': d.tipo = 'Saúde'
            break

            case '5': d.tipo = 'Transpoorte'
            break
        }
        
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}