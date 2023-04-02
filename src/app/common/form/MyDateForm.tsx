import { InputAdornment, OutlinedTextFieldProps, TextField } from "@mui/material";
import { useField } from "formik";

interface MyDateFormProps extends OutlinedTextFieldProps {
    icon: React.ReactNode
}

const MyDateForm = (props: MyDateFormProps) => {
    const [field, meta] = useField(props.name!)
    const { icon, ...restProps } = props
    const showError = meta.touched && !!meta.error
    return (
        <TextField
            {...restProps}
            {...field}
            helperText={showError && meta.error}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default MyDateForm