<div align="center">

  <img src="https://www.frontendmentor.io/static/images/logo-mobile.svg" alt="frontendmentor" width="80">

  <h2 align="center">Solução da aplicação calculadora de gorjetas</h2>
  <p align="center">
    <a href="https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX">
      <strong>Desafio do Frontend Mentor</strong>
    </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/alberto-rj/tip-calculator">Mudar para Inglês 🇺🇸</a>
    <br />
    <br />
    <a href="https://alberto-rj.github.io/tip-calculator">Visualizar o Aplicativo</a>
    &nbsp;&nbsp;
    <a href="https://github.com/alberto-rj/tip-calculator/issues">Relatar Problema</a>
    &nbsp;&nbsp;
    <a href="https://github.com/alberto-rj/tip-calculator/issues">Sugerir Funcionalidade</a>
  </p>
</div>

<!-- Badges -->
<div align="center">
  <!-- Profiles -->
  <a href="https://www.frontendmentor.io/profile/alberto-rj">
    <img src="https://img.shields.io/badge/Perfil-Alberto Raúl José-fefefe?style=for-the-badge&logo=frontendmentor" alt="Alberto Raúl José's Profile">
  </a> &nbsp;&nbsp;&nbsp;

  <!-- Status -->
  <a href="#">
    <img src="https://img.shields.io/badge/Estado-Concluído-00CE80?style=for-the-badge" alt="Estado conclúido">
  </a> &nbsp;&nbsp;&nbsp;

  <!-- Difficulty -->
  <a href="https://www.frontendmentor.io/challenges?difficulties=1"  >
    <img src="https://img.shields.io/badge/Dificuldade-Junior-AAC745?style=for-the-badge&logo=frontendmentor" alt="Challenge Difficulty - Junior">
  </a>

</div>
<br />

![Desktop demo](./demo/demo-desktop.gif)

<br />
<br />

## Índice

