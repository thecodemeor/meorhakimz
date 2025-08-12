import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { animate } from 'animejs';

import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    @Output() sendLoading = new EventEmitter<boolean>();

    @Input() 
    set externalUserInput( value: string ) {
        this.userInput = value;
        this.sendMessage()
    }

    constructor(private http: HttpClient) {}

    private readonly BACKEND_PROXY_URL: string = 'http://localhost:3000/api/chat';

    chatHistory: ChatMessage[] = [];
    loading: boolean = false;
    private shouldScrollToBottom: boolean = false;

    ngOnInit(): void {
        // this.chatHistory.push({
        //     role: 'model',
        //     text: 'Hey there! I\'m Meor Hakim, but you can just call me Meor. I\'m a front-end developer specializing in AI. Nice to meet you! What\'s your name? 😊'
        // });
        setTimeout(() => this.scrollToBottom(), 0);
    }
    ngAfterViewInit(): void {
        if (this.chatContainerRef && this.chatContainerRef.nativeElement.querySelector('h1')) {
            animate('h1', {
                opacity: { from: '0' },
                easing: 'easeOutBack',
                duration: 1000,
                delay: 500
            });
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
    signalPersona: boolean = false
    signalProjekt: boolean = false
    signalWebStack: boolean = false
    signalCompetenze: boolean = false
    signalKontakt: boolean = false
    async sendMessage(): Promise<void> {
        this.chatHistory = []
        this.signalPersona = false
        this.signalProjekt = false
        this.signalWebStack = false
        this.signalCompetenze = false
        this.signalKontakt = false

        const currentMessage = this.userInput.trim();

        if (currentMessage === '') {
            return;
        }

        const userMessage: ChatMessage = { role: 'user', text: currentMessage };
        this.chatHistory.push(userMessage);

        this.userInput = '';

        this.loading = true;
        this.sendLoading.emit(this.loading);
        this.shouldScrollToBottom = true;

        const payload = { contents: this.chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }))};

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<any>(this.BACKEND_PROXY_URL, payload, { headers })
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('HTTP Error:', error);
                let errorMessageText: string;

                if (error.error instanceof ErrorEvent) {
                    errorMessageText = `Network error: ${error.error.message}. Please check your connection.`;
                } else if (error.status === 0) {
                    errorMessageText = 'Could not connect to the backend service. Is the server running?';
                } else if (error.status >= 400 && error.status < 500) {
                        errorMessageText = `Backend error (${error.status}): ${error.error?.error || error.statusText}.`;
                } else {
                    errorMessageText = `An unexpected server error occurred (${error.status}). Please try again later.`;
                }

                const errorMessage: ChatMessage = { role: 'model', text: errorMessageText };
                this.chatHistory.push(errorMessage); // Add error message to history
                return throwError(() => new Error(errorMessageText)); 
            }),
            // Ensure loading state is reset whether successful or failed
            finalize(() => {
                this.loading = false;
                this.sendLoading.emit(this.loading);
            })
        )
        .subscribe({
            next: (result: any) => {
                if (result?.candidates?.length > 0 && result.candidates[0]?.content?.parts?.length > 0) {
                    let aiResponseText = result.candidates[0].content.parts[0].text;
                    if (aiResponseText.includes('getPersonal')) {
                        this.signalPersona= true
                        aiResponseText = aiResponseText.replace('getPersonal', '').trim();
                    } else if (aiResponseText.includes('getProject')) {
                        this.signalProjekt= true
                        aiResponseText = aiResponseText.replace('getProjects', '').trim();
                        aiResponseText += "Which would you like to explore first — graphic design, websites, photography, or videography?";
                    } else if (aiResponseText.includes('getWebsite')) {
                        this.signalWebStack= true
                        aiResponseText = aiResponseText.replace('getWebsite', '').trim();
                    } else if (aiResponseText.includes('getSkills')) {
                        this.signalCompetenze= true
                        aiResponseText = aiResponseText.replace('getSkills', '').trim();
                    } else if (aiResponseText.includes('getContact')) {
                        this.signalKontakt= true
                        aiResponseText = aiResponseText.replace('getContact', '').trim();
                        aiResponseText += "You can find all my contact info and socials here! Feel free to hit me up anytime, I'd be happy to chat! 😉";
                    } else {
                        console.log(aiResponseText, 'mcb2')
                    }

                    const aiMessage: ChatMessage = { role: 'model', text: aiResponseText };
                    this.chatHistory.push(aiMessage);
                } else {
                    const errorMessage: ChatMessage = {
                        role: 'model',
                        text: 'Sorry, I received an empty or malformed response from the AI. Please try again.'
                    };
                    this.chatHistory.push(errorMessage);
                }
                if (this.shouldScrollToBottom) {
                    this.scrollToBottom();
                    this.shouldScrollToBottom = false;
                }
            },
            error: (err) => {
                console.error('Chat sending failed:', err.message);
            }
        });
    }
}
