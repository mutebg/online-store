const CustomFields = ({ number, label, length }) => {
	const list = [];
	for (let i = 1; i <= number; i++) {
		list.push(
			<div class="form-row">
				<label class="form-row__label">{label + ' ' + i}</label>
				<input
					name={label + i}
					class="form-row__field"
					type="text"
					maxLength={length}
					required
				/>
			</div>
		);
	}
	return <div class="Custom">{list}</div>;
};

export default CustomFields;
