import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from './model';
import { BehaviorSubject, EMPTY } from 'rxjs';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

let enforceReadOnly = false; // TODO: This could be set based upon a role

const notSignedInMessage = `Not signed in`;

let _isLoggedIn = false;
const sessionStateSubject = new BehaviorSubject<SessionState>({
  loggedIn: false,
  message: notSignedInMessage,
});
let accessToken: string;

const isLoggedIn = (): boolean => {
  return _isLoggedIn;
};

let readOnly = false; // TODO: This could be set based upon a role

let sessionState$ = sessionStateSubject.asObservable();

const signin = async (email: string, password: string) => {
  const root = environment.API;
  const signinUrl = `${root}/signin/`;
  const body: Partial<User> = {
    email, // 'john@contoso.com',
    password, // '1234'
  };
  try {
  } catch (error) {
    logout();
    return EMPTY;
  }
  const response = await axios.post<{ accessToken: string }>(signinUrl, body);
  let data = response.data;
  if (data?.accessToken) {
    const message = `Signed in as ${email}`;
    accessToken = data.accessToken;
    sessionStateSubject.next({ loggedIn: true, message });
    _isLoggedIn = true;
    return true;
  } else {
    logout();
    return false;
  }
};

const logout = () => {
  accessToken = null;
  _isLoggedIn = false;
  sessionStateSubject.next({
    loggedIn: false,
    message: notSignedInMessage,
  });
};

export {
  isLoggedIn,
  logout,
  signin,
  sessionState$,
  accessToken,
  enforceReadOnly,
};
