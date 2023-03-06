import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

declare var SpeechSynthesis: any;
declare var SpeechSynthesisUtterance: any;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  id: number | undefined;
  isTranslate: boolean = false;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.getIdFromRoute();
  }
  ngOnInit(): void {
    console.log('Id : ' + this.id);
    this.getPost();
    this.isTranslate = false;
  }

  getIdFromRoute() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getPost() {
    if (this.id) {
      this.postService
        .getPost(this.id)
        .pipe(take(1))
        .subscribe({
          next: (post) => {
            this.post = post;
            console.log(this.post);
          },
        });
    }
  }

  translate() {
    this.isTranslate = true;
  }

  deTranslate() {
    this.isTranslate = false;
  }

  speak(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }
}
