import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService, Post } from 'src/app/services/blog.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  post: Post = { title: '', body: ''};

  constructor(private blogService: BlogService, private router: Router){}

  submitPost(): void {
    this.blogService.addPost(this.post).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
