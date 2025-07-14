import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, Post } from 'src/app/services/blog.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit{

  post : Post | undefined;

  constructor(private route: ActivatedRoute, private blogService: BlogService){};

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.blogService.getPost(id).subscribe(data => this.post = data);
  }
}
