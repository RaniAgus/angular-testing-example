import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from '../shared/models/user';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  dataSource = new MatTableDataSource<User>([]);

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers()
      .pipe(take(1), takeUntil(this.destroy))
      .subscribe((users) => { this.dataSource.data = users; });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
