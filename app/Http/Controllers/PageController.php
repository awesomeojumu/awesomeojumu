<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class PageController extends Controller
{
    public function home(): View
    {
        return view('pages.home', [
            'pageTitle' => 'Home',
            'pageDescription' => 'Ayobami Ojumu — I am a wild card, one whose purpose is not written in stone.',
        ]);
    }

    public function work(): View
    {
        return view('pages.work', [
            'pageTitle' => 'Work',
            'pageDescription' => 'The work is the evidence — systems, strategy, and software for organisations navigating complexity.',
        ]);
    }

    public function faith(): View
    {
        return view('pages.faith', [
            'pageTitle' => 'Faith',
            'pageDescription' => 'Faith is the operating system underneath everything — conviction, purpose, and meaningful work.',
        ]);
    }

    public function words(): View
    {
        return view('pages.words', [
            'pageTitle' => 'Words',
            'pageDescription' => 'Thinking out loud — essays, reflections, and observations on work, faith, and craft.',
        ]);
    }

    public function contact(): View
    {
        return view('pages.contact', [
            'pageTitle' => 'Contact',
            'pageDescription' => 'Get in touch — consulting, build, faith conversations, and collaboration.',
            'defaultTopic' => request()->query('topic', ''),
        ]);
    }
}
