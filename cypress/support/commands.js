Cypress.Commands.add('criarLista', (tituloLista) => {
    cy.contains('Adicionar outra lista')
        .click()
        .get('input[type="text"]')
        .type(tituloLista)

    cy.contains('Adicionar Lista')
        .click()

    cy.contains('h1', tituloLista)
        .closest('header')
        .should('be.visible')
});

Cypress.Commands.add('excluirLista', (tituloLista) => {
    cy.contains('h1', tituloLista)
        .closest("header") //container pai
        .find('.trash')
        .should('be.visible')
        .click()
});

Cypress.Commands.add('adicionarTarefa', (lista, tarefa) => {
    cy.contains('h1', lista)
        .closest('header')
        .next('div.board-cards.custom-scroll')
        .contains('Adicionar Tarefa')
        .click()
    cy.get('input[type="text"]').type(tarefa)
    cy.contains('Enviar').click()
})

Cypress.Commands.add('editarTarefa', (tarefa, tarefaEditada) => {
    cy.contains(tarefa)
        .click()
    cy.contains(tarefa)
        .click()

    cy.get('input[type="text"]').type(tarefaEditada)
    cy.contains('Editar Nome da task').click()
})

Cypress.Commands.add('excluirTarefa', (tarefa) => {
    cy.xpath(`//p[contains(., "${tarefa}")]`)
        .closest('header') // sobe até o header que contém o svg
        .realHover()
        .find('svg')
        .click();
})

Cypress.Commands.add('AdicionarTag', (tarefa) => {
    cy.contains(tarefa).click()
    cy.contains('Adicionar nova Tag').click()
    cy.get('input[type="text"]').type('Nova Tag 123')
    cy.get('ul > li').eq(Math.floor(Math.random() * 3)).click()
    cy.get('button').contains('Enviar').click()
    cy.get('body').click(100, 0) //Para sair do modal
})