import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CartRequest, CartResponse, OrderRequest, OrderResponse } from '../models/cart.model';
import { ChatbotComponent } from '../chatbot/chatbot.component';




import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faMapMarkerAlt, faPlus, faEdit, faTrash, faCartPlus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';


import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  store: any = null;
  address: any = null;
  products: any[] = [];
  cartItems: any[] = [];
  cartTotal: number = 0;
  isOwner: boolean = false;
  isLoading: boolean = true;


  // FontAwesome icons
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faCartPlus = faCartPlus;
  faCartArrowDown = faCartArrowDown;

  constructor(
    private storeService: StoreService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadCart();
  }



  ngOnInit() {
    const storeId = this.route.snapshot.paramMap.get('id');
    if (!storeId) {
      this.router.navigate(['/']);
      return;
    }

    // Busca os dados da loja
    this.storeService.findById(Number(storeId)).subscribe({
      next: (store: any) => {
        console.log('Store data received:', store);
        this.store = store;
        if (!store.owner) {
          console.error('Owner information missing in store data');
        }
        if (store.addressId) {
          this.storeService.getAddressDetails(store.address).subscribe({
            next: (address) => {
              this.address = address;
              this.loadProducts(store.id);
              this.checkIfOwner();
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Erro ao buscar endereço:', error);
              this.isLoading = false;
            }
          });
        } else {
          console.error('ID do endereço não encontrado na loja');
          this.loadProducts(store.id);
          this.checkIfOwner();
          this.isLoading = false;
        }
      },
      error: (error: any) => {
        console.error('Erro ao buscar loja:', error);
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  loadProducts(storeId: number) {
    this.productService.getProductsByStore(storeId).subscribe({
      next: (products: any[]) => {
        this.products = products;
      },
      error: (error: any) => {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }

  checkIfOwner() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token não encontrado no localStorage');
      this.isOwner = false;
      return;
    }

    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.sub;
    console.log('Email do usuário:', email);

    this.storeService.getUserIdByEmail(email).subscribe({
      next: (userId: number) => {
        console.log('ID do usuário:', userId);
        console.log('Estrutura completa do store:', this.store);
        if (this.store && this.store.owner) {
          console.log('Estrutura do owner:', this.store.owner);
          this.isOwner = this.store.owner.id === userId;
          console.log('É dono da loja?', this.isOwner);
        } else {
          console.error('Owner information not found in store object');
          this.isOwner = false;
        }
      },
      error: (error: any) => {
        console.error('Erro ao verificar proprietário:', error);
        this.isOwner = false;
      }
    });
  }

  createProduct() {
    this.router.navigate(['/product/create', this.store.id]);
  }

  editProduct(productId: number) {
    this.router.navigate(['/product/edit', productId]);
  }

  deleteProduct(productId: number) {
    this.productService.delete(productId).subscribe({
      next: () => {
        this.loadProducts(this.store.id);
      },
      error: (error: any) => {
        console.error('Erro ao excluir produto:', error);
      }
    });
  }

  addToCart(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.stock > 0) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const request: CartRequest = {
          userId: decodedToken.userId,
          productId: productId,
          quantity: 1
        };
        
        this.cartService.addItem(request).subscribe({
          next: () => {
            console.log('Produto adicionado ao carrinho:', productId);
            product.stock--;
          },
          error: (error) => {
            console.error('Erro ao adicionar produto ao carrinho:', error);
          }
        });
      }
    }
  }


  removeFromCart(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const request: CartRequest = {
          userId: decodedToken.userId,
          productId: productId,
          quantity: 1
        };
        
        this.cartService.removeItem(productId, request).subscribe({
          next: () => {
            console.log('Produto removido do carrinho:', productId);
            product.stock++;
            this.loadCart();
          },
          error: (error) => {
            console.error('Erro ao remover produto do carrinho:', error);
          }
        });
      }
    }
  }

  loadCart() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.cartService.getCart(decodedToken.userId).subscribe({
        next: (cart: CartResponse) => {
          this.cartItems = cart.items;
          this.cartTotal = cart.total;
        },
        error: (error) => {
          console.error('Erro ao carregar carrinho:', error);
        }
      });
    }
  }

  checkout() {
    this.router.navigate(['/chatbot']);
  }




}
