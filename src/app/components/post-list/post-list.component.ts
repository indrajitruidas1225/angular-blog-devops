import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from 'src/app/services/blog.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];
  constructor(private blogService: BlogService){};
  ngOnInit(): void {
      this.blogService.getPosts().subscribe(data => this.posts = data);
  }
}
