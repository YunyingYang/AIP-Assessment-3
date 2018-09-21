// import React from 'react';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';

// const CheckBoxGroup = ({ type = 'checkbox', name, value, error, info, checked = false, onChange, options }) => {
//     const checkOptions = options.map(option => (
//         // <option key={option.label} value={option.value}>
//         //     {option.label}
//         // </option>
//         // <input type={type} key={option.label} value={option.value} />
//         <label className='' key={option.label}>
//             {option.label}
//             <input type={type} name={option.label} checked={this.handleCheck} onChange={this.handleChange} />
//         </label>
//     ));
//     return (
//         <div className="form-group">
//             <div
//                 className={classnames('form-control form-control-lg', {
//                     'is-invalid': error
//                 })}
//                 name={name}
//                 value={value}
//             // onChange={onChange}
//             >
//                 {checkOptions}
//             </div>
//             {info && <small className="form-text text-muted">{info}</small>}
//             {error && <div className="invalid-feedback">{error}</div>}
//         </div>
//     );
// };

// CheckBoxGroup.propTypes = {
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     info: PropTypes.string,
//     error: PropTypes.string,
//     checked: PropTypes.bool,
//     onChange: PropTypes.func.isRequired,
//     options: PropTypes.array.isRequired
// };

// export default CheckBoxGroup;
