import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts:Post[] = [];
private PostSub: Subscription;
isLoading = false;

  constructor(public postService:PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.PostSub =  this.postService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    })
  }

  onDelete(id: string) {
    this.postService.deletePost(id)
  }
  ngOnDestroy() {
    this.PostSub.unsubscribe();
  }




}
