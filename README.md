# Lua & Linha 🌙🎣

**Descubra se hoje é um bom dia para pescar e o que levar na caixa de pesca.**

## 1. Sobre o projeto

Projeto acadêmico desenvolvido para a disciplina de **Integração Contínua** da UTFPR-DV, curso de Engenharia de Software.

O **Lua & Linha** é uma Single Page Application (SPA) de apoio à pesca amadora. A aplicação reúne, em um só lugar, informações que o pescador costuma buscar antes de sair: as condições do dia e o equipamento adequado para o peixe que pretende pescar.

## 2. Serviço proposto

### Problema que o serviço pretende resolver

Antes de uma pescaria, o pescador amador costuma consultar várias fontes diferentes: calendários lunares, previsões do tempo, vídeos e fóruns sobre iscas e equipamentos. Essas informações ficam espalhadas e nem sempre são fáceis de interpretar.

O Lua & Linha centraliza essas informações e as traduz em respostas diretas para duas perguntas:

- **Quando ir?** Uma previsão que indica se a data escolhida é favorável para a pesca.
- **O que levar?** Uma recomendação de equipamento de acordo com a espécie e o ambiente.

### Público-alvo

- Pescadores amadores e iniciantes que querem planejar melhor suas pescarias.
- Praticantes de pesca esportiva em rios, represas e pesque-pagues.
- Pessoas que pescam como lazer em família e não conhecem equipamentos e técnicas.

### Possibilidades de monetização

A interface já prevê os espaços destinados à monetização, identificados pelo componente `AdSlot`:

- **Banners publicitários**: espaço no topo de todas as páginas, no formato padrão _leaderboard_ (728×90), destinado a lojas de pesca e pesqueiros da região.
- **Conteúdo patrocinado**: cards em destaque nas páginas para pesqueiros e marcas parceiras.
- **Links de afiliado**: os equipamentos recomendados pelo guia poderão direcionar para lojas parceiras, com comissão sobre as vendas.
- **Destaque pago**: pesqueiros e lojas poderão pagar para aparecer com prioridade nas recomendações da sua cidade.

A monetização não está implementada; os espaços são marcados na interface para demonstrar o modelo de negócio.

## 3. Funcionalidades

### Disponíveis

- **Previsão pela fase da lua**: o usuário escolhe uma data e a aplicação mostra a fase da lua, o percentual de iluminação, uma avaliação para a pesca (boa, regular ou fraca) e uma dica.
- **Espaços de anúncio e conteúdo patrocinado** em todas as páginas.
- **Página de erro** para endereços inexistentes.

### Planejadas

- **Índice de pesca do dia**: nota de 0 a 10 combinando a fase da lua com dados de clima (pressão atmosférica, vento e temperatura) obtidos da API pública [Open-Meteo](https://open-meteo.com).
- **Guia de equipamentos**: o usuário escolhe a espécie e o ambiente (rio, represa ou mar) e recebe a recomendação de isca, linha, anzol e técnica.

## 4. Tecnologias utilizadas

**Frontend**

- React + Vite
- React Router (`HashRouter`)
- CSS puro

**Qualidade**

- ESLint

**Versionamento**

- Git
- [GitHub](https://github.com) — repositório, branches e Pull Requests

## 5. Arquitetura da aplicação

A aplicação é uma SPA sem backend: todo o código roda no navegador, e os dados são calculados localmente ou obtidos de arquivos e APIs públicas.

### Separação entre interface e lógica

Os componentes em `pages/` e `components/` cuidam apenas da exibição. As regras do serviço, como o cálculo da fase da lua, ficam em `lib/`, em funções puras que recebem uma entrada e devolvem um resultado. Essa separação permite testar a lógica de forma automatizada, sem depender da interface.

### Roteamento

A navegação utiliza o `HashRouter` do React Router, com endereços no formato `/#/previsao`. Essa escolha considera a hospedagem em serviços de arquivos estáticos, como o GitHub Pages: a parte do endereço após o `#` não é enviada ao servidor, que sempre entrega o `index.html`. Com isso, atualizar a página ou acessar um endereço diretamente funciona sem configuração adicional no servidor.

## 6. Estratégia de branches e versionamento

### GitHub Flow

O projeto segue o **GitHub Flow**, escolhido por ser simples e adequado a um fluxo de entrega contínua:

- A branch `main` contém sempre uma versão estável, pronta para ser publicada.
- Cada mudança é desenvolvida em uma branch própria, criada a partir da `main`.
- A mudança entra na `main` por meio de um **Pull Request**, que registra o que foi alterado e como testar.
- O merge é feito com **merge commit**, preservando os commits individuais e marcando no histórico a entrada de cada Pull Request.
- Após o merge, a branch é removida.

```
main ──●──────────────────●──────────────●──
        \                / (merge do PR)
         feature/...   ●──●──●
```

### Proteção da branch principal

A branch `main` é protegida por uma regra (_ruleset_) no GitHub, que:

- exige Pull Request para qualquer alteração;
- bloqueia _force push_, impedindo a reescrita do histórico;
- impede a exclusão da branch.

### Padrão de commits

As mensagens de commit seguem o padrão [Conventional Commits](https://www.conventionalcommits.org), em inglês. O tipo no início da mensagem indica a natureza da mudança.

## 7. Como executar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org) 22 ou superior e Git.

```bash
git clone https://github.com/MuriloDalMolim/lua-e-linha.git
cd lua-e-linha
npm install
npm run dev
```

A aplicação ficará disponível no endereço exibido no terminal (por padrão, `http://localhost:5173`).
