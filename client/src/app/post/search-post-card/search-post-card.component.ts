import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-search-post-card',
  templateUrl: './search-post-card.component.html',
  styleUrls: ['./search-post-card.component.css'],
})
export class SearchPostCardComponent implements OnInit {
  @Input() post: Post | undefined;
  @Output() postToCollect = new EventEmitter<Post>();

  constructor(private postService: PostService) {}
  ngOnInit(): void {}

  collectPost() {
    this.postToCollect.emit(this.post);
  }
}
