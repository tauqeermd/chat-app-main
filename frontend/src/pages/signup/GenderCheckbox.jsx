const GenderCheckbox = ({onCheckBoxChange, selectedGender}) => {
	return (
		<div className='flex flex-row space-x-6 px-1'>
			<div className='flex items-center'>
				<input
					id='male'
					type='radio'
					name='gender'
					className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300'
					checked={selectedGender === "male"}
					onChange={() => onCheckBoxChange("male")}
				/>
				<label htmlFor='male' className='ml-2 text-sm font-medium text-gray-700 cursor-pointer'>
					Male
				</label>
			</div>
			<div className='flex items-center'>
				<input
					id='female'
					type='radio'
					name='gender'
					className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300'
					checked={selectedGender === "female"}
					onChange={() => onCheckBoxChange("female")}
				/>
				<label htmlFor='female' className='ml-2 text-sm font-medium text-gray-700 cursor-pointer'>
					Female
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;