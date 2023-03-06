import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-search-post-card',
  templateUrl: './search-post-card.component.html',
  styleUrls: ['./search-post-card.component.css'],
})
export class SearchPostCardComponent implements OnInit {
  @Input() post: Post | undefined;
  @Output() postToCollect = new EventEmitter<Post>();
  @Output() postToDelete = new EventEmitter<Post>();

  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {}

  collectPost() {
    this.postToCollect.emit(this.post);
  }

  deletePost() {
    this.postToDelete.emit(this.post);
  }

  viewPost() {
    this.toastr.info('Under development');
  }
}
