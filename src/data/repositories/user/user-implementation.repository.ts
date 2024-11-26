import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  constructor(private http: HttpClient) {
    super();
  }

  findUser(email: string): Observable<{ id: string } | null> {
    return this.http.get<{ id: string } | null>(
      `${environment.apiUrl}/users/${email}`
    );
  }

  saveUser(email: string): Observable<{ id: string } | null> {
    return this.http.post<{ id: string } | null>(
      `${environment.apiUrl}/users`,
      { email }
    );
  }
}
