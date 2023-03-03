import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post: Post | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  viewPost(postId: number) {
    this.router.navigateByUrl('/post/list/' + postId);
  }
}
