import React from 'react';
import {FieldConnect, ErrorField} from 'react-components-form';

const RadioGroupField = ({name, options, value, unit, onChange, error, errors, errorsStyles}) => (
    <div className="radio-group">
        {options.map((option, i) => {
            const id = name+i;
            return (
                <div className="form-check" key={i}>
                    <input
                        id={id}
                        name={name}
                        value={option.value}
                        type="radio"
                        checked={ value === option.value }
                        onChange={e => onChange( e.target.value)}
                    />
                    <label className="form-check-label" htmlFor={id}>
                        {option.label}
                    </label>
                </div>
            )
        })}
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);

export default FieldConnect(RadioGroupField);