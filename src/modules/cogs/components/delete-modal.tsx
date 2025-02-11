import { Button, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Inventory,
	selectedInventoryData,
	setInventories,
} from '../../../store/features/inventory';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { ModalProps } from '../../../types/modal';

const DeleteInventoryModal: React.FC<ModalProps> = ({ open, handleClose }) => {
	const selectedInventory = useSelector(selectedInventoryData);
	const dispatch = useDispatch();

	const onSubmit = () => {
		if (!selectedInventory) {
			return;
		}
		const currInventories: Inventory[] = JSON.parse(
			localStorage.getItem('inventories') || '[]'
		);
		const updatedInventories = currInventories.filter(
			(inventory) => inventory.id !== selectedInventory.id
		);
		localStorage.setItem('inventories', JSON.stringify(updatedInventories));
		dispatch(setInventories(updatedInventories));
		handleClose();
	};
	return (
		<Dialog
			open={open}
			style={{ padding: 10 }}
			sx={{ padding: 10 }}
			onClose={handleClose}
			maxWidth="xs"
			fullWidth
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Delete {selectedInventory?.name}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to delete this item? This action cannot be
					undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={onSubmit} variant="contained">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteInventoryModal;
