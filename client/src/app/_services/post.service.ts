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
  private userPostsSource = new BehaviorSubject<Post[]>([]);
  userPosts$ = this.userPostsSource.asObservable();

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
      this.userPostsSource.next(posts);
      console.log(this.userPosts$);
    });

    this.hubConnection.on('AddNewPost', (post) => {
      console.log('hubConnection on is called');

      console.log(post);

      this.userPosts$.pipe(take(1)).subscribe({
        next: (posts) => {
          this.userPostsSource.next([...posts, post]);
          console.log(post);
          console.log(posts);
        },
      });
    });

    this.hubConnection.on('testingMethod', (text) => {
      console.log(text);
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

  async addPost(model: any) {
    // return this.http.post(this.baseUrl + 'post/add-post', model).pipe(
    //   map((response) => {
    //     if (response) {
    //       console.log(response);
    //     }
    //   })
    // );
    console.log('service:');

    console.log(model);

    return this.hubConnection?.invoke('testingMethod');

    // return this.hubConnection
    //   ?.invoke('AddUserPost', { recipientUsername: model.appUserId, model })
    //   .catch((error) => console.log(error));
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
