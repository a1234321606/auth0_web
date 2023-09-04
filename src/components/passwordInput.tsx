import React, { useState } from 'react';
import {
  IconButton, Popper, OutlinedInput, InputLabel, FormControl, Card, CardContent, FormHelperText, TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useIntl } from 'react-intl';

export default (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [error, setError] = useState<boolean>();
  const { formatMessage } = useIntl();
  const {
    label, name, required, disabled, helperText, onChange,
  } = props;
  const key: string = Math.random().toString(36).substring(2, 8);

  const verify = (v: string) => {
    const isLengthValid: boolean = v.length > 7;
    const isLowerCase: boolean = /[a-z]/.test(v);
    const isUpperCase: boolean = /[A-Z]/.test(v);
    const isDigit: boolean = /\d/.test(v);
    const isSpecialChar: boolean = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?`~]+/.test(v);
    const isComboValid: boolean = +isLowerCase + +isUpperCase + +isDigit + +isSpecialChar > 2;
    const isValid: boolean = isLengthValid && isComboValid;

    document.getElementById('lower')?.classList.add(isLowerCase ? 'valid' : 'invalid');
    document.getElementById('lower')?.classList.remove(isLowerCase ? 'invalid' : 'valid');
    document.getElementById('upper')?.classList.add(isUpperCase ? 'valid' : 'invalid');
    document.getElementById('upper')?.classList.remove(isUpperCase ? 'invalid' : 'valid');
    document.getElementById('digit')?.classList.add(isDigit ? 'valid' : 'invalid');
    document.getElementById('digit')?.classList.remove(isDigit ? 'invalid' : 'valid');
    document.getElementById('char')?.classList.add(isSpecialChar ? 'valid' : 'invalid');
    document.getElementById('char')?.classList.remove(isSpecialChar ? 'invalid' : 'valid');
    document.getElementById('len')?.classList.add(isLengthValid ? 'valid' : 'invalid');
    document.getElementById('len')?.classList.remove(isLengthValid ? 'invalid' : 'valid');
    document.getElementById('combo')?.classList.add(isComboValid ? 'valid' : 'invalid');
    document.getElementById('combo')?.classList.remove(isComboValid ? 'invalid' : 'valid');
    setError(v ? !isValid : false);
    return v ? isValid : true;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = verify(e.target.value);
    e.target.setAttribute('data-valid', `${!e.target.value || isValid}`);
    if (onChange) onChange(e);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(e.target);
    if (e.target.value) setTimeout(() => verify(e.target.value));
  };

  const onBlur = () => setAnchorEl(undefined);

  return (
    <FormControl>
      <InputLabel htmlFor={`password-input-${key}`}>{label}</InputLabel>
      <Popper
        placement="top-start"
        open={!!anchorEl}
        anchorEl={anchorEl}
        style={{ zIndex: 10 }}
      >
        <Card>
          <CardContent>
            <ul>
              <li id="len">{formatMessage({ id: 'password_length' })}</li>
              <li id="combo">
                <div style={{ marginBottom: '8px' }}>{formatMessage({ id: 'password_combo' })}</div>
                <ul>
                  <li id="lower">{formatMessage({ id: 'password_lowercase' })}</li>
                  <li id="upper">{formatMessage({ id: 'password_uppercase' })}</li>
                  <li id="digit">{formatMessage({ id: 'password_number' })}</li>
                  <li id="char">{formatMessage({ id: 'password_special_char' })}</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Popper>
      <OutlinedInput
        id={`password-input-${key}`}
        type={showPassword ? 'text' : 'password'}
        label={label}
        name={name}
        required={required}
        disabled={disabled}
        error={error || !!helperText}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        endAdornment={(
          <IconButton
            onClick={() => setShowPassword((show) => !show)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
      />
      <FormHelperText error={!!helperText}>{helperText}</FormHelperText>
    </FormControl>
  );
};