1. [Introdução](#introdução)
2. [Principais funcionalidades](#principais-funcionalidades)
3. [Meu papel no projeto](#meu-papel-no-projeto)
4. [Propósito e Objetivo](#propósito-e-objetivo)
5. [Destaque](#destaque)
6. [Capturas de tela](#capturas-de-tela)
7. [Como Rodar o Projeto Localmente](#como-rodar-o-projeto-localmente)
8. [Meu processo](#meu-processo)
   - [Planejamento](#planejamento)
   - [Arquitetura do código](#arquitetura-do-código)
   - [Desafios enfrentados](#desafios-enfrentados)
9. [Aprendizados](#aprendizados)
10. [Tecnologias usadas](#tecnologias-usadas)
11. [Autor](#autor)
12. [Agradecimentos](#agradecimentos)

<br />
<br />

## Introdução

Este projeto é uma aplicação de cálculo de gorjetas que permite aos usuários calcular facilmente o valor da gorjeta e o custo total da conta por pessoa. O design e o desafio foram propostos pelo Frontend Mentor, com o objetivo de criar uma interface responsiva que se adapta a diferentes tamanhos de tela.

<br />
<br />

## Principais funcionalidades

- Cálculo automático de gorjetas baseado em porcentagens pré-definidas ou personalizadas.
- Entrada de dados em tempo real, com feedback visual instantâneo.
- Validação de entradas para garantir dados válidos.
- Design responsivo e acessível.

<br />
<br />

## Meu papel no projeto

Neste projeto, eu fui responsável por toda a implementação, desde o desenvolvimento do front-end até a lógica de cálculo em JavaScript.

<br />
<br />

## Propósito e Objetivo

O propósito deste projeto é proporcionar uma ferramenta prática para ajudar os usuários a calcular gorjetas de forma rápida e eficiente. A aplicação visa simplificar o processo de divisão de contas em situações de grupos, como em jantares ou refeições em conjunto.

<br />
<br />

## Destaque

O recurso principal deste projeto é a capacidade de calcular automaticamente a gorjeta e o custo total da conta com base nas entradas do usuário. A lógica de cálculo é implementada em JavaScript, garantindo resultados precisos e atualizações em tempo real à medida que o usuário interage com os campos de entrada.

<br />

## Capturas de tela

<details>
<br>
<summary><strong>Mobile</strong></summary>
<img src="demo/demo-mobile.png" alt="Mobile demo">
</details>

<details>
<br>
<summary><strong>Tablet</strong></summary>
<img src="demo/demo-tablet.png" alt="Mobile demo">
</details>
<br />
<br />

## Como Rodar o Projeto Localmente

Para rodar este projeto localmente em sua máquina, siga os passos abaixo:

1. Clone o Repositório:

  ```bash
  git clone https://github.com/alberto-rj/tip-calculator/
  ```

2. Navegue até o Diretório do Projeto:

  ```bash
  cd tip-calculator
  ```

3. Abra o arquivo `index.html` em seu navegador: Você pode abrir o arquivo diretamente no navegador ou usar um servidor local como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) se estiver usando o [Visual Studio Code](https://code.visualstudio.com/).

4. Interaja com o aplicativo: O aplicativo está pronto para uso! Basta inserir os valores desejados nos campos e calcular as gorjetas.

<br />
<br />

## Meu processo

Para desenvolver esta aplicação, segui um processo estruturado.

<br />

### Planejamento

Compreendi as exigências do desafio e elaborei um esboço inicial da interface.

<br />

### Arquitetura do código

O projeto foi estruturado usando HTML, CSS e JavaScript, com ênfase em boas práticas de acessibilidade e usabilidade.

<br />

### Desafios enfrentados

<br />

#### 1. Validação Acessível

- **Problema:** O aplicativo deve permanecer acessível durante a validação das entradas dos usuários.
- **Solução:**
  - Implementação de validações acessíveis.
  - Mensagens de erro claras e informativas.
  - Testes realizados em diferentes dispositivos para garantir uma experiência inclusiva.

<br />

#### 2. Feedback Visual Interativo

- **Problema:** Necessidade de implementar estados de hover e foco para todos os elementos interativos na página.
- **Solução:**
  - Utilização das pseudoclasses CSS `:hover` e `:focus-visible`.
  - Garantia de feedback visual consistente em botões e campos.
  - Melhoria da usabilidade e acessibilidade da aplicação.

<br />

#### 3. Responsividade do Layout

- **Problema:** O layout deve ser otimizado para diferentes tamanhos de tela.
- **Solução:**
  - Implementação de media queries para ajustar o layout.
  - Uso de unidades relativas (como `%`, e `rem`) para garantir escalabilidade.
  - Aplicação de Flexbox e CSS Grid para criar um layout flexível e adaptável.
  - Testes realizados em vários dispositivos para garantir uma visualização adequada.

<br />

#### 4. Cálculo Preciso de Gorjetas

- **Problema:** O aplicativo deve calcular corretamente a gorjeta e o custo total por pessoa.
- **Solução:**
  - Implementação de funções de cálculo precisas em JavaScript.
  - Garantia de que os resultados são exibidos de forma clara e compreensível.

<br />

### Aprendizados

- **Acessibilidade:**
  - Aprendi a implementar validações e mensagens de erro acessíveis, garantindo que todos os usuários consigam interagir com a aplicação, independentemente de suas habilidades.

- **Feedback Visual:**
  - Compreendi a importância de estados de hover e foco para melhorar a usabilidade e a acessibilidade, proporcionando uma melhor experiência ao usuário.

- **Design Responsivo:**
  - Desenvolvi habilidades em CSS, utilizando unidades relativas, flexbox e CSS Grid para garantir que o layout se adapte a diferentes tamanhos de tela.

- **Testes:**
  - Valorizei a importância de testar a aplicação em diferentes dispositivos e contextos para identificar e corrigir problemas de usabilidade.

- **Aprimoramento Contínuo:**
  - Aprendi que sempre há espaço para melhorias e que cada desafio enfrentado é uma oportunidade de aprendizado.

<br />
<br />

## Tecnologias usadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) &nbsp;&nbsp;
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) &nbsp;&nbsp;
![SASS](https://img.shields.io/badge/sass-%231572B6.svg?style=for-the-badge&logo=sass&logoColor=white) &nbsp;&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) &nbsp;&nbsp;
![Google](https://img.shields.io/badge/google-DA4437?style=for-the-badge&logo=google&logoColor=white) &nbsp;&nbsp;
![Visual Studio Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) &nbsp;&nbsp;
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

<br />
<br />

## Autor

- GitHub - [@alberto-rj](https://www.github.com/alberto-rj)
- Frontend Mentor - [@alberto-rj](https://www.frontendmentor.io/profile/alberto-rj)
- Twitter - [@albertorauljose](https://www.twitter.com/albertorauljose)

<br />
<br />

## Agradecimentos

Desafio fornecido pelo [Frontend Mentor](https://www.frontendmentor.io).
