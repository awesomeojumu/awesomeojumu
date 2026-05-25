<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/work', [PageController::class, 'work'])->name('work');
Route::get('/faith', [PageController::class, 'faith'])->name('faith');
Route::get('/words', [PageController::class, 'words'])->name('words');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

Route::get('/sitemap.xml', function () {
    $urls = [
        ['loc' => route('home'), 'priority' => '1.0'],
        ['loc' => route('work'), 'priority' => '0.9'],
        ['loc' => route('faith'), 'priority' => '0.8'],
        ['loc' => route('words'), 'priority' => '0.8'],
        ['loc' => route('contact'), 'priority' => '0.7'],
    ];

    return response()->view('sitemap', ['urls' => $urls], 200)
        ->header('Content-Type', 'application/xml');
})->name('sitemap');
