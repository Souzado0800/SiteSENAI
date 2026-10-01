# 🤠 Red Dead Redemption 2 — Experiência Digital Cinematográfica

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/Souzado0800/SiteSENAI?color=b61d1d&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Souzado0800/SiteSENAI?color=b61d1d&style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Um hotsite imersivo, responsivo e interativo inspirado no aclamado universo de *Red Dead Redemption 2* da Rockstar Games.**

[Visão Geral](#-visão-geral) • [Funcionalidades](#-funcionalidades-principais) • [Páginas do Projeto](#-páginas-do-projeto) • [Estrutura](#-estrutura-de-arquivos) • [Como Executar](#-como-executar-o-projeto) • [Tecnologias](#-tecnologias-utilizadas) • [Licença & Créditos](#-créditos-e-aviso-legal)

</div>

---

## 📖 Visão Geral

Este projeto é um **estudo aprofundado de design editorial, desenvolvimento front-end moderno e experiência do usuário (UI/UX)**, desenvolvido como projeto acadêmico no **SENAI**.

A aplicação recria a atmosfera crua, épica e detalhista da fronteira americana de **1899**, combinando tipografia clássica do Velho Oeste, efeitos visuais avançados, áudio visual imersivo, compêndio da vida selvagem, simulação de compra e uma área temática de entretenimento (*Mural Zueira*).

---

## ✨ Funcionalidades Principais

### 🎬 1. Hotsite Principal (`index.html`)
- **Hero Cinematográfico**: Efeito de iluminação solar dinâmica, tipografia monumental, microinterações com botões magnéticos e parallax suave ao rolar a página.
- **Narrativa Interativa**: Seção histórica com diagramação editorial de jornal de época (*section-paper*) e citações destacadas.
- **Galeria de Personagens da Gangue**: Navegador dinâmico entre os membros principais da gangue Van der Linde (*Arthur Morgan, Dutch van der Linde, John Marston, Sadie Adler, Hosea Matthews*) com transições fluidas e detalhes de biografia.
- **Ecossistemas e Panorama Selvagem**: Painéis panorâmicos de Roanoke Ridge e The Grizzlies com métricas do ecossistema.
- **Compêndio da Fauna Interativo**:
  - Catálogo com **10 espécies de animais em alta resolução**.
  - **Filtros por categoria**: *Predadores Alfa*, *Herbívoros & Montarias*, *Aves & Rapinas*, *Pântano & Rios*.
  - Tags temáticas exclusivas (*Lendário*, *Predador de Alcateia*, *Emboscada Mortal*, *Veneno do Deserto*).
  - Nomes científicos em latim, biomas e fichas descritivas.
- **Galeria de Fotos & Lightbox Unificado**: Mosaico editorial com visualização em tela cheia (lightbox) com suporte a navegação por teclado (`←` e `→`) e toque.
- **Modal de Trailer Oficial**: Player do YouTube embutido de alta performance com controle automático de reprodução e fechamento rápido (`ESC` / clique externo).

### 🛒 2. Página de Compra & Checkout (`buy.html` / `comprar.html`)
- **Seleção de Edições**: Alternância em tempo real entre *Edição Padrão*, *Edição Especial* e *Edição Definitiva (Ultimate)* com atualização dinâmica de itens inclusos e valores.
- **Seleção de Plataformas**: Suporte a *PC (Rockstar Launcher / Steam)*, *PlayStation 4/5* e *Xbox Series X|S / One*.
- **Cálculo de Preço Dinâmico**: Totalizador automático do pedido baseado nas opções selecionadas.
- **Cadastro de Newsletter / Descontos**: Formulário front-end integrado com feedback visual temático de confirmação.
- **Cursor e Microinterações**: Suporte a estados de hover personalizados e cursores estilizados.

### 🤠 3. Mural dos Mais Procurados — Meme Edition (`fun.html`)
- **Cartazes de Procurado Estilizados**: Área de humor com memes clássicos da comunidade RDR2 formatados como pôsteres autênticos de recompensa do Velho Oeste (*Wanted Dead or Alive*).
- **Efeitos de Papel Envelhecido**: Texturas retrô, selos de recompensa em dólares e tipografia temática *Rye* e *Special Elite*.

---

## 📂 Páginas do Projeto

| Página | Arquivo | Descrição |
| :--- | :--- | :--- |
| **Hotsite Principal** | [`index.html`](index.html) | Página principal com história, personagens, biomas, compêndio e trailer. |
| **Página de Compra** | [`buy.html`](buy.html) / [`comprar.html`](comprar.html) | Tela dedicada de compra com seleção de edições, plataformas e newsletter. |
| **Mural Zueira** | [`fun.html`](fun.html) | Mural descontraído com cartazes de procurado e memes temáticos. |

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com foco em **performance, leveza e fidelidade estética**, sem dependência de bibliotecas ou frameworks externos pesados:

- **HTML5 Semântico**: Estruturação acessível com tags `<main>`, `<section>`, `<article>`, `<nav>`, `<figure>` e atributos ARIA completos.
- **CSS3 Moderno**:
  - *CSS Custom Properties* (Variáveis de cores, fontes, transições).
  - *CSS Grid Layout* & *Flexbox* para composições editoriais responsivas.
  - Efeitos de textura com ruído SVG (*grain noise*), gradientes radiais e máscaras.
  - Media queries otimizadas para Ultra-Wide (4K), Desktops, Tablets e Smartphones.
  - Respeito à diretiva `@media (prefers-reduced-motion)` para acessibilidade.
- **JavaScript Vanilla (ES6+)**:
  - `IntersectionObserver` para animações fluidas de surgimento (*reveal*).
  - `requestAnimationFrame` para otimização de scroll e efeito parallax.
  - `requestIdleCallback` para pré-carregamento inteligente de imagens em alta resolução.
  - Cursor magnético personalizado para ponteiros finos (*mouse*).
- **Google Fonts**:
  - [`Antonio`](https://fonts.google.com/specimen/Antonio) (Títulos e displays monumentais).
  - [`DM Sans`](https://fonts.google.com/specimen/DM+Sans) (Corpo de texto e leitura confortável).
  - [`Special Elite`](https://fonts.google.com/specimen/Special+Elite) (Notas de máquina de escrever e etiquetas de época).
  - [`Rye`](https://fonts.google.com/specimen/Rye) (Tipografia Western para cartazes).

---

## 📁 Estrutura de Arquivos

```text
SiteRDR2/
├── index.html            # Hotsite principal do jogo
├── buy.html              # Página dedicada de compra / checkout
├── comprar.html          # Espelho em português da página de compra
├── fun.html              # Mural Zueira (Edição de Memes dos Mais Procurados)
├── style.css             # Folha de estilos central e regras responsivas
├── script.js             # Lógica interativa, filtros, lightbox e carrossel
├── README.md             # Documentação oficial do projeto
├── img/                  # Imagens dos personagens locais
│   ├── hosea.jpg
│   └── sadie.jpg
└── imgs/                 # Diretório de mídias em alta resolução
    ├── wildlife/         # Compêndio com os 10 animais da fauna
    │   ├── aguia.jpg
    │   ├── cavalo.jpg
    │   ├── cavalopreto.jpg
    │   ├── cervo.jpg
    │   ├── jacare.jpg
    │   ├── lagarto.jpg
    │   ├── lobo.jpg
    │   ├── peixe.jpg
    │   ├── urso.jpg
    │   └── urubu.jpg
    └── memes/            # Cartazes e artes do Mural de Zueira
        ├── meme1.jpg
        ├── meme2.jpg
        ├── meme3.jpg
        └── meme4.jpg
```

---

## 🚀 Como Executar o Projeto

Você não precisa instalar nenhum gerenciador de pacotes ou compilador para rodar o site!

### Opção 1: Abrir diretamente no navegador
1. Clone o repositório ou baixe o arquivo ZIP:
   ```bash
   git clone https://github.com/Souzado0800/SiteSENAI.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd SiteSENAI
   ```
3. Dê um duplo clique no arquivo `index.html` para abrir em qualquer navegador moderno (Chrome, Edge, Firefox, Safari, Brave, Opera).

### Opção 2: Usando o VS Code + Live Server (Recomendado)
1. Abra a pasta do projeto no **Visual Studio Code**.
2. Instale a extensão **Live Server** (de Ritwick Dey).
3. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente no endereço `http://127.0.0.1:5500`.

---

## ♿ Acessibilidade & Boas Práticas

- **Navegação por Teclado**: Todo o site pode ser navegado via tecla `Tab`, com suporte a fechamento de modais via `Escape` e controle de galerias via `ArrowLeft` / `ArrowRight`.
- **Textos Alternativos (`alt`)**: Todas as imagens possuem descrições detalhadas para leitores de tela.
- **Movimento Reduzido**: Respeito às preferências do sistema operacional do usuário com desativação de animações intrusivas quando configurado.
- **Responsividade Total**: Layout fluido adaptado para telas de 320px até resoluções 4K (3840px).

---

## ⚖️ Créditos e Aviso Legal

> **Nota de Isenção de Responsabilidade:**
> Este projeto é uma **obra conceitual sem fins lucrativos**, desenvolvida exclusivamente para **fins educacionais e de estudo de design / programação front-end**.
> 
> Todos os direitos intelectuais, marcas, logos, personagens e artes originais pertencem à [Rockstar Games](https://www.rockstargames.com/) e [Take-Two Interactive](https://www.take2games.com/).

---

<div align="center">
  <sub>Desenvolvido com dedicação por <strong>Souza</strong> no curso <strong>SENAI</strong>. América, 1899. 🌲🐎</sub>
</div>
