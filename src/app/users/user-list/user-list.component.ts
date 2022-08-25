import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from '../../shared/models/user';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns = [
    'id',
    'name',
    'username',
    'email',
    'website',
    'company',
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers()
      .pipe(take(1), takeUntil(this.destroy))
      .subscribe((users) => { this.dataSource.data = users; });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.table.dataSource = this.dataSource;
  }

  sortingDataAccessor(user: User, property: string): string | number {
    switch (property) {
      case 'company':
        return user.company.name;
      default:
        return (user as any)[property];
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
