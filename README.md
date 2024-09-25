# Portfólio de Artista
Um portfólio online para exposição de trabalhos de um artista.

## Membros da equipe
Francisco Anderson Silva Lima, 538917, Design Digital
Letícia Maciel Silva, 535833, Design Digital

## O que vai ser
- Plataforma de Portfólio/Galeria digitais de um artista.

## Domínio da aplicação
- Site de exposição de trabalhos artísticos

## Como acessar?
No terminal, siga os seguintes passos:
- backend
```
cd backend
npm install
npm run dev
```
- frontend
```
cd frontend
npm install
npm run dev
```

- dados dos usuários
```
username: brunoadm
password: Bruno1234& 
(administrador)
```
```
username: brunouser
password: Bruno1234& 
(usuário comum)
```



## Papeis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador
- Entidades ou tabelas do sistema
- Usuário
- Trabalhos
- Comentário
- Curtida
- Salvar

## Entidades ou tabelas do sistema
- Administrador
- Usuários
- Trabalho
- Comentários

## Principais funcionalidades da aplicação
**Sobre os usuários comuns**
- Usuário não registrado poderá ver os trabalhos e os comentários feitos por usuários registrados.
- Usuário registrado pode ver os trabalhos e os comentários de outros usuários. Adicionalmente, eles podem escrever comentários, curtir e salvar os trabalhos favoritos.
- Os usuários não registrados e registrados podem acessar os trabalhos no modo de visualização geral (todos os trabalhos), filtrar por datas, filtrar por categorias (tipos de mídias utilizadas).


**Sobre o administrador**
-  administrador (artista) da galeria pode adicionar, remover e editar os seus trabalhos, assim como apagar comentários.

**Sobre os trabalhos**
- O trabalho terá atribuições de curtidas,  e comentários categorizados dos mais recentes aos mais antigos.
- Os trabalhos podem ser imagens.


**Sobre as interações**
- O comentário poderá ser apagado pelo administrador e usuário registrado que fez o comentário.
- As curtidas podem ser dadas por usuários registrados e visualizadas por todos.
- Salvos serão vistos apenas pelo usuário e o administrador poderá ver somente a quantidade de salvos.

## Tecnologias e frameworks utilizados
**Frontend:**
- VueJS v3.0
- Vue-Router 
- Pinia.
- Axios.


**Backend:**
- NodeJs
- Express
- SQLite
- TypeORM
- JsonWebToken


## Operações implementadas para cada entidade da aplicação


| Entidade | Criação (C) | Leitura (R) | Atualização (U) | Remoção (D) |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Usuário  | X  | X | X | X |
| Trabalho artistisco | X  | X  | X  | X  |
| Autor | X  | X  | X  | X  |
| Comentário | X  | X  | X  |   |
| Curtidas | X  | X  |   | X  |



## Rotas da API REST utilizadas
|Método HTTP | URL |
| ------------- | ------------- |
| POST  | /api/login |
| GET | /api/users/:id |
| GET | /api/users/ |
| GET | /api/artworks |
| GET | /api/artworks/{id} |
| POST | /api/artworks |
| PUT | /api/artworks/{id} |
| DELETE | /api/artworks/{id} |
| GET | /api/authors/ |
| GET | /api/authors/{id} |
| PUT | /api/authors/{id} |
| DELETE | /api/authors/{id} |
| GET | /api/likes/{artworkId && userId} |
| POST | /api/likes/{artworkId && userId} |
| DELETE | /api/likes/{artworkId && userId} |
| GET | /api/comments/{artworkId && userId} |
| POST | /api/comments/{artworkId && userId} |
| DELETE | /api/comments/{artworkId && userId} |

