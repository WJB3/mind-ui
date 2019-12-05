import  enquire from '@/utils/enquireUtils';

let enquireJs;
if (typeof window !== "undefined") {
	const matchMediaPolyfill = mediaQuery => {
		return {
			media: mediaQuery,
			matches: false,
			addListener() { },
			removeListener() { }
		};
	};
	window.matchMedia = window.matchMedia || matchMediaPolyfill;
	enquireJs = enquire;
}

const mobileQuery = 'only screen and (max-width: 767.99px)';

function enquireScreen(cb, query = mobileQuery) {
	if (!enquireJs) {
		return;
	}

	const handler = {
		match: () => {
			cb && cb(true);
		},
		unmatch: () => {
			cb && cb();
		}
	};

	enquireJs.register(query, handler);
	return handler;
}

function unenquireScreen(handler, query = mobileQuery) {
	if (!enquireJs) {
		return;
	}
	enquireJs.unregister(query, handler);
}

export {
	enquireScreen,
	unenquireScreen
}