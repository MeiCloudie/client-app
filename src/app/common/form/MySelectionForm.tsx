import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectProps, SvgIconTypeMap } from "@mui/material"
import { useField } from "formik"
interface MySelectionFormProps extends SelectProps {
    icon: React.ReactNode
    options: { label: string, value: any }[]
}
const MySelectionForm = (props: MySelectionFormProps) => {
    const [field, meta] = useField(props.name!)
    const { icon, options, ...selectProps } = props;
    const showError = meta.touched && !!meta.error
    return (
        <FormControl fullWidth>
            <InputLabel id={`${props.name}-select-label`}>{props.name}</InputLabel>
            <Select
                {...selectProps}
                {...field}
                labelId={`${props.name}-select-label`}
                error={showError}
                startAdornment={
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                }
            >
                {options.map((option: { label: string, value: any }) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {showError && <p>{meta.error}</p>}
        </FormControl>
    )
}

export default MySelectionForm