import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserRequest } from '../../models/requests/user-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(
    private fAuth: AngularFireAuth
  ) {}

  login(user: UserRequest): Promise<firebase.auth.UserCredential> {
    return this.fAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  register(user: UserRequest): Promise<firebase.auth.UserCredential> {
    return this.fAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logout(): Promise<void> {
    return this.fAuth.auth.signOut();
  }

  checkAuthState(): Observable<firebase.User> {
    return this.fAuth.authState;
  }

  changePassword(email): Promise<void> {
    return this.fAuth.auth.sendPasswordResetEmail(email);
  }

  getAuthInfo(): firebase.User {
    return this.fAuth.auth.currentUser;
  }
}
