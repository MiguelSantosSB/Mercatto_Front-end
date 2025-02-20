import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';

interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
}

@Component({
  selector: 'app-stores-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  stores: Store[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.findAll().subscribe({
      next: (stores: any[]) => {
        this.stores = stores;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar lojas:', error);
        this.isLoading = false;
      }
    });
  }

  visitStore(storeId: number): void {
    this.router.navigate(['/store', storeId]);
  }
}
