import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { animate } from 'animejs';

import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs'; // For re-throwing errors after handling

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

@Component({
    selector: 'app-chat',
    standalone: false,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterViewInit {
    @ViewChild('messagesEnd') messagesEndRef!: ElementRef;
    @ViewChild('chatContainer') chatContainerRef!: ElementRef;
    // Emits the loading status to a parent component
    @Output() sendLoading = new EventEmitter<boolean>();

    // Input for external control of user input (e.g., from a parent component's form)
    // Avoid using a setter for direct input binding unless specific side effects are needed.
    // Instead, a direct property or a method called by the parent would be cleaner.
    // For this example, I'll remove the setter/getter and assume direct input binding.
    @Input() 
    set externalUserInput( value: string ) {
        this.userInput = value;
        this.sendMessage()
    }

    constructor(private http: HttpClient) {}

    // URL for your backend proxy
    private readonly BACKEND_PROXY_URL: string = 'http://localhost:3000/api/chat';

    // Array to store the conversation history
    chatHistory: ChatMessage[] = [];
    loading: boolean = false;
    private shouldScrollToBottom: boolean = false;

    ngOnInit(): void {
        // Initialize with the AI's first greeting to establish context
        // This makes the conversation feel more natural from the start.
        // this.chatHistory.push({
        //     role: 'model',
        //     text: 'Hey there! I\'m Meor Hakim, but you can just call me Meor. I\'m a front-end developer specializing in AI. Nice to meet you! What\'s your name? 😊'
        // });
        // Trigger scroll after initial message
        this.shouldScrollToBottom = true;
        setTimeout(() => this.scrollToBottom(), 0);
    }
    ngAfterViewInit(): void {
        if (this.chatContainerRef && this.chatContainerRef.nativeElement.querySelector('h1')) {
            animate('h1', {
                opacity: { from: '0' },
                easing: 'easeOutBack',
                duration: 1000,
                delay: 3000
            });
        }
        if (this.shouldScrollToBottom) {
             this.scrollToBottom();
             this.shouldScrollToBottom = false;
        }
    }

    scrollToBottom(): void {
        try {
            if (this.messagesEndRef && this.messagesEndRef.nativeElement) {
                this.messagesEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (err) {
            console.error('Error scrolling to bottom:', err);
        }
    }

    userInput: string = ''
    async sendMessage(): Promise<void> {
        this.chatHistory = []

        // Use `externalUserInput` for the message to send
        const currentMessage = this.userInput.trim();

        if (currentMessage === '') {
            return; // Don't send empty messages
        }

        // Add user message to chat history
        const userMessage: ChatMessage = { role: 'user', text: currentMessage };
        this.chatHistory.push(userMessage);

        // Clear the input field immediately
        this.userInput = '';

        // Set loading state and emit it
        this.loading = true;
        this.sendLoading.emit(this.loading);
        this.shouldScrollToBottom = true; // Flag to scroll after response

        // Prepare payload for the backend.
        // Send the entire chatHistory, as this is what gives the AI context.
        const payload = { contents: this.chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }))};

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // Use RxJS subscribe pattern instead of .toPromise()
        this.http.post<any>(this.BACKEND_PROXY_URL, payload, { headers })
        .pipe(
            // Catch any HTTP errors
            catchError((error: HttpErrorResponse) => {
                console.error('HTTP Error:', error);
                let errorMessageText: string;

                if (error.error instanceof ErrorEvent) {
                    // Client-side or network error
                    errorMessageText = `Network error: ${error.error.message}. Please check your connection.`;
                } else if (error.status === 0) {
                    // Backend is not reachable (e.g., CORS error, server not running)
                    errorMessageText = 'Could not connect to the backend service. Is the server running?';
                } else if (error.status >= 400 && error.status < 500) {
                        // Client-side errors (4xx) from backend
                        errorMessageText = `Backend error (${error.status}): ${error.error?.error || error.statusText}.`;
                } else {
                    // Server-side errors (5xx) or other unhandled errors
                    errorMessageText = `An unexpected server error occurred (${error.status}). Please try again later.`;
                }

                const errorMessage: ChatMessage = { role: 'model', text: errorMessageText };
                this.chatHistory.push(errorMessage); // Add error message to history
                return throwError(() => new Error(errorMessageText)); // Re-throw for downstream handling if needed
            }),
            // Ensure loading state is reset whether successful or failed
            finalize(() => {
                this.loading = false;
                this.sendLoading.emit(this.loading);
                // Ensure scroll to bottom after response, even if error
                if (this.shouldScrollToBottom) {
                    this.scrollToBottom();
                    this.shouldScrollToBottom = false;
                }
            })
        )
        .subscribe({
            next: (result: any) => {
                // Check for valid response structure from Gemini
                if (result?.candidates?.length > 0 && result.candidates[0]?.content?.parts?.length > 0) {
                    const aiResponseText = result.candidates[0].content.parts[0].text;
                    const aiMessage: ChatMessage = { role: 'model', text: aiResponseText };
                    this.chatHistory.push(aiMessage);
                } else {
                    const errorMessage: ChatMessage = {
                        role: 'model',
                        text: 'Sorry, I received an empty or malformed response from the AI. Please try again.'
                    };
                    this.chatHistory.push(errorMessage);
                }
                this.scrollToBottom(); // Scroll after successful response
            },
            error: (err) => {
                // Error is already handled and pushed to chatHistory in catchError pipe.
                // This block can be used for logging or specific final UI updates for an error.
                console.error('Chat sending failed:', err.message);
            }
        });
    }
}
