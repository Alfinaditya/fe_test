import { Inventory } from '../../src/store/features/inventory';

describe('inventory', () => {
	describe('list', () => {
		beforeEach(() => {
			cy.visit('/cogs');
		});
		// it('should render back button correctly', () => {
		// 	cy.contains('button', 'Back').should('exist');
		// });
		// it('should redirect back to home correctly', () => {
		// 	cy.contains('button', 'Back').click();
		// 	cy.url().should('include', '/');
		// });
		// it('should render datatable correctly', () => {
		// 	cy.contains('button', 'Filters').should('exist');
		// 	cy.contains('button', 'Add Inventory').should('exist');
		// 	cy.contains('button', 'Calculate Cogs').should('exist');
		// 	cy.get('[data-testid="filter-input"]').should('exist');
		// 	cy.get('[data-testid="datatable"]').should('exist');
		// });
		// it('should render add modal correctly', () => {
		// 	cy.contains('button', 'Add Inventory').click();
		// 	cy.get('[data-testid="add-modal"]').should('exist');
		// 	cy.get('[data-testid="add-modal"] h2').contains('h2', 'Add Inventory');
		// 	cy.get('[data-testid="add-modal-form"] button')
		// 		.contains('button', 'Add')
		// 		.should('have.attr', 'type', 'submit');

		// 	cy.get('[data-testid="add-modal-form"] input[name="name"]').should(
		// 		'have.attr',
		// 		'type',
		// 		'text'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] input[name="qty"]').should(
		// 		'have.attr',
		// 		'type',
		// 		'number'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] #mui-component-select-uom').should(
		// 		'exist'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] input[name="priceQty"]').should(
		// 		'have.attr',
		// 		'type',
		// 		'number'
		// 	);
		// });
		// it('should render validation error message in the add modal correctly', () => {
		// 	cy.contains('button', 'Add Inventory').click();
		// 	cy.get('[data-testid="add-modal-form"] button')
		// 		.contains('button', 'Add')
		// 		.click();
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Name is required'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Quantity cannot be less or equal than 0'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Price per Quantity cannot be less or equal than 0'
		// 	);
		// });
		// it('should render validation error message in the add modal correctly', () => {
		// 	cy.contains('button', 'Add Inventory').click();
		// 	cy.get('[data-testid="add-modal-form"] button')
		// 		.contains('button', 'Add')
		// 		.click();
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Name is required'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Quantity cannot be less or equal than 0'
		// 	);
		// 	cy.get('[data-testid="add-modal-form"] p').contains(
		// 		'p',
		// 		'Price per Quantity cannot be less or equal than 0'
		// 	);
		// });
		it('should render add modal correctly', () => {
			cy.contains('button', 'Add Inventory').click();
			cy.get('[data-testid="add-modal-form"] input[name="name"]').type(
				'Testing'
			);
			cy.get('[data-testid="add-modal-form"] input[name="qty"]').type('10');
			cy.get('[data-testid="add-modal-form"] input[name="priceQty"]').type(
				'10_000'
			);
			cy.get('[data-testid="add-modal"]')
				.contains('button', 'Add')
				.should('have.attr', 'type', 'submit')
				.click();
			// cy.get('[data-testid="add-modal"]').should('visible');
		});
	});
});
