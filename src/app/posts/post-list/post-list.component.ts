import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{

posts: Post[] = [];
    // {title: "First Post", content: "This is First Post Content"},
    // {title: "Second Post", content: "This is Second Post Content"},
    // {title: "Third Post", content: "This is Third Post Content"}

  private postSub:Subscription;

  constructor(public postService:PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }


}