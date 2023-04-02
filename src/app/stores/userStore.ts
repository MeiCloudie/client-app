import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/User";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      runInAction(() => (this.user = user));
      router.navigate("/");
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      runInAction(() => (this.user = user));
      router.navigate("/");
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    this.user = null;
    router.navigate("/");
  };
}
