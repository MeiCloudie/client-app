import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Comment, CommentFormValues } from "../models/Comment";
import agent from "../api/agent";

export default class CommentStore {
  comments: Comment[] = new Array<Comment>();
  selectedComment: Comment | undefined = undefined;
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedComment,
      (comment) => {
        console.log("This is the comment: " + comment);
      }
    );
    reaction(
      () => this.comments,
      () => {
        console.log("Comment list change");
      }
    );
  }

  get commentList() {
    return this.comments;
  }

  loadComments = async () => {
    this.isLoading = true
    try {
      const comments = await agent.Comments.list();
      runInAction(() => {
        this.comments = comments;
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadComment = async (id: string) => {
    this.isLoading = true
    try {
      const comment = await agent.Comments.details(id);
      runInAction(() => {
        this.selectedComment = comment;
      });
      return comment;
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadCommentByMissionId = async (missionId: string) => {
    this.isLoading = true
    try {
      const comments = await agent.Missions.commentList(missionId);
      runInAction(() => {
        this.comments = comments;
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  }

  createComment = async (commentFormValues: CommentFormValues) => {
    try {
      await agent.Comments.create(commentFormValues);
      const newComment = new Comment(commentFormValues);
      runInAction(() => {
        this.selectedComment = newComment;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // updateComment = async (id: string, commentFormValues: CommentFormValues) => {
  //   try {
  //     await agent.Comments.update(id, commentFormValues);
  //     const updateComment = new Comment(commentFormValues);
  //     runInAction(() => {
  //       this.selectedComment = updateComment;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
