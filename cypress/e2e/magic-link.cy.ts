describe('magic link', () => {
	describe('login page', () => {
		beforeEach(() => {
			cy.visit('/login');
		});
		it('should render back button correctly', () => {
			cy.contains('button', 'Back').should('exist');
		});
		it('should redirect back to home correctly', () => {
			cy.contains('button', 'Back').click();
			cy.url().should('include', '/');
		});
		it('should render magic link form correctly', () => {
			cy.get('form input[name="email"]').should('have.attr', 'type', 'email');
			cy.get('form').should('exist');
			cy.contains('button', 'Login')
				.should('exist')
				.should('have.attr', 'type', 'submit');
		});
		it('should render validation error message correctly', () => {
			cy.contains('button', 'Login').click();
			cy.contains('p', 'Email is required');

			cy.get('form input[name="email"]').type('DSDSWDSWDSDS');
			cy.contains('p', 'Email is not valid');
		});
		it('should generate magic link correctly', () => {
			cy.get('form input[name="email"]').type('alfinaditia02@gmail.com');
			cy.contains('button', 'Login').click();
			cy.get('[data-testid="magic-link-card"]').should('exist');
			cy.get('[data-testid="magic-link-href"]')
				.should('exist')
				.should('have.attr', 'href');
		});
		it('should redirect to magic link page correctly', () => {
			cy.get('form input[name="email"]').type('alfinaditia02@gmail.com');
			cy.contains('button', 'Login').click();
			cy.get('[data-testid="magic-link-href"]').click();
			cy.url().should('include', '/magic-link');
			cy.contains('button', 'Logout').should('exist');
		});
		it('should logout correctly', () => {
			cy.get('form input[name="email"]').type('alfinaditia02@gmail.com');
			cy.contains('button', 'Login').click();
			cy.get('[data-testid="magic-link-href"]').click();
			cy.url().should('include', '/magic-link');
			cy.contains('button', 'Logout').click();
			cy.url().should('include', '/login');
		});

		it('should redirect back to auth page', () => {
			cy.get('form input[name="email"]').type('alfinaditia02@gmail.com');
			cy.contains('button', 'Login').click();
			cy.get('[data-testid="magic-link-href"]').click();
			cy.url().should('include', '/magic-link');
			cy.visit('/login');
			cy.url().should('include', '/magic-link');
		});
	});

	describe('magic link page', () => {
		it('should render error alert correctly', () => {
			cy.visit('/magic-link/INVALID_ID');
			cy.url().should('include', '/magic-link');
			cy.get('[data-testid="magic-link-alert"]')
				.should('exist')
				.contains('div', 'Token is invalid');
			cy.get('[data-testid="magic-link-alert-title"]')
				.should('exist')
				.contains('div', 'error');
			cy.contains('button', 'Logout').should('not.exist');
		});
		it('should render success alert correctly', () => {
			const token = crypto.randomUUID();
			cy.visit(`/magic-link/${token}`);
			cy.url().should('include', '/magic-link');
			cy.get('[data-testid="magic-link-alert"]')
				.should('exist')
				.contains('div', `Authentication Successful!, Your Token is ${token}`);
			cy.get('[data-testid="magic-link-alert-title"]')
				.should('exist')
				.contains('div', 'success');
			cy.contains('button', 'Logout').should('exist');
		});
	});
});
