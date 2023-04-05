import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import MyTextForm from "../../../app/common/form/MyTextForm";
import { CommentFormValues } from "../../../app/models/Comment";
import { useStore } from "../../../app/stores/store";
import PersonIcon from "@mui/icons-material/Person";
import { Comment } from "../../../app/models/Comment";

const CommentForm = observer(() => {
  const params = useParams();
  const [comments, setComments] = React.useState<Comment[]>([]);
  const { commentStore, missionStore, userStore } = useStore();
  const [comment, setComment] = React.useState<CommentFormValues>(
    new CommentFormValues()
  );

  const handleForSubmit = (
    comment: CommentFormValues,
    actions: FormikHelpers<CommentFormValues>
  ) => {
    comment.userName = userStore.currentUser?.userName!;
    comment.missionId = params.missionId;
    commentStore
      .createComment(comment)
      .then(updateComments)
      .then(() => actions.setSubmitting(false));
  };

  const updateComments = () =>
    missionStore.loadComments().then(() => {
      setComments(missionStore.selectedMission!.comments);
    });

  React.useEffect(() => {

    if (params.missionId) {
        missionStore.loadMission(params.missionId).then(updateComments)
    }
  }, []);

  return (
    <Formik initialValues={comment} onSubmit={handleForSubmit}>
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
          }}
          onSubmit={handleSubmit}
        >
          <MyTextForm
            label="Discussion"
            name="content"
            multiline
            rows={4}
            placeholder="Add a comment here..."
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Stack>
          </div>

          {comments.map((c, i) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Card
                key={i}
                style={{ backgroundColor: "#f0c9a7", width: "100%" }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="user"
                      style={{ backgroundColor: "#1565c0" }}
                    >
                      <PersonIcon />
                    </Avatar>
                  }
                  title={c.owner.displayName}
                  subheader={c.postDate.toString()}
                />
                <CardContent>
                  <Typography variant="body1">{c.content}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      )}
    </Formik>
  );
});

export default CommentForm;
