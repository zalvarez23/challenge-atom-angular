import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    localStorage.clear();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header when userId exists', () => {
    localStorage.setItem('userId', 'user-123');
    httpClient.get('/api/tasks').subscribe();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('user-123');
  });

  it('should not add Authorization header when userId is missing', () => {
    httpClient.get('/api/tasks').subscribe();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
