import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Inventory, setInventories } from '../../../store/features/inventory';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalProps } from '../../../types/modal';

const uom = ['kg', 'pcs', 'liter'] as const;

const InventorySchema = z.object({
	name: z
		.string({ message: 'Name must be string' })
		.min(1, { message: 'Name is required' }),
	qty: z.coerce
		.number({ message: 'Quantity must be number' })
		.positive({ message: 'Quantity cannot be less or equal than 0' }),
	uom: z.enum(uom, {
		message: 'Unit of Measurement is not valid',
	}),
	priceQty: z.coerce
		.number({ message: 'Price per Quantity must be number' })
		.positive({ message: 'Price per Quantity cannot be less or equal than 0' }),
});
type InventoryInput = z.infer<typeof InventorySchema>;

const AddInventoryModal: React.FC<ModalProps> = ({ open, handleClose }) => {
	const dispatch = useDispatch();
	const form = useForm<InventoryInput>({
		resolver: zodResolver(InventorySchema),
		defaultValues: {
			name: '',
			priceQty: 0,
			qty: 0,
			uom: 'kg',
		},
	});

	const onSubmit = (data: InventoryInput) => {
		const currInventories: Inventory[] = JSON.parse(
			localStorage.getItem('inventories') || '[]'
		);
		const updatedInventories = [
			...currInventories,
			{
				id: crypto.randomUUID(),
				name: data.name,
				priceQty: data.priceQty,
				qty: data.qty,
				uom: data.uom,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			},
		] as Inventory[];
		localStorage.setItem('inventories', JSON.stringify(updatedInventories));
		dispatch(setInventories(updatedInventories));
		form.reset();
		handleClose();
	};
	return (
		<Dialog
			open={open}
			style={{ padding: 10 }}
			sx={{ padding: 10 }}
			onClose={handleClose}
			maxWidth="xs"
			data-testid="add-modal"
			fullWidth
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<form data-testid="add-modal-form" onSubmit={form.handleSubmit(onSubmit)}>
				<DialogTitle id="alert-dialog-title">Add Inventory</DialogTitle>
				<Box textAlign="center" margin="auto" sx={{ width: '90%' }}>
					<Box sx={{ mb: 3.5 }}>
						<Controller
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormControl fullWidth>
									<TextField
										fullWidth
										label="Name"
										error={!!form.formState.errors.name}
										helperText={
											form.formState.errors.name
												? form.formState.errors.name.message
												: null
										}
										variant="outlined"
										{...field}
									/>
								</FormControl>
							)}
						/>
					</Box>
					<Box sx={{ mb: 3.5 }}>
						<Controller
							control={form.control}
							name="qty"
							render={({ field }) => (
								<FormControl fullWidth>
									<TextField
										fullWidth
										label="Quantity"
										error={!!form.formState.errors.qty}
										type="number"
										helperText={
											form.formState.errors.qty
												? form.formState.errors.qty.message
												: null
										}
										variant="outlined"
										{...field}
									/>
								</FormControl>
							)}
						/>
					</Box>

					<Box sx={{ mb: 3.5 }}>
						<Controller
							control={form.control}
							name="uom"
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel id="uom-input">Unit of Measurement</InputLabel>
									<Select
										labelId="uom-input"
										fullWidth
										// data-testid="uom-input"
										label="Unit of Measurement"
										error={!!form.formState.errors.uom}
										sx={{ textAlign: 'left', textTransform: 'capitalize' }}
										{...field}
									>
										{uom.map((value, i) => (
											<MenuItem
												key={i}
												value={value}
												sx={{ textTransform: 'capitalize' }}
											>
												{value}
											</MenuItem>
										))}
									</Select>
									{form.formState.errors.uom && (
										<FormHelperText>
											{form.formState.errors.uom.message}
										</FormHelperText>
									)}
								</FormControl>
							)}
						/>
					</Box>
					<Box sx={{ mb: 3.5 }}>
						<Controller
							control={form.control}
							name="priceQty"
							render={({ field }) => (
								<FormControl fullWidth>
									<TextField
										fullWidth
										label="Price per Quantity"
										type="number"
										error={!!form.formState.errors.priceQty}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">Rp</InputAdornment>
												),
											},
										}}
										helperText={
											form.formState.errors.priceQty
												? form.formState.errors.priceQty.message
												: null
										}
										variant="outlined"
										{...field}
									/>
								</FormControl>
							)}
						/>
					</Box>
				</Box>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" variant="contained">
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddInventoryModal;
