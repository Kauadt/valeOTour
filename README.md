# ValeOTour

**ValeOTour** é uma plataforma desenvolvida como Trabalho de Conclusão de Curso (TCC) com o objetivo de fomentar o turismo na região do Vale do Ribeira, SP. O sistema integra informações turísticas, permite o agendamento de guias locais e promove a valorização da cultura regional.

## 🎯 Objetivo

Facilitar o acesso de turistas a pontos turísticos, conectando-os com guias locais e promovendo o turismo sustentável nas cidades do Vale do Ribeira, por meio de um sistema centralizado e acessível.

---

## 🌐 Tecnologias Utilizadas

### 🔙 Back-End

- **PHP**: API RESTful para comunicação com banco de dados
- **MySQL**: Banco de dados relacional

### 📱 Aplicativo Mobile

- **React Native**: Framework para desenvolvimento mobile multiplataforma
- **Expo**: Ferramenta para build e testes no ambiente React Native
- **PHP**: Consumo da API para listagens dinâmicas e interações com o banco de dados (como agendamentos, exibição de guias, pontos turísticos etc.)

### 💻 Aplicativo Desktop

- **C# com Windows Forms**: Aplicativo voltado à gestão dos dados da plataforma, utilizando .NET Framework
- **API**: Consumo da API para listagens dinâmicas e interações com o banco de dados (como agendamentos, exibição de guias, pontos turísticos etc.)

### 🌍 Website (Landing Page)

- **HTML5**: Estrutura da página
- **CSS3**: Estilização responsiva
- **JavaScript**: Funcionalidades de interação
- **PHP**: Consumo da API para listagens dinâmicas e interações com o banco de dados (como agendamentos, exibição de guias, pontos turísticos etc.)


---

## 🚀 Como Executar

### 🔧 Backend

1. Importe o banco de dados MySQL (veja detalhes no PDF).
2. Configure `conexao.php` com suas credenciais.
3. Coloque a pasta `ValeOTour/` que está dentro diretório `API/` em um servidor local (XAMPP/WAMP/etc.).
4. Acesse via `http://localhost/API/valeOTour/`.

### 📱 Mobile

1. Instale Node.js e Expo CLI.
2. Acesse a pasta do app mobile.
3. Rode `npm install` e depois `npx expo start`.

### 💻 Desktop

1. Abra o projeto no Visual Studio.
2. Compile e execute (F5).

### 🌍 Website

1. Coloque a pasta `webValeotour/` em um servidor local.
2. Acesse via `http://localhost/webValeotour/index.php`.
3. O site consome dados diretamente da API em PHP para exibir pontos turísticos, agendamentos, informações de guias e mais.

---

## 🔧 Funcionalidades

- Listagem de pontos turísticos por eixo temático
- Agendamento com guias turísticos
- Chat entre usuários e guias
- Avaliações e comentários
- Painel administrativo (desktop)
- Aplicativo mobile para turistas
- Website institucional com consumo de API em PHP

---


## 👥 Equipe de Desenvolvimento

Projeto desenvolvido por alunos da ETEC de Registro – Curso Técnico em Desenvolvimento de Sistemas:

- Kauã Davis Tavares
- Maria Eduarda Assunção Pontes
- Renan Zanetti Oliveira
- Tiemi Carravieri Morishita

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT.

---
