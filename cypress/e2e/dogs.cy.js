describe("API Razas y Subrazas Perros", () =>{

    it("Ingresando a la pagina", () =>{
        //Abrir la página del formulario de login
        cy.visit("/"); 
        cy.wait(2000);
    });

    it("Ver una raza ej: affenpincher", ()=> {
        cy.visit("/"); 
        cy.wait(2000);
        //Cliclear raza affenpinscher
        cy.contains('a', 'affenpinscher').click();
        //Revisar si tal raza es visible 
        cy.contains('h2', 'affenpinscher').should('be.visible');
        //Revisar si tal imagen es visible
        cy.get('.imagen-perro') 
        .should('have.attr', 'src') 
        .and('include', 'affenpinscher'); 
    });

    it("Ver una raza en imagenes", ()=> {
        cy.visit("/"); 
        cy.wait(2000);
        //Cliclear boton imagenes
        cy.contains('a', 'Imagenes').click();
        //Cliclear select
        cy.get('.select').click();
        //Seleccionar una opcion al azar
        cy.get('.select__option').then(($options) => {
            const randomIndex = Math.floor(Math.random() * $options.length);
            const randomOption = $options.get(randomIndex);
      
            cy.wrap(randomOption).click(); 
          });

          cy.wait(2000);
          cy.get('.select__label').then(($label) => {
            const selectedBreed = $label.text();
      
            cy.contains('h2', selectedBreed).should('be.visible'); 
          });
    });

    it('Verificar razas en "Imagen al azar" y que salga otra raza al apretar el boton por segunda vez', () => {
        cy.visit('/'); 
        //Cliclear imagen al azar
        cy.contains('a', 'Imagen al azar').click(); 
        //Revisar si tal imagen es visible
        cy.contains('button', 'Obtener raza al azar').click(); 
    
        cy.wait(2000); 
    
        cy.get('h2').should('be.visible'); 
        //Revisar si tal imagen es visible
        cy.get('.imagen-perro') 
          .should('be.visible') 
          .then(($img) => {
            const firstImgUrl = $img.prop('src');
            //Cliclear boton obtener raza al azar nuevamente
            cy.contains('button', 'Obtener raza al azar').click(); 
    
            cy.wait(2000); 
            //Revisar si tal imagen es visible y no es la misma que la anterior
            cy.get('.imagen-perro') 
              .should('be.visible') 
              .and('not.have.attr', 'src', firstImgUrl); 
          });
      });

});