describe('Testes Quadro Kanban', () => {
    beforeEach(() => {
        cy.visit("https://kanban-dusky-five.vercel.app/")
        cy.fixture('datas').as('datas')
    });

    it('Criar lista', function () {
        const listaAleatoria = this.datas.listas[Math.floor(Math.random() * this.datas.listas.length)]

        cy.contains('Adicionar outra lista')
            .click()
            .get('input[type="text"]')
            .type(listaAleatoria)

        cy.contains('Adicionar Lista')
            .click()

        cy.contains('h1', listaAleatoria)
            .closest('header')
            .should('be.visible')

    })


    it('Criar e excluir lista', function () {
        const listaAleatoria = this.datas.listas[Math.floor(Math.random() * this.datas.listas.length)]

        cy.criarLista(listaAleatoria)
        cy.excluirLista(listaAleatoria)

    })

    it('Excluir alguma lista', () => {
        const listasExistentes = ["To Do", "In Progress", "Done"];
        const listaAleatoria = listasExistentes[Math.floor(Math.random() * listasExistentes.length)]

        cy.excluirLista(listaAleatoria)
    })

    it('Criar tarefa em uma nova lista', function () {
        const listaAleatoria = this.datas.listas[Math.floor(Math.random() * this.datas.listas.length)]
        const tarefasAleatoria = this.datas.tarefas[Math.floor(Math.random() * this.datas.tarefas.length)]

        cy.criarLista(listaAleatoria)
        cy.adicionarTarefa(listaAleatoria, tarefasAleatoria)

        cy.contains(tarefasAleatoria)
            .should('be.visible')
    });

    it('Criar tarefa em uma lista já existente', function () {
        const listasExistentes = ["To Do", "In Progress", "Done"]; //dinamizar listas
        const listaAleatoria = listasExistentes[Math.floor(Math.random() * listasExistentes.length)]

        const tarefasAleatoria = this.datas.tarefas[Math.floor(Math.random() * this.datas.tarefas.length)]

        cy.adicionarTarefa(listaAleatoria, tarefasAleatoria)
        cy.contains(tarefasAleatoria)
            .should('be.visible')
    });

    it('Editar tarefa criada', function () {
        const listasExistentes = ["To Do", "In Progress", "Done"];
        const listaAleatoria = listasExistentes[Math.floor(Math.random() * listasExistentes.length)]

        const tarefasAleatoria = this.datas.tarefas[Math.floor(Math.random() * this.datas.tarefas.length)]
        const tarefaEditada = "Nova tarefa editada"

        cy.adicionarTarefa(listaAleatoria, tarefasAleatoria)
        cy.editarTarefa(tarefasAleatoria, tarefaEditada)
        cy.contains(tarefaEditada)
            .should('be.visible')

    })
    it('Excluir tarefa criada', function () {
        const listasExistentes = ["To Do", "In Progress", "Done"];
        const listaAleatoria = listasExistentes[Math.floor(Math.random() * listasExistentes.length)]

        const tarefasAleatoria = this.datas.tarefas[Math.floor(Math.random() * this.datas.tarefas.length)]

        cy.adicionarTarefa(listaAleatoria, tarefasAleatoria)
        cy.excluirTarefa(tarefasAleatoria)

        cy.contains(tarefasAleatoria)
            .should('not.exist')
    })


    it('Adicionar tag a tarefa', function () {
        const listasExistentes = ["To Do", "In Progress", "Done"];
        const listaAleatoria = listasExistentes[Math.floor(Math.random() * listasExistentes.length)]

        const tarefasAleatoria = this.datas.tarefas[Math.floor(Math.random() * this.datas.tarefas.length)]

        cy.adicionarTarefa(listaAleatoria, tarefasAleatoria)
        cy.AdicionarTag(tarefasAleatoria)

        cy.contains('Nova Tag 123')
            .should('be.visible')
    })
})