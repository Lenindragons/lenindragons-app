# Projeto React com Firebase

Este é um exemplo de projeto React que utiliza Firebase para autenticação e armazenamento de dados. Este README irá guiá-lo através do processo de configuração.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Configuração do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
2. Em seu projeto do Firebase, ative o Firestore e qualquer outro serviço que você deseja usar (por exemplo, autenticação, armazenamento).
3. No console do Firebase, vá para as configurações do projeto e copie as configurações do SDK do Firebase para o seu projeto.

## Configuração do Projeto React

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/projeto-react-firebase.git
```
## Configuração do Firebase para Firestore e Autenticação com Gmail

1. Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.

2. No console do Firebase, ative o Firestore e a autenticação via Gmail:

   - No menu à esquerda, selecione "Firestore Database" e siga as instruções para ativar o Firestore.
   - Em seguida, no menu à esquerda, vá para "Authentication" e habilite a autenticação via Gmail.

3. Configuração do Firestore:

   - No console do Firebase, clique em "Firestore Database" no menu à esquerda.
   - Clique em "Criar banco de dados" e selecione o modo de teste ou produção, dependendo das suas necessidades.
   - Defina as regras de segurança do Firestore conforme necessário. Para começar, você pode usar as regras padrão.

4. Configuração da autenticação via Gmail:

   - No console do Firebase, vá para "Authentication" no menu à esquerda.
   - Selecione "Métodos de login" e ative o provedor de login do Google.
   - Siga as instruções para configurar o provedor de login do Google, especificamente para autenticação via Gmail.

