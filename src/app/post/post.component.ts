import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private routeSub: Subscription;
  private id: number;
  public post: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.post = this.api.postWithComments(this.id);
    });
  }

}
