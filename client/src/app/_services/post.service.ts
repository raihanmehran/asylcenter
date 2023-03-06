import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  getPosts(userId: number) {
    return this.http
      .get<Post[]>(this.baseUrl + 'post/get-all-posts/' + userId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getPost(postId: number) {
    return this.http
      .get<Post>(this.baseUrl + 'post/get-post/' + postId)
      .pipe(map((response) => response));
  }

  getNotCollectedPosts() {
    return this.http
      .get<Post[]>(this.baseUrl + 'post/get-posts/not-collected')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  addPost(model: any) {
    return this.http.post(this.baseUrl + 'post/add-post', model).pipe(
      map((response) => {
        if (response) {
          console.log(response);
        }
      })
    );
  }

  collectPost(post: Post) {
    return this.http.put(this.baseUrl + 'post', post).pipe(
      map((_) => {
        return;
      })
    );
  }
}
