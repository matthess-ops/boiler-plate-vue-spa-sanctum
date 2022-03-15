1: make model and migration

php artisan make:model 
Product -m

2: add to migration 

    $table->id();
            $table->timestamps();
            $table->string('product|_name');
            $table->string('product_code');
            $table->integer('product_amount');

3: MAKE FACTORY: php artisan make:factory ProductFactory

<?php

/** @var  \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'product_name' => $faker->lastName,
        'product_code' => $faker->bankAccountNumber,
        'product_amount' => $faker->randomDigit,

        
    ];
});


4: make seed : php artisan mek:seeder ProductTableSeeder

import use App\Product;

in run add

      $count = 5;
        factory(Product::class, $count)->create();

5: add to database seeder

        $this->call(ProductTableSeeder::class);



5: run migration

php artisan migrate:refresh --seed

6: make api controller -resource 

php artisan make:controller API/ProductController --api

7: add to api.php

Route::apiResource('product', 'Api\ProductController');

8: in vue make a view

ProductView.vue in views folder

9: add to router/index.js

  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
  }
  }

import: import Products from '../views/ProductsView.vue'


10: add products tab to navbar in App.vue

                <router-link to="/products">Products</router-link> |

11: fill  index function in ProductController

import use App\Product;
import use App\Http\Resources\ProductIndexResource;


        return ProductIndexResource::collection(
            Product::all()
        );
12: create ProductIndexResource

php artisan make:resource ProductIndexResource

    return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'product_amount' => $this->product_amount
        ]; 

13: see productview.vue for rest


