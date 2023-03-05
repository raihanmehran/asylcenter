import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-search-post-card',
  templateUrl: './search-post-card.component.html',
  styleUrls: ['./search-post-card.component.css'],
})
export class SearchPostCardComponent implements OnInit {
  @Input() post: Post | undefined;

  constructor() {}
  ngOnInit(): void {}
}
