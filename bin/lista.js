
const fs = require('fs');
const readline = require('readline');

// Definindo a Classe para os Nós
class No {
    constructor(valor) {
        // variaveis com _ para não conflitar.
        this.valor_ = valor;
        this.proximo_ = null;
    }

    // Definindo os gets e sets

    get valor() {
        return this.valor_;
    }

    set valor(novoValor) {
        this.valor_ = novoValor;
    }

    get proximo() {
        return this.proximo_;
    }

    set proximo(novoProximo) {
        this.proximo_ = novoProximo;
    }
}

// Definindo a Classe para a Lista Ligada

class Lista {
    constructor() {
        this.cabeca = null;
    }

    // Metodo para inserir elementos no fim da lista

    inserirFim(valor) {
        let novoNo = new No(valor);
        if (this.cabeca === null) {
            this.cabeca = novoNo;
        } else {
            let atual = this.cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
    }

    // Metodo para inserir elementos no indice especificado

    inserirIndice(valor, indice) {
        let novoNo = new No(valor);

        if (indice === 0) {
            novoNo.proximo = this.cabeca;
            this.cabeca = novoNo;
            return;
        }

        let atual = this.cabeca;
        let contador = 0;

        while (atual !== null) {
            if (contador === indice - 1) {
                novoNo.proximo = atual.proximo;
                atual.proximo = novoNo;
                return;
            }
            atual = atual.proximo;
            contador++;
        }

        console.log("Índice fora dos limites.");
    }

    // Metodo para remover valores especificos

    remover(valor) {
        if (this.cabeca === null) {
            return;
        }

        if (this.cabeca.valor === valor) {
            this.cabeca = this.cabeca.proximo;
            return;
        }

        let anterior = this.cabeca;
        let atual = this.cabeca.proximo;

        while (atual !== null) {
            if (atual.valor === valor) {
                anterior.proximo = atual.proximo;
                return;
            }
            anterior = atual;
            atual = atual.proximo;
        }
    }

    // Metodo para imprimir toda a lista
    imprimir() {
        let atual = this.cabeca;
        let valores = [];
        while (atual !== null) {
            valores.push(atual.valor); // Adiciona cada valor ao array
            atual = atual.proximo;
        }
        console.log(valores.join(", ")); // Exibe os valores na horizontal
    }


}
// função para ler os arquivos txt e modificar a lista de acordo com as operações.
function lerArquivo(path, lista) {
    
    // criando a interface para leitura
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    });

    let primeiraLinha = true;
    
    //confirmação para a leitura do arquivo
    console.log('Arquivo sendo lido');

    //leitura do arquivo
    rl.on('line', (linha) => {
        // para a primeira linha como não tem uma ação especificada, o codigo salva em um array
        // todos os numeros e adiciona 1 por 1 na lista.
        console.log('Nova linha lida:');
        if (primeiraLinha) {
            console.log('Primeira linha do arquivo');

            var numeros = [];

            numeros = linha.trim().split(' ').map(Number);
            console.log('Números sendo adicionados:', numeros);

            // Adiciona os números à lista
            for (let numero of numeros) {
                lista.inserirFim(numero);
            }

            // primeira linha false, o codigo verifica se tem operações demarcadas nas linhas
            primeiraLinha = false;
        } 
        else {

            // salvando as operações linha por linha em arrays e separando em array
            // operacao é toda a linha separada em array
            // comando é a String de operação. ex: A, P e R
            // em args é guardado o valor do No e se tiver na linha o Indice.

            console.log('Operação:', linha);
            const operacao = linha.trim().split(' ');
            const comando = operacao[0];
            const args = operacao.slice(1);

            // Executa as operações especificas na lista
            if (comando === 'P') {
                lista.imprimir();
            } else if (comando === 'A') {

                // args[0] vai puxar o valor do No no array args
                // args[1] vai puxar o indice no No no array args

                const valor = parseInt(args[0]);
                const indice = parseInt(args[1]);
                lista.inserirIndice(valor, indice);
            } else if (comando === 'R') {
                const valor = parseInt(args[0]);
                lista.remover(valor);
            }
        }
    });

    // fechando a interface de leitura do arquivo

    rl.on('close', () => {
        console.log('Fim da leitura do arquivo');
    });
}
    
const lista = new Lista();

lerArquivo("src\\arq-novo.txt", lista);

lista.imprimir();
