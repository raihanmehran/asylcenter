import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, EMPTY, empty, map, take } from 'rxjs';
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
  private userPostsSource = new BehaviorSubject<Post[]>([]);
  userPosts$ = this.userPostsSource.asObservable();
  idNumber: string = '';

  constructor(private http: HttpClient) {}

  createHubConnection(user: LoggedUser, receiver: number) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'post?user=' + receiver, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) =>
        console.error('Error while starting SignalR hub connection: ' + err)
      );

    this.hubConnection.on('ReceivePosts', (posts: Post[]) => {
      if (posts.length > 0) {
        if (receiver === posts[0].appUserId) {
          this.userPostsSource.next(posts);
        }
      } else {
        this.userPostsSource.next([]);
      }
    });

    this.hubConnection.on('AddNewPost', (post: Post) => {
      const posts = this.userPostsSource.value;
      if (receiver === post.appUserId) {
        posts.push(post);
        posts.sort((a, b) => b.id - a.id);
        this.userPostsSource.next(posts);
      }
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

  async addPost(model: any, user: LoggedUser) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'post?user=' + model.appUserId, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    await this.hubConnection
      .start()
      .then()
      .catch((err) =>
        console.error('Error while starting SignalR hub connection: ' + err)
      );
    if (model && this.hubConnection) {
      if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
        this.hubConnection
          .invoke('AddUserPost', model)
          .catch((err) => console.error('Error while adding post: ' + err));
      } else {
        console.log('SignalR, Hub Not Connected!');
      }
    }
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
