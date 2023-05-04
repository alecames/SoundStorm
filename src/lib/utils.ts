export const formatNumber = (num: number) => {
	if (num > 1000000000000) {
		return `${Math.floor(num / 1000000000000)}T`;
	} else if (num > 1000000000) {
		return `${Math.floor(num / 1000000000)}B`;
	} else if (num > 1000000) {
		return `${Math.floor(num / 1000000)}M`;
	} else if (num > 1000) {
		return `${Math.floor(num / 1000)}K`;
	} else {
		return num;
	}
};

export const relativeTime = (time: string) => {
	const date = new Date(time);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return `${years} years ago`;
	}
	if (months > 0) {
		return `${months} months ago`;
	}
	if (days > 0) {
		return `${days} days ago`;
	}
	if (hours > 0) {
		return `${hours} hours ago`;
	}
	if (minutes > 0) {
		return `${minutes} minutes ago`;
	}
	if (seconds > 0) {
		return `${seconds} seconds ago`;
	}
	return 'just now';
};

export const absoluteTime = (time: string) => {
	const date = new Date(time);
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	const year = date.getFullYear();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const ampm = hour >= 12 ? 'PM' : 'AM';
	const hour12 = hour % 12 || 12;

	return `${month} ${day}, ${year} at ${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export const readableNumber = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
