import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  @Input() dataSource?: MatTableDataSource<User>;
  displayedColumns = [
    'id',
    'name',
    'username',
    'email',
    'website',
    'company',
  ];

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.dataSource) {
      console.error('No data source');
      return;
    }
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
}
