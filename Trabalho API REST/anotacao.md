# Instalação de Bibliotecas
- npm install mongoose
- npm install express
- npm install nodemon

# Executar Projeto
- npm run dev

# Banco
- MongoDB Cloud Atlas

# Requisições feitas pelo Postman

- http://localhost:3000

#### Rotas Cursos
- GET    - /cursos
- GET    - /cursos/:id
- POST   - /cursos
- PUT    - /cursos/:id
- DELETE - /cursos/:id

### Exemplo de Requisições Cursos

- BUSCAR CURSOS - GET - /cursos
```json
[
  {
  "_id": "63363f5981476f7f10ae79bb",
  "nomeCurso": "hue hue BR BR",
  "nomeDisciplinas": "introdução ao meme",
  "cargaHoraria": 3000
  }
]
```
- CRIAR CURSOS - POST - /cursos
```json
{
    "nomeCurso": "hue hue BR BR",
    "nomeDisciplinas": "introdução ao meme",
    "cargaHoraria": 3000
}
```


### Rotas Alunos

- GET    - /alunos
- GET    - /alunos/busca
- GET    - /alunos/:id
- POST   - /alunos
- PUT    - /alunos/:id
- DELETE - /alunos/:id

### Exemplo de Requisições Alunos
- BUSCAR ALUNOS - GET - /alunos
```json
[
    {
    "_id": "63363f8b81476f7f10ae79bf",
    "nome": "Charles Bronson",
    "curso": {
    "_id": "63363f5981476f7f10ae79bb",
    "nomeCurso": "hue hue BR BR",
    "nomeDisciplinas": "introdução ao meme",
    "cargaHoraria": 3000
    },
    "__v": 0
  }
]
```
- CRIAR ALUNOS - POST - /alunos
- Obs: Aluno deve estar associado a um curso, informar o ID do curso junto na requisição 
```json
{
    "nome": "Charles Bronson",
    "curso": "63363f5981476f7f10ae79bb",
    "_id": "63363f8b81476f7f10ae79bf",
    "__v": 0
}
```