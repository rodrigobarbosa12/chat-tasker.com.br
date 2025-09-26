'use client'

import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  type StandardTextFieldProps,
} from '@mui/material'
import { FormikProps } from 'formik'
import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { NumericFormat } from 'react-number-format'
import { setMask, type Mask } from './set-mask'

type DataForm = any

interface InputProps extends StandardTextFieldProps {
  name: string
  formik: FormikProps<DataForm>
  className?: string
  onInput?: FormEventHandler
  mask?: Mask
}

export const Input: React.FC<InputProps> = ({
  name,
  formik,
  onInput,
  mask,
  ...props
}) => {
  const [showProgress, setShowProgress] = useState(false)
  const [totalChar, setTotalChar] = useState(
    String(props?.defaultValue || '').length,
  )
  const [showPass, setShowPass] = useState(false)
  const [digits, setDigits] = useState('')

  const inputRef = useRef(null)

  const length = totalChar / (Number(props.maxRows) / 100) || 0

  const getType = () => {
    if (props.type === 'password') {
      return showPass === false ? 'password' : 'text'
    }
    return props.type
  }

  useEffect(() => {
    setMask(name, mask)
  }, [name, mask])

  useEffect(() => {
    if (mask === 'money') {
      props.defaultValue = props.defaultValue || 0

      setDigits(String(Number(props.defaultValue) * 100))

      formik.setFieldValue(
        name,
        props.defaultValue ? Number(props.defaultValue) : '0',
      )
    }
  }, [mask, name, +props.defaultValue]) // não adicione o formik

  const handleMoneyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const updated = digits.slice(0, -1)
      setDigits(updated)
      formik.setFieldValue(name, parseInt(updated || '0', 10) / 100)
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault()
      const updated = (digits + e.key).slice(0, 15)
      setDigits(updated)
      formik.setFieldValue(name, parseInt(updated || '0', 10) / 100)
    }
  }

  const formattedValue = (parseInt(digits || '0', 10) / 100).toFixed(2)

  const isMoneyType = mask === 'money'

  return (
    <>
      <Box style={{ width: '100%' }}>
        {isMoneyType ? (
          <NumericFormat
            id={name}
            name={name}
            value={formattedValue}
            onKeyDown={handleMoneyKeyDown}
            onChange={() => {}}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            inputMode="numeric"
            customInput={TextField}
            fullWidth
            label={props.label}
            variant={props.variant || 'outlined'}
            error={!!formik.errors[name]}
            helperText={<>{String(formik.errors[name] || '')}</>}
          />
        ) : (
          <TextField
            inputRef={inputRef}
            style={{ width: '100%' }}
            {...props}
            id={name}
            type={getType()}
            onChange={formik.handleChange}
            onFocus={() => setShowProgress(true)}
            onBlur={() => setShowProgress(false)}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setTotalChar(e.target.value.length)
              if (onInput) {
                onInput(e)
              }
            }}
            inputProps={{ maxLength: props.maxRows }}
            InputProps={
              props.type === 'password'
                ? {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass(!showPass)}
                          edge="end"
                        >
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'hsl(var(--primary))',
                        },
                      },
                    },
                  }
                : props.InputProps
            }
            error={!!formik.errors[name]}
            helperText={<>{String(formik.errors[name] || '')}</>}
          />
        )}
      </Box>

      {showProgress ? (
        <LinearProgress
          style={{ marginBlock: 2 }}
          variant="determinate"
          value={length}
        />
      ) : null}
    </>
  )
}
