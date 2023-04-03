import { useStore } from "../../../app/stores/store"
import { useParams } from "react-router-dom"
import { ProcessFormValues } from "../../../app/models/Process"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { Formik } from "formik"
import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";


import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import React from "react"
import * as Yup from 'yup'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Process", width: 300 },
    { field: "text", headerName: "Description", width: 300 },
];


const ProcessForm = () => {
    const params = useParams()
    const [processValues, setProcessValues] = React.useState<ProcessFormValues>(new ProcessFormValues())
    const [rows, setRows] = React.useState<GridRowsProp>([])
    const [selectedProcesses, setSelectedProcesses] = React.useState<string[]>([])
    const { projectStore, processStore } = useStore()

    const handleForSubmit = (process: ProcessFormValues) => {
        process.projectName = projectStore.selectedProject!.name
        processStore.createProcess(process).then(updateProcesses)
    }

    const handleForDelete = () => {
        if (selectedProcesses.length > 0)
            Promise.all(selectedProcesses.map(id => processStore.deleteProcess(id))).then(updateProcesses)
    }

    const updateProcesses = () => projectStore.loadProcesses().then(() => {
        setRows(projectStore.selectedProject!.processes.map((p) => {
            return {
                id: p.id,
                title: p.title,
                text: p.description
            }
        }))
    })

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required()
    })

    React.useEffect(() => {
        if (params.projectName)
            projectStore.loadProject(params.projectName)
                .then(updateProcesses)
    }, [params.projectName])
    if (projectStore.isLoading) return <LoadingComponent />
    return (
        <Formik
            key={processValues.title}
            initialValues={processValues}
            onSubmit={handleForSubmit}
            validationSchema={validationSchema}
        >
            {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
                    }}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="title-outlined-basic"
                        label="Process"
                        variant="outlined"
                        placeholder="Enter title here!"
                        name="title"
                        defaultValue={values.title}
                        onChange={handleChange}
                        helperText={errors.title}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ModeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        id="text-outlined-basic"
                        label="Text"
                        variant="outlined"
                        placeholder="Enter text here!"
                        name="description"
                        defaultValue={values.description}
                        onChange={handleChange}
                        helperText={errors.description}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TextSnippetIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                        style={{ padding: "10px 0", justifyContent: "right" }}
                    >
                        <Button type="submit" variant="contained" startIcon={<AddCircleIcon />} >
                            Add Process
                        </Button>
                        <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleForDelete}>
                            Remove Process
                        </Button>
                    </Stack>

                    <Box sx={{ height: 400, borderStyle: "solid", borderRadius: "5px" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            onRowSelectionModelChange={(x) => setSelectedProcesses(x as string[])}
                            sx={{ background: "#f5e4d6" }}
                        />
                    </Box>
                </Box>
            )}
        </Formik>

    )
}

export default ProcessForm