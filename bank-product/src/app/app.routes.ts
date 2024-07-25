import { Routes } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    {path: 'list', component: ListProductComponent},
    {path: 'create', component: CreateProductComponent},
    {path: 'edit/:id', component: EditProductComponent},
    { path: '**', component: ListProductComponent}
];
