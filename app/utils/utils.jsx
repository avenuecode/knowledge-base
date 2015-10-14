/**
 * Utility methods to use around the app
 */

export default class Utils {
	static listen(source, callback) {
		$(document).on(source, callback);
	}

	static notify(dest, data) {
		$(document).trigger(dest, data);
	}
}