import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Service
import { animate, stagger } from 'animejs';

interface ChatMessage {
    role: 'user' | 'model'; // 'user' for user messages, 'model' for AI responses
    text: string;
}

@Component({
    selector: 'app-chat',
    standalone: false,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
    @ViewChild( 'messagesEnd' ) messagesEndRef!: ElementRef;
    @ViewChild( 'chatContainer' ) chatContainerRef!: ElementRef;
    @Output() sendLoading = new EventEmitter< boolean >();
    
    constructor( private http: HttpClient ) {}
    private readonly BACKEND_PROXY_URL: string = 'http://localhost:3000/api/chat';
    private _userInput: string = '';

    chatHistory: ChatMessage[] = [];
    loading: boolean = false;

    ngOnInit(): void {}

    ngAfterViewChecked(): void {
        // this.scrollToBottom();
    }

    @Input()
    set userInput( value: string ) {
        this._userInput = value;
        this.handleKeyPressFromInput()
        this.scrolldown = true
    }

    get userInput(): string {
        return this._userInput;
    }

    handleKeyPressFromInput(): void {
        if ( this._userInput.trim() !== '' ) {
            this.sendMessage();
        }
    }

    scrolldown: boolean = false
    scrollToBottom(): void {
        try {
            this.messagesEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
        } catch ( err ) {
            console.error( 'Error scrolling to bottom:', err );
        }
    }

    async sendMessage(): Promise<void> {
        if ( this.userInput.trim() === '' ) return;

        // 🧹 Clear previous messages
        this.chatHistory = [];

        const userMessage: ChatMessage = { role: 'user', text: this.userInput };
        this.chatHistory.push( userMessage );
        this.userInput = '';
        this.loading = true;
        this.sendLoading.emit( this.loading )

        try {
            const payloadContents = [
                {
                    role: userMessage.role,
                    parts: [{ text: userMessage.text }]
                }
            ];

            const payload = { contents: payloadContents };

            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });

            const result: any = await this.http.post( this.BACKEND_PROXY_URL, payload, { headers }).toPromise();

            if ( result?.candidates?.length > 0 && result.candidates[ 0 ]?.content?.parts?.length > 0 ) {
                const aiResponseText = result.candidates[ 0 ].content.parts[ 0 ].text;
                const aiMessage: ChatMessage = { role: 'model', text: aiResponseText };
                this.chatHistory.push( aiMessage );
                this.scrollToBottom();
                setTimeout(() => {
                    this.scrolldown = false
                }, 100);
            } else {
                const errorMessage: ChatMessage = {
                    role: 'model',
                    text: 'Sorry, I could not get a response from the AI. Please try again.'
                };
                this.chatHistory.push( errorMessage );
            }
        } catch ( error ) {
            const errorMessage: ChatMessage = {
                role: 'model',
                text: 'An error occurred while connecting to the AI service. Please check your network or ensure the backend is running.'
            };
            this.chatHistory.push( errorMessage );
        } finally {
            this.loading = false;
            this.sendLoading.emit( this.loading )
        }
    }
}
