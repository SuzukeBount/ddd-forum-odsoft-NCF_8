# Explicação da configuração do JSDoc  

Este Readme explica como funciona o JSDoc e como se pode gerar decumentação automática

## Configuração do **JSDoc** (jsdoc.json)

```json
{
    "tags": {
      "allowUnknownTags": true,
      "dictionaries": ["jsdoc"]
    },
    "source": {
      "include": ["./dist"],
      "includePattern": "\\.(jsx|js|ts|tsx)$",
      "exclude": ["node_modules", "src/**/*.spec.ts", "src/**/*.spec.js"],
      "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": ["plugins/markdown"],
    "templates": {
      "better-docs": {
        "name": "ddd-forum-odsoft-ncf_8"
      }
    },
    "opts": {
      "destination": "./docs/jsdoc",
      "recurse": true,
      "readme": "README.md"
    }
}
```

O jsdoc.json é uma configuração para o JSDoc gerar a documnetação de forma automática conforme o que lhe é indicado

1. **"tags"** : Esta secção do json indica definições relacionadas às tags usadas nos comentários do JSDoc.
    - **"allowUnknownTags"** : Está definida para true para permitir o uso de tags costumizadas.
    - **"dictionaries"** : Lista de tags que vão ser usadas
2. **"source"** : Esta secção define quais são os ficheiros que vão ser processados pelo JSDoc
    - **"include"** : Contem os paths dos ficheiros que vão ser usados para criar a documentação
    - **"includePattern"** : Inclui os padrões que os ficheiros têm de ter para se poder gerar documentação
    - **"exclude"** : Contem os paths dos ficheiros que vão ser excluídos
    - **"excludePattern"** : Exclui os padrões que os ficheiros têm de ter para se poder excluir, como por exemplo:
        1. *_example*
        2. */_file*
        3. *\_folder*
        4. *not_ignored*
        5. *folder/_subfolder/_file*
3. **"plugins"** : Especifica os plugins que vão ser usados pelo JSDoc
4. **"templates"** : Templates que vão ser usados para gerar documentação
    - **"better"-docs** : Aqui indicamos apenas o nome da webb app
5. **"opts"** : Opções gerais do JSDoc
    - **"destination"** : Local do Output dos documentos gerados
    - **"recurse"** :  Permite ao JSDoc processar ficheiros dentro de subdiretórios
    - **"readme"** : Indica o readme que vai aparecer na pagina incial da documentação

---
<br>
<br>
<br>

# Package.json task

Foi criada uma npm task que permite gerar a tal documentação

```json
{
...,
"scripts": {
    ...,
    "jsdoc": "jsdoc -c jsdoc.json",
    ...
}
}
```
1. **"jsdoc"** : É nome que vai ser chamado quando se correr o commando *npm run jsdoc* 
2. **jsdoc** : É a ferramenta usada para gerar documentação
3. **-c jsdoc.json** : Diz ao JSDoc para usar a configuração *jsdoc.json*


---
<br>
<br>
<br>

# Como Gerar documentação

Para gerar documentação para o projeto tem de se correr a seguinte npm task

```bash
npm run jsdoc
```

A ferramenta do JSDoc vai ser executada com a configuração indicaca anteriormente e vai gerar a documentação
---
<br>
<br>
<br>
# Gradle task

A seguinte tarefa feita no gradle executa o script criado no package.json

```groovy
node {
    version = "12.22.12"
}

task jsdoc(type: NpmTask) {
    println "jsdoc Task"
    dependsOn npm_install
    dependsOn build
    
    args = ['run', 'jsdoc']
}
```
1. **node** : Aqui define-se a versão a ser usada do node js quando se for a correr os comandos
2. **jsdoc** : É nome que vai ser chamado quando se correr o commando *gradle jsdoc*

Quando a task for executada irá dar print na consola do `jsdoc Task`, de seguida irá executar dois comandos essenciais para gerar a documentação de forma correta:
- **npm_install** : Instala todas as dependências do projeto
- **build** : Dá build ao projeto de forma a criar sempre a pasta ./dist para que o jsdoc a possa ler e criar a documentação
