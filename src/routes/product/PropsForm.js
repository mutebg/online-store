const PropsForm = ({ data }) => (
	<div class="Props">
		{data.map(({ id, label, values }) => (
			<div class="form-row">
				<lable id={id} class="form-row__label">
					{label}
				</lable>
				<select name={label} class="form-row__field">
					{values.map(value => <option value={value}>{value}</option>)}
				</select>
			</div>
		))}
	</div>
);

export default PropsForm;

