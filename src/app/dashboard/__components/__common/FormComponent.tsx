import { Controller } from 'react-hook-form';
import { Input } from 'antd';

interface FormComponentProps {
  name: string;
  label: string;
  disabled?: boolean;
  control: any;
  errors: any;
  handleChange?: (value: any) => void;
}

const FormComponent = ({ name, label, disabled, control, errors, handleChange }: FormComponentProps) => (
  <div className='form-component'>
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          className='form-field'
          {...field}
          disabled={disabled}
          onChange={(e) => {
            field.onChange(e);
            if (handleChange) handleChange(e.target.value);
          }}
        />
      )}
    />
    {errors[name] && <p className='form-error'>{errors[name].message}</p>}
  </div>
);

export default FormComponent;
