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

//   createMission = async (missionFormValues: MissionFormValues) => {
//     try {
//       await agent.Missions.create(missionFormValues);
//       const newMission = new Mission(missionFormValues);
//       runInAction(() => {
//         this.selectedMission = newMission;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   updateMission = async (id: string, missionFormValues: MissionFormValues) => {
//     try {
//       await agent.Missions.update(id, missionFormValues);
//       const updateMission = new Mission(missionFormValues);
//       runInAction(() => {
//         this.selectedMission = updateMission;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   deleteMission = async (id: string) => {
//     try {
//       await agent.Missions.delete(id);
//       runInAction(() => {
//         this.selectedMission = undefined;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   addMember = async (id: string, userName: string) => {
//     try {
//       await agent.Missions.addMember(id, userName);;
//     } catch (error) {
//       console.log(error);
//     }
//   };
}
