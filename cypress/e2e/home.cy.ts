describe('home', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('should render menus correctly', () => {
		cy.contains('span', 'Magic Link').should('exist');
		cy.contains('span', 'Inventory').should('exist');
	});
	it('should redirect correctly', () => {
		cy.contains('span', 'Magic Link').click();
		cy.url().should('include', '/login');
		cy.go('back');

		cy.contains('span', 'Inventory').click();
		cy.url().should('include', '/cogs');
		cy.go('back');
	});
});
