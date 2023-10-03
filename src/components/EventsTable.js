import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { EnhancedTableHead, EnhancedTableToolbar } from './TableComps';
import { getFiltersConfig } from '../utils/helpers';
import Feedback from './Feedback';

export const FilterContext = createContext(null);

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EventsTable() {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('date');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [events, setEvents] = useState([]);
	const [filters, setFilters] = useState(getFiltersConfig());
	const [filterString, setFilterString] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let mounted = true;

		const fetchevents = async () => {
			try {
				setLoading(true);

				const request =
					filterString.length > 0
						? '/api/events?'.concat(filterString.slice(1, filterString.length))
						: '/api/events';

				console.log(request);

				const response = await axios(request);
				if (mounted) {
					setEvents(response.data);
					setLoading(false);
				}
			} catch (err) {
				console.error(err);
				setError(true);
				setLoading(false);
			}
		};

		fetchevents();

		return () => (mounted = false);
	}, [filterString]);

	const handleRequestSort = (_, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

	return (
		<FilterContext.Provider value={{ filters, setFilters, setFilterString, setPage }}>
			<Box sx={{ width: '80%', mt: 5 }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<EnhancedTableToolbar />
					{!loading && !error && events.length > 0 ? (
						<>
							<TableContainer>
								<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
									<EnhancedTableHead
										order={order}
										orderBy={orderBy}
										onRequestSort={handleRequestSort}
										rowCount={events.length}
									/>

									<TableBody>
										{events
											.slice()
											.sort(getComparator(order, orderBy))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map(event => {
												const date = new Date(event.date);
												const websiteName =
													event.websiteName.length > 30
														? `${event.websiteName.slice(0, 30)}...`
														: event.websiteName;
												const location =
													event.location.length > 0
														? event.location
														: '-';
												return (
													<TableRow hover key={event.eventName}>
														<TableCell>{event.eventName}</TableCell>
														<TableCell>{date.toDateString()}</TableCell>
														<TableCell>{location}</TableCell>
														<TableCell>{websiteName}</TableCell>
													</TableRow>
												);
											})}
										{emptyRows > 0 && (
											<TableRow
												style={{
													height: 53 * emptyRows,
												}}
											>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>

							<TablePagination
								rowsPerPageOptions={[5, 10, 15, 20]}
								component='div'
								count={events.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</>
					) : (
						<Feedback loading={loading} error={error} eventsLength={events.length} />
					)}
				</Paper>
			</Box>
		</FilterContext.Provider>
	);
}
