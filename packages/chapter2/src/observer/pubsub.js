// 과제 E
let subFunc = null;

export const 구독 = (fn) => {
	subFunc = fn;
	fn();
};

export const 발행기관 = (obj) => {
	Object.keys(obj).forEach((key) => {
		let value = obj[key];

		const observer = new Set();

		Object.defineProperty(obj, key, {
			get() {
				if (subFunc) {
					observer.add(subFunc);
				}
				return value;
			},
			set(val) {
				value = val;
				observer.forEach((fn) => fn());
			},
		});
	});

	return obj;
};
