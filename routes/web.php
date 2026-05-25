<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/work', [PageController::class, 'work'])->name('work');
Route::get('/faith', [PageController::class, 'faith'])->name('faith');
Route::get('/words', [PageController::class, 'words'])->name('words');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
