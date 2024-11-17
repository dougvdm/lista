class No:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.cabeca = None

    def adicionar(self, dado, posicao):
        # Adiciona um nó com dado na posição especificada
        novo_no = No(dado)
        if posicao == 0:
            novo_no.proximo = self.cabeca
            self.cabeca = novo_no
            return

        # Percorrendo a lista para encontrar a posição válida
        atual = self.cabeca
        contador = 0

        while atual and contador < posicao - 1:
            atual = atual.proximo
            contador += 1

        # Verifica se a posição é válida (se 'atual' existe e está no índice correto)
        if atual is None:
            return

        # Inserção do novo nó na posição especificada
        novo_no.proximo = atual.proximo
        atual.proximo = novo_no

    def remover(self, dado):
    # Remove o primeiro nó encontrado com o valor dado
        atual = self.cabeca
        anterior = None

        while atual:
            if atual.dado == dado:
                if anterior:
                    anterior.proximo = atual.proximo
                else:
                    self.cabeca = atual.proximo

                # Remove referências ao nó
                atual.proximo = None  # Remove referência ao próximo nó
                atual.dado = None  # Remove o dado do nó
                return  # Sai após remover o nó encontrado
            anterior = atual
            atual = atual.proximo


    def exibir(self):
        #Exibe a lista encadeada
        elementos = []
        atual = self.cabeca
        while atual:
            elementos.append(atual.dado)
            atual = atual.proximo
        print("Lista: ", elementos)

def main():
    # Lendo o arquivo
    with open("src/arq-novo.txt") as arquivo:
        # Leitura da lista inicial
        valores_iniciais = list(map(int, arquivo.readline().split()))
        
        # Criando a lista encadeada e adicionando os elementos iniciais
        lista_encadeada = ListaEncadeada()
        for i, valor in enumerate(valores_iniciais):
            lista_encadeada.adicionar(valor, i)

        # Leitura do número de ações
        num_acoes = int(arquivo.readline().strip())

        # Executando as ações
        for _ in range(num_acoes):
            linha_acao = arquivo.readline().strip().split()
            tipo_acao = linha_acao[0]
            
            if tipo_acao == 'A':
                numero = int(linha_acao[1])
                posicao = int(linha_acao[2])
                lista_encadeada.adicionar(numero, posicao)
            elif tipo_acao == 'R':
                numero = int(linha_acao[1])
                lista_encadeada.remover(numero)
            elif tipo_acao == 'P':
                lista_encadeada.exibir()
main()