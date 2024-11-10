package encadeada;

public class ListaLigada{

    private No cabeca;

    public ListaLigada(){
        cabeca = null;
    }

    // metodo para imprimir a lista inteira
    public void print(){
        No n = cabeca;
        while(n != null){
            System.out.println(n.getValor());
            n = n.getProximo();
        }
    }

    // metodo para adicionar os Nos no fim da lista
    public void adicionar(int valor){
        No n = new No(valor);

        if (cabeca == null){
            cabeca = n;
            return;
        }

        No ultimo = cabeca;

        while(ultimo.getProximo() != null){
            ultimo = ultimo.getProximo();
        }

        ultimo.setProximo(n);
    }


    // Metodo para adicionar o No em indice especificado
    public void inserePosicao (int valor, int indice){
        No n = new No(valor);
        No memoria = this.cabeca;
        int cont = 0;
        if (indice == 0){
            n.setProximo(this.cabeca);
            this.cabeca = n;
            return;
        }
        while(memoria.getProximo()!= null){
            if(cont == indice -1){
                n.setProximo(memoria.getProximo());
                memoria.setProximo(n);
                break;
            }
            else{
                cont++;
                memoria = memoria.getProximo();
            }
        }
    }


    // Metodo para remover Nos com valor especifico
    public void remove (int valor) {
        No n = this.cabeca;
        No anterior = null;
        while (n!=null){
            if(n.getValor() == valor){
                anterior.setProximo(n.getProximo());
                return;
            }
            else{
                anterior = n;
                n = n.getProximo();
            }
        }
    }

}