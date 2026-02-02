import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import {
  UserRepository,
  UserAuthResponse,
} from 'src/domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  constructor(private http: HttpClient) {
    super();
  }

  findUser(email: string): Observable<UserAuthResponse | null> {
    return this.http.get<UserAuthResponse | null>(
      `${environment.apiUrl}/users/${encodeURIComponent(email)}`
    );
  }

  saveUser(email: string): Observable<UserAuthResponse | null> {
    return this.http.post<UserAuthResponse | null>(
      `${environment.apiUrl}/users`,
      { email }
    );
  }
}
