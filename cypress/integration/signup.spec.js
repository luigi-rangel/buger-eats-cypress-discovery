import signup from '../pages/SignupPage';
import signupFactory from '../factories/SignupFactory';

describe('Signup', () => {

    /*beforeEach(function() {
        cy.fixture('deliver').then((d) => {
            this.deliver = d;
        })
    });*/

    it('User should be deliver', function() {

        let deliver = signupFactory.deliver();

        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.');
    });

    it('Incorrect document', function() {

        let deliver = signupFactory.deliver();
        deliver.cpf = '123456789AA';

        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        signup.alertMessageShouldBe('Oops! CPF inválido');
    });

    it('Incorrect email', function() {

        let deliver = signupFactory.deliver();
        deliver.email = 'papito.com.br';

        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        signup.alertMessageShouldBe('Oops! Email com formato inválido.');
    });

    context('Required fields', () => {
        
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ];

        before(() => {
            signup.go();
            signup.submit();
        });

        messages.forEach((msg) => {
            it(`${msg.field} is required`, () => {
                signup.alertMessageShouldBe(msg.output);
            });
        })
    });
});