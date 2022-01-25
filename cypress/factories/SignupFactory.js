let faker = require('faker');
let cpf = require('gerador-validador-cpf');

export default {
    deliver: function(){

        let firstName = faker.name.firstName();
        let lastName = faker.name.firstName();

        let data = {
            nome: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '21999999999',
            address: {
                cep: '20765171',
                street: 'Estrada Adhemar Bebiano',
                number: '4221',
                complemento: 'casa 6',
                district: 'Engenho da Rainha',
                city_uf: 'Rio de Janeiro/RJ'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data;
    }
}