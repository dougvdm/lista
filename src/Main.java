// precisei importar essas bibliotecas para testar o código junto com o arquivo txt

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import encadeada.ListaLigada;

public class Main{
    public static void main(String[] args){
        ListaLigada lista = new ListaLigada();
        String path = "C:\\Users\\dougl\\OneDrive\\Desktop\\java\\lista\\src\\arquivo2.txt";
        
        try {
            //lendo o arquivo
            BufferedReader reader = new BufferedReader(new FileReader(path));
            String linha;
            int contagemLinhas = 1;
            System.out.println("Arquivo sendo Lido");
            while ((linha = reader.readLine()) != null) {
                if (contagemLinhas == 1) { 
                    String[] valores = linha.split(" ");
                    System.out.println("Lista sem alterações: ");
                    for(String valor1 : valores){
                        System.out.print(valor1 + ",");
                        
                    }
                    System.out.println();

                    for (String valor : valores) {
                        if(!valor.isEmpty()){
                            lista.adicionar(Integer.parseInt(valor)); 
                        }
                    }
                } else if (contagemLinhas > 1) { 
                    String[] partes = linha.split(" ");
                    char acao = partes[0].charAt(0);
                    if (acao == 'P') {
                        System.out.println("Operação: " + linha);
                        lista.print();
                    } else if (acao == 'A') {
                        System.out.println("Operação: " + linha);
                        int numero = Integer.parseInt(partes[1]);
                        int posicao = Integer.parseInt(partes[2]);
                        lista.inserePosicao(numero, posicao); 
                    } else if (acao == 'R'){
                        System.out.println("Operação: " + linha);
                        int posicao = Integer.parseInt(partes[1]);
                        lista.remove(posicao); 
                    }                       
                }
                contagemLinhas++;
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }
}