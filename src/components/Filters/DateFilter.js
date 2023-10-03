import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

import { FilterContext } from '../EventsTable';

export default function DateFilter() {
	const { filters, setFilters } = useContext(FilterContext);

	const handleChange = (newValue, num) => {
		setFilters(prevFilters => {
			const newDate = [...prevFilters['Date'].tempValue];

			newDate[num] = newValue;

			return {
				...prevFilters,
				Date: {
					...prevFilters['Date'],
					tempValue: newDate,
				},
			};
		});
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box sx={{ padding: 3, width: 250 }}>
				<DatePicker
					label='Start Date'
					value={filters['Date'].tempValue[0]}
					onChange={newValue => handleChange(newValue, 0)}
					renderInput={params => <TextField {...params} />}
				/>
			</Box>
			<Box sx={{ padding: 3, width: 250 }}>
				<DatePicker
					label='End Date'
					value={filters['Date'].tempValue[1]}
					onChange={newValue => handleChange(newValue, 1)}
					renderInput={params => <TextField {...params} />}
				/>
			</Box>
		</LocalizationProvider>
	);
}
