import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

  const [carrinho, setCarrinho] = useState([]);

  function adicionarProduto(novoProduto) {
    const produtoExisteNoCarrinho = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id);
    if (!produtoExisteNoCarrinho) {
      novoProduto.quantidade = 1;
      setCarrinho((carrinhoAnterior) => [...carrinhoAnterior, novoProduto]);
      return;
    };
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id) itemDoCarrinho.quantidade++;
        return itemDoCarrinho;
      }));
  };

  function removerUmProduto(id) {
    setCarrinho((carrinhoAnterior) => {
      const produtoExistente = carrinhoAnterior.find(produto => produto.id === id);
      if (!produtoExistente) return carrinhoAnterior;
      if (produtoExistente.quantidade === 1) {
        return carrinhoAnterior.filter(produto => produto.id != id);
      } else {
        return carrinhoAnterior.map(produto => {
          if (produto.id === id) {
            return { ...produto, quantidade: produto.quantidade - 1 }
          };
          return produto;
        });
      };
    });
  };

  function removerDoCarrinho(id) {
    setCarrinho((carrinhoAnterior => {
      return carrinhoAnterior.filter(produto => produto.id != id);
    }));
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, adicionarProduto, removerUmProduto, removerDoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
