import { useParams } from "react-router-dom";

const ProjectDetailsPage = () => {
    const { projectName } = useParams()
    return (
        <>
            <h1>Project Details Page</h1>
            <h1>{projectName}</h1>
        </>
    )
}
export default ProjectDetailsPage
