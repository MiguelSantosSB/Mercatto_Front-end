import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  productForm: FormGroup;
  storeId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.storeId = +this.route.snapshot.paramMap.get('storeId')!;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        storeId: this.storeId
      };

      this.productService.create(productData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Produto criado com sucesso!');
          this.router.navigate(['/store', this.storeId]);
        },
        error: (error) => {
          console.error('Erro ao criar produto:', error);
          this.notificationService.showError('Erro ao criar produto');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/store', this.storeId]);
  }
}
