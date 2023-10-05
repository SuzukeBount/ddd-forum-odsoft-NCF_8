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

# Rodrigo Magalhaes - 1230207

## Explicação da configuração do JSDoc  

Este Readme explica como funciona os testes foram desenvolvidos e executados automaticamente

## Testes Existentes

```bash
task runUnitTests(type: NpmTask) {
    args = ['run', 'test']
}

task generateUnitTestsCoverageReport(type: NpmTask) {
    args = ['run', 'test:dev']
}

task runAPITests(type: Exec) {
    args = ['run', 'testWithCoverage']
}

task generateAPITestsCoverageReport(type: Exec) {
    args = ['run', 'test:api']
}
```
Todas as tasks acima são executadas pelo gradle, e são elas:

1. **runUnitTests** : É o nome da task que será chamada quando usado o comando gradle runUnitTests
2. **generateUnitTestsCoverageReport** : É o nome da task que será chamada quando usado o comando gradle generateUnitTestsCoverageReport
3. **runAPITests** : É o nome da task que será chamada quando usado o comando gradle runAPITests
4. **generateAPITestsCoverageReport** : É o nome da task que será chamada quando usado o comando gradle generateAPITestsCoverageReport

A variável 'run' indica qual o comando será executado, e a segunda variável é o nome do script que será executado no package.json

# Package.json task
De acordo com as tasks criadas no gradle, as mesmas invocam os seguintes scripts no package.json:

```json
    "test": "npm run db:delete:dev && npm run db:create:dev && npm run migrate:dev && jest",
    "test:dev": "npm run db:delete:dev && npm run db:create:dev && npm run migrate:dev && jest --watchAll",
    "testWithCoverage": "npm run db:delete:dev && npm run db:create:dev && npm run migrate:dev && jest --coverage --coverageReporters=\"text\" --coverageReporters=\"html\" --coverageReporters=\"json\"",
    "test:api": "npm run db:delete:dev && npm run db:create:dev && npm run migrate:dev && jest --coverage --coverageReporters=\"html\" --runInBand --testPathPattern=api"
```

## Explicação dos scripts
1. **test** : Executa os testes unitários usando o jest
2. **test:dev** : Executa os testes unitários usando o jest, porém, fica em modo watch, ou seja, sempre que um ficheiro for alterado, os testes serão executados novamente
3. **testWithCoverage**: Executa os testes unitários usando o jest, e gera um report de cobertura de testes
4. **test:api**: Executa os testes de integração usando o jest, e gera um report de cobertura de testes

# Como Gerar Reports
Para gerar os reports, basta executar os comandos abaixo:

```bash
npm run "nome do script"
```
