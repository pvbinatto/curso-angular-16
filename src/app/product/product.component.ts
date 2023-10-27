import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = [
    'actions',
    'sku',
    'name',
    'stock',
    'cost',
    'price',
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private util: UtilService
  ) {}

  typeAdd: boolean = false;
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      sku: [null, Validators.required],
      name: [null, Validators.required],
      stock: [null, Validators.required],
      cost: [null, Validators.required],
      price: [null, Validators.required],
    });

    this.listProducts();
  }

  listProducts() {
    this.productService.getAll().subscribe((res) => {
      this.dataSource = res;
    });
  }

  addProduct() {
    this.typeAdd = true;
  }

  edit(product: Product) {
    this.form.patchValue(product);
    this.typeAdd = true;
  }

  async search() {
    if (this.form.dirty) {
      let confirm = await this.util.alertConfirmation('Deseja sair sem salvar?');
      if (confirm.isConfirmed) {
        this.form.reset();
        this.typeAdd = false;
      }
    } else {
      this.form.reset();
      this.typeAdd = false;
      this.listProducts();
    }
  }

  async delete(element: Product) {
    let confirm = await this.util.alertConfirmation(
      'Deseja remover o produto?'
    );

    if (confirm.isConfirmed) {
      this.productService.delete(element.id).subscribe((res) => {
        this.listProducts();
        this.util.alertSuccess('Produto removido com sucesso!');
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    } else {
      let product: Product = this.form.getRawValue();
      if (!product.id) {
        let id = this.util.md5(product.sku);
        product.id = id;
        product = this.normalizeObjectToSave(product);
        this.productService.create(product).subscribe((res) => {
          if (res) {
            this.util.toastrSuccess('Produto cadastrado com sucesso!');
            this.form.patchValue(res);
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.search();
          }
        });
      } else {
        this.productService.update(product).subscribe((res) => {
          if (res) {
            this.util.toastrSuccess('Produto atualizado com sucesso!');
            this.form.patchValue(res);
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.search();
          }
        });
      }
    }
  }

  normalizeObjectToForm(object: Product){
    this.form.get('cost').setValue(this.util.convertToMonetary(object.cost));
    this.form.get('price').setValue(this.util.convertToMonetary(object.price));
    return object;
  }

  normalizeObjectToSave(object: Product){
    object.cost = this.util.convertToFloat(object.cost.toString());
    object.price = this.util.convertToFloat(object.price.toString());
    object.stock = Number(object.stock);
    return object;
  }


}
