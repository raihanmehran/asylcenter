import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  posts: Post[] = [];
  private hubConnection?: HubConnection;
  private postsReceived = new BehaviorSubject<Post[]>([]);
  userPosts$ = this.postsReceived.asObservable();

  constructor(private http: HttpClient) {}

  createHubConnection(user: LoggedUser, receiver: number) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'post?user=' + receiver, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('ReceivePost', (posts) => {
      this.postsReceived.next(posts);
      console.log(this.userPosts$);
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

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

  getPostForUser(userId: number) {
    return this.http
      .get<Post[]>(this.baseUrl + 'post/get-all-posts/' + userId)
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

  deletePost(postId: number) {
    return this.http.delete(this.baseUrl + 'post/delete-post/' + postId).pipe(
      map((_) => {
        return;
      })
    );
  }
}
