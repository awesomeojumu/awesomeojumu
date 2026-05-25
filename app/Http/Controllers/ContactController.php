<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    private const TOPIC_LABELS = [
        'consulting' => 'Consulting / Build Enquiry',
        'faith' => 'Faith',
        'collaboration' => 'Collaboration',
        'other' => 'Something Else',
    ];

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'topic' => ['required', 'in:consulting,faith,collaboration,other'],
            'message' => ['required', 'string', 'max:10000'],
        ]);

        $topicLabel = self::TOPIC_LABELS[$validated['topic']];
        $to = config('mail.contact_to', 'planexiglobalconsult@gmail.com');

        try {
            Mail::raw(
                "Name: {$validated['name']}\nEmail: {$validated['email']}\nTopic: {$topicLabel}\n\n{$validated['message']}\n",
                function ($message) use ($validated, $topicLabel, $to) {
                    $message->to($to)
                        ->replyTo($validated['email'], $validated['name'])
                        ->subject('[awesomeojumu.com] ' . $topicLabel . ' — ' . $validated['name']);
                }
            );
        } catch (\Throwable) {
            return response()->json([
                'ok' => false,
                'error' => 'Mail could not be sent. Please email planexiglobalconsult@gmail.com directly.',
            ], 500);
        }

        return response()->json(['ok' => true]);
    }
}
