import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  body: string;
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl);
  };

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  };

  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.apiUrl, post);
  };

  
}
