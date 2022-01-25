class SignupPage {

    go(){
        cy.visit('/');
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas'); //double-space entre 'para' e 'fazer', por causa de <br> em elemento h1
    }

    fillForm(deliver){
        cy.get('input[name="fullName"]').type(deliver.nome);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        cy.get('input[name="postalcode"]').type(deliver.address.cep);
        cy.get('input[type="button"][value="Buscar CEP"]').click();
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.complemento);
        
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_uf);

        cy.contains('.delivery-method li', deliver.delivery_method).click();

        cy.get('input[type="file"]').attachFile('imgs/' + deliver.cnh);
    }

    submit(){
        cy.get('button[type="submit"]').click();
    }

    modalContentShouldBe(expectedMessage){
        cy.get('div[class="swal2-html-container"]').should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage){
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
}

export default new SignupPage;