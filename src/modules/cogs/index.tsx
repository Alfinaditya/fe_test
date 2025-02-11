import { Box, Button, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useDispatch, useSelector } from 'react-redux';
import {
	inventoriesData,
	Inventory,
	selectedInventoryData,
	setInventories,
	setSelectedInventory,
} from '../../store/features/inventory';
import AddInventoryModal from './components/add-modal';
import EditInventoryModal from './components/edit-modal';
import DeleteInventoryModal from './components/delete-modal';
import CalculateCogsModal from './components/calculate-cogs';
import { useNavigate } from 'react-router-dom';
import { toRupiahFormat } from '../../lib/utils';

const CogsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inventories = useSelector(inventoriesData);
	const inventory = useSelector(selectedInventoryData);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openCogsModal, setOpenCogsModal] = useState(false);

	const handleEditClick = (inventory: Inventory) => {
		setOpenEditModal(true);
		dispatch(setSelectedInventory(inventory));
	};

	const handleDeleteClick = (inventory: Inventory) => {
		setOpenDeleteModal(true);
		dispatch(setSelectedInventory(inventory));
	};

	const columns: GridColDef<(typeof inventories)[number]>[] = [
		// {
		// 	field: 'id',
		// 	headerName: 'No',
		// 	valueGetter: (value) =>
		// 		inventories.findIndex((item) => item.id === value) + 1,
		// 	renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
		// 	flex: 1,
		// },
		{ field: 'name', headerName: 'Item Name', flex: 1 },
		{ field: 'qty', headerName: 'Quantity', type: 'number', flex: 1 },
		{ field: 'uom', headerName: 'Unit of Measurement (UoM)', flex: 1 },
		{
			field: 'priceQty',
			headerName: 'Price per Quantity',
			renderCell: (params) => toRupiahFormat(params.row.priceQty),
			flex: 1,
		},

		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			flex: 1,
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={() => handleEditClick(row)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => handleDeleteClick(row)}
						color="inherit"
					/>,
				];
			},
		},
	];

	useEffect(() => {
		fetchInventories();
	}, []);

	const fetchInventories = () => {
		const currInventories: typeof inventories = JSON.parse(
			localStorage.getItem('inventories') || '[]'
		);
		if (currInventories && currInventories.length > 0) {
			dispatch(setInventories(currInventories));
			return;
		}
		localStorage.setItem('inventories', JSON.stringify(inventories));
	};
	const customToolBar = () => {
		return (
			<GridToolbarContainer>
				<Box flex={1}>
					<GridToolbarFilterButton data-testid="filter-button" />
					<Button
						color="primary"
						startIcon={<AddIcon />}
						onClick={() => setOpenAddModal(true)}
					>
						Add Inventory
					</Button>
					<Button
						color="primary"
						startIcon={<CalculateIcon />}
						onClick={() => setOpenCogsModal(true)}
					>
						Calculate Cogs
					</Button>
				</Box>
				<GridToolbarQuickFilter data-testid="filter-input" />
			</GridToolbarContainer>
		);
	};

	return (
		<>
			<Button onClick={() => navigate('/')} size="small" sx={{ mb: 2 }}>
				<ArrowBackIcon />
				Back
			</Button>

			<Paper sx={{ height: 400, width: '100%' }}>
				<DataGrid
					data-testid="datatable"
					rows={inventories}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					editMode="row"
					pageSizeOptions={[5, 10]}
					disableColumnSelector
					disableDensitySelector
					slots={{ toolbar: customToolBar }}
					sx={{ border: 0 }}
				/>
			</Paper>

			<CalculateCogsModal
				key="calc-cogs-modal"
				handleClose={() => setOpenCogsModal(false)}
				open={openCogsModal}
			/>
			<AddInventoryModal
				key="add-inventory-modal"
				handleClose={() => setOpenAddModal(false)}
				open={openAddModal}
			/>

			<DeleteInventoryModal
				key={`delete-inventory-modal-${inventory?.id}`}
				handleClose={() => setOpenDeleteModal(false)}
				open={openDeleteModal}
			/>
			<EditInventoryModal
				key={`edit-inventory-modal-${inventory?.id}`}
				handleClose={() => setOpenEditModal(false)}
				open={openEditModal}
			/>
		</>
	);
};

export default CogsPage;
