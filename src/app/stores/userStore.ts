import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ChangePasswordFormValues, User, UserFormValues } from "../models/User";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get currentUser() {
    return this.user
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => this.user = user)
    } catch (error) {
      throw error;
    }
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user));
      return true;
    } catch (error) {
      return false;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user));
      return true;
    } catch (error) {
      return false;
    }
  };

  changePassword = async (creds: ChangePasswordFormValues) => {
    try {
      await agent.Account.changePassword(creds);
      return true;
    } catch (error) {
      return false
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    this.user = null;
    router.navigate("/");
  };
}
