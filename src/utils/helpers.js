import { format } from 'date-fns';

export const getFiltersConfig = () => {
	return {
		'Location Type': {
			value: [],
			tempValue: [],
			getSearchString: locationTypes => {
				if (locationTypes.length > 0) {
					return '&locationType='.concat(locationTypes.join(','));
				}
				return '';
			},
		},
		Date: {
			value: [null, null],
			tempValue: [null, null],
			getSearchString: dates => {
				const newDates = dates.map(date => {
					if (date !== null) {
						return format(date, 'yyyy-MM-dd');
					}
					return null;
				});

				if (newDates[0] === null && newDates[1] === null) {
					return '';
				}
				return '&date='.concat(newDates.join(','));
			},
		},
		'Website Name': {
			value: [],
			tempValue: [],
			getSearchString: websiteNames => {
				if (websiteNames.length > 0) {
					return '&websiteName='.concat(encodeURIComponent(websiteNames.join(';')));
				}
				return '';
			},
		},
	};
};
