import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import { IPost } from './ipost';
import { IComment } from './icomment';

@Injectable()
export class ApiService {
  private root = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  public posts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.root + '/posts');
  }

  public postWithComments(id: number): Observable<IPost> {
    const postSource = this.http.get<IPost>(this.root + '/posts/' + id);
    const commentsSource = this.http.get<IComment[]>(this.root + '/comments?postId=' + id);
    return postSource
      .combineLatest(commentsSource, (post, comments): IPost => {
        return {
          id: post.id,
          title: post.title,
          body: post.body,
          comments: comments
        };
      });
  }
}
