import { toRupiahFormat } from '../../src/lib/utils';

describe('inventory', () => {
	beforeEach(() => {
		cy.visit('/cogs');
	});
	describe('datatable', () => {
		it('should render back button correctly', () => {
			cy.contains('button', 'Back').should('exist');
		});
		it('should redirect back to home correctly', () => {
			cy.contains('button', 'Back').click();
			cy.url().should('include', '/');
		});
		it('should render datatable correctly', () => {
			cy.contains('button', 'Filters').should('exist');
			cy.contains('button', 'Add Inventory').should('exist');
			cy.contains('button', 'Calculate Cogs').should('exist');
			cy.get('[data-testid="filter-input"]').should('exist');
			cy.get('[data-testid="datatable"]').should('exist');
		});
	});
	describe('add modal', () => {
		it('should render add modal correctly', () => {
			cy.contains('button', 'Add Inventory').click();
			cy.get('[data-testid="add-modal"]').should('exist');
			cy.get('[data-testid="add-modal"] h2').contains('h2', 'Add Inventory');
			cy.get('[data-testid="add-modal-form"] button')
				.contains('button', 'Add')
				.should('have.attr', 'type', 'submit');

			cy.get('[data-testid="add-modal-form"] input[name="name"]').should(
				'have.attr',
				'type',
				'text'
			);
			cy.get('[data-testid="add-modal-form"] input[name="qty"]').should(
				'have.attr',
				'type',
				'number'
			);
			cy.get('[data-testid="add-modal-form"] #mui-component-select-uom').should(
				'exist'
			);
			cy.get('[data-testid="add-modal-form"] input[name="priceQty"]').should(
				'have.attr',
				'type',
				'number'
			);
		});
		it('should render validation error message in the add modal correctly', () => {
			cy.contains('button', 'Add Inventory').click();
			cy.get('[data-testid="add-modal-form"] button')
				.contains('button', 'Add')
				.click();
			cy.get('[data-testid="add-modal-form"] p').contains(
				'p',
				'Name is required'
			);
			cy.get('[data-testid="add-modal-form"] p').contains(
				'p',
				'Quantity cannot be less or equal than 0'
			);
			cy.get('[data-testid="add-modal-form"] p').contains(
				'p',
				'Price per Quantity cannot be less or equal than 0'
			);
		});
		it('should create inventory correctly', () => {
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
			cy.get('[data-testid="success-snackbar-add-modal"]').contains(
				'div',
				'Successfully Create Inventory!'
			);
		});
	});
	describe('calculate cogs modal', () => {
		it('should render calculate cogs modal correctly', () => {
			cy.contains('button', 'Calculate Cogs').click();
			cy.get('[data-testid="calculate-cogs-modal"]').should('exist');
			cy.get('[data-testid="calculate-cogs-modal"] h2').contains(
				'h2',
				'Calculate COGS for Iced Coffee'
			);
			cy.get('[data-testid="calculate-cogs-modal"] input[name="cups"]').should(
				'have.attr',
				'type',
				'number'
			);
			cy.get(
				'[data-testid="calculate-cogs-modal"] input[name="totalCogs"]'
			).should('have.attr', 'type', 'text');
		});
		it('should render validation error message correctly', () => {
			cy.contains('button', 'Calculate Cogs').click();
			cy.get('[data-testid="calculate-cogs-modal"]').should('exist');

			cy.get('[data-testid="calculate-cogs-modal"] input[name="cups"]')
				.clear()
				.type('-1');
			cy.get('[data-testid="calculate-cogs-modal"] p').contains(
				'p',
				'Cups cannot be less or equal than 0'
			);
		});
		it('should calculate COGS correctly', () => {
			cy.contains('button', 'Calculate Cogs').click();

			cy.get('[data-testid="calculate-cogs-modal"] input[name="cups"]')
				.clear()
				.type('1');

			cy.get(
				'[data-testid="calculate-cogs-modal"] input[name="totalCogs"]'
			).should('have.attr', 'value', toRupiahFormat(8_450));

			cy.get('[data-testid="calculate-cogs-modal"] input[name="cups"]')
				.clear()
				.type('5');

			cy.get(
				'[data-testid="calculate-cogs-modal"] input[name="totalCogs"]'
			).should('have.attr', 'value', toRupiahFormat(42_250));

			cy.get('[data-testid="calculate-cogs-modal"] input[name="cups"]')
				.clear()
				.type('10');

			cy.get(
				'[data-testid="calculate-cogs-modal"] input[name="totalCogs"]'
			).should('have.attr', 'value', toRupiahFormat(84_500));
		});
	});
});
