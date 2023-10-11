<p align="center">
 <img src="https://user-images.githubusercontent.com/6892666/67032637-fc237200-f0e1-11e9-8a46-f5d655e71962.png"/>
</p>
<h1 align="center">DDDForum.com</h1>

<p align="center">
 <a href="https://circleci.com/gh/stemmlerjs/ddd-forum"><img src="https://circleci.com/gh/circleci/circleci-docs.svg?style=svg"></a>
 <a href="#contributors"><img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square"></a>
</p>

> A [SOLID](https://khalilstemmler.com/articles/solid-principles/solid-typescript/) hackernews-inspired forum site built with TypeScript using the [clean architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/) and [DDD best practices](https://khalilstemmler.com/articles/domain-driven-design-intro/).

![DDDForum](https://user-images.githubusercontent.com/6892666/67032446-9931db00-f0e1-11e9-894d-7bccd240c851.png)

**Testes Unitários**:

1. **Definição**:
   - Os testes unitários são testes que se concentram na verificação das unidades individuais do código, como funções ou métodos, isoladamente.
   - O principal objetivo dos testes unitários é garantir que cada parte do código (unidade) funcione corretamente e produza os resultados esperados.

2. **Características**:
   - São isolados: Cada teste unitário é executado independentemente, sem depender de outras partes do código.
   - Rápidos: Por serem isolados, os testes unitários são executados rapidamente.
   - Automatizados: Normalmente, os testes unitários são escritos em scripts e são executados automaticamente durante o desenvolvimento.

3. **Exemplo**:
   - O desenvolvimento de uma calculadora em Python e é desenvolvido uma função `add` para somar dois números. Um teste unitário para essa função seria:
   
     ```python
     def test_add():
         result = add(2, 3)
         assert result == 5
     ```

**Testes de Implementação**:

1. **Definição**:
   - Os testes de implementação, ou também conhecidos como testes de integração, testam o comportamento do sistema como um todo, verificando como que as diferentes partes se relacionam e funcionam juntas.
   - O objetivo principal dos testes de implementação é garantir que o sistema ou aplicação como um todo atenda aos requisitos e funcione corretamente em um ambiente integrado.

2. **Características**:
   - Não são isolados: Os testes de implementação envolvem a interação entre diferentes componentes do sistema.
   - Mais lentos: Devido à complexidade, esses testes tendem a ser mais demorados do que os testes unitários.
   - Podem ser manuais ou automatizados: Alguns testes de implementação podem ser executados manualmente, enquanto outros são automatizados, dependendo da complexidade do sistema.

3. **Exemplo**:
   - Suponhamos temos uma aplicação de vendas onlines que envolve a interação entre a base de dados, o servidor web e a interface que o utilizador interage. Um teste de implementação poderia ser:
   
     - Adicionar um item ao carrinho, prosseguir com o checkout e verificar se o pedido é registado corretamente na base de dados e se o cliente vê a confirmação na interface.

Em resumo, os testes unitários se concentram na verificação de unidades individuais de código, enquanto os testes de implementação verificam o comportamento do sistema como um todo, testando a integração entre as diferentes partes. Ambos os tipos de testes desempenham um papel importante na garantia da qualidade do software, e sua escolha depende dos requisitos específicos do projeto e das metas de teste.
<p>
Salientanndo que nenhum tipo de teste é melhor que o outro mas sim que cada um tem a sua importância e tarefas e que ambos são necessários para garantir a qualidade do software.
