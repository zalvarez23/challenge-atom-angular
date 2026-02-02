import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getIdToken']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Bearer Authorization header when token exists', fakeAsync(() => {
    authService.getIdToken.and.returnValue(Promise.resolve('test-token-123'));
    httpClient.get('/api/tasks').subscribe();
    tick();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer test-token-123'
    );
    req.flush([]);
  }));

  it('should not add Authorization header when token is null', fakeAsync(() => {
    authService.getIdToken.and.returnValue(Promise.resolve(null));
    httpClient.get('/api/tasks').subscribe();
    tick();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush([]);
  }));
});
