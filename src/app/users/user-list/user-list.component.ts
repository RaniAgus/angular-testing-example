import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { User } from '../../shared/models/user';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
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
      .pipe(take(1))
      .subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.table.dataSource = this.dataSource;
  }

  sortingDataAccessor(data: User, property: string): string | number {
    switch(property) {
      case 'company': return data.company.name;
      default: return (data as any)[property];
    }
  }
}
