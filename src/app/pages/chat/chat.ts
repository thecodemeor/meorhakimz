import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

// --- Extra Component --- //
import { LogoComponent } from 'src/assets/shared/logo/logo.component';
import { SetPersonalComponent } from 'src/assets/shared/set-personal.component';
import { SetProjectComponent } from 'src/assets/shared/set-projects.component';
import { SetSkillsComponent } from 'src/assets/shared/set-skills/set-skills.component';
import { SetContactComponent } from 'src/assets/shared/set-contact.component';

import { animate } from 'animejs';

import { LoadingTemplate } from 'src/assets/components/loading.component';
import { GravitiComponent } from 'src/assets/components/graviti-star.component';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        LogoComponent,
        SetPersonalComponent,
        SetProjectComponent,
        SetSkillsComponent,
        SetContactComponent,
        LoadingTemplate,
        GravitiComponent
    ],
    templateUrl: './chat.html',
    styleUrl: './chat.scss',
})
export class Chat implements OnInit, AfterViewInit {
    @ViewChild('chatContainer') chatContainerRef!: ElementRef<HTMLElement>;

    @Output() sendLoading = new EventEmitter<boolean>();

    private readonly BACKEND_PROXY_URL = 'http://localhost:3000/api/chat';

    chatHistory: ChatMessage[] = [];
    loading = false;
    userInput = '';

    signalPersona = false;
    signalProjekt = false;
    signalCompetenze = false;
    signalKontakt = false;

    private isProcessingMessage = false;
    private lastHandledText = '';
    private lastHandledAt = 0;
    private readonly DUPLICATE_WINDOW_MS = 1200;

    @Input()
    set externalUserInput(value: string) {
        const trimmed = value?.trim();
        if (!trimmed) return;

        this.processIncomingMessage(trimmed);
    }

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        if (this.chatContainerRef?.nativeElement?.querySelector('h1')) {
            animate('h1', {
                opacity: { from: '0' },
                easing: 'easeOutBack',
                duration: 1000,
                delay: 500
            });
        }
    }

    private processIncomingMessage(message: string): void {
        const normalized = this.normalizeMessage(message);
        const now = Date.now();

        const isDuplicate =
            normalized === this.lastHandledText &&
            now - this.lastHandledAt < this.DUPLICATE_WINDOW_MS;

        if (this.isProcessingMessage || isDuplicate) {
            return;
        }

        this.lastHandledText = normalized;
        this.lastHandledAt = now;

        this.userInput = message;
        void this.sendMessage(message);
    }

    private normalizeMessage(message: string): string {
        return message.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    private resetSignals(): void {
        this.signalPersona = false;
        this.signalProjekt = false;
        this.signalCompetenze = false;
        this.signalKontakt = false;
    }

    private resetChat(): void {
        this.chatHistory = [];
        this.resetSignals();
    }

    private appendMessage(role: 'user' | 'model', text: string): void {
        const trimmed = text.trim();
        if (!trimmed) return;

        const lastMessage = this.chatHistory[this.chatHistory.length - 1];

        if (
            lastMessage &&
            lastMessage.role === role &&
            lastMessage.text.trim() === trimmed
        ) {
            return;
        }

        this.chatHistory.push({ role, text: trimmed });
    }

    private handlePresetPrompt(message: string): boolean {
        const normalized = this.normalizeMessage(message);

        this.resetChat();

        if (normalized === 'preset:me') {
            this.appendMessage('user', 'Tell me about yourself.');
            this.appendMessage(
                'model',
                `Sure. I'm Meor Hakim, a Front End Developer who enjoys building modern, interactive, and user friendly web experiences. I focus on creating clean interfaces, thoughtful UI systems, and projects that blend design with functionality.`
            );
            this.signalPersona = true;
            return true;
        }

        if (normalized === 'preset:projects') {
            this.appendMessage('user', 'Show me your projects.');
            this.appendMessage(
                'model',
                `Absolutely. Here are some of the projects I have worked on, ranging from UI systems to interactive web experiences. You can explore them below.`
            );
            this.signalProjekt = true;
            return true;
        }

        if (normalized === 'preset:skills') {
            this.appendMessage('user', 'What skills do you have?');
            this.appendMessage(
                'model',
                `Here is a quick overview of my technical skills and strengths. I enjoy turning ideas into polished and responsive frontend experiences.`
            );
            this.signalCompetenze = true;
            return true;
        }

        if (normalized === 'preset:contact') {
            this.appendMessage('user', 'How can I contact you?');
            this.appendMessage(
                'model',
                `Here are my contact details and socials. Feel free to reach out anytime.`
            );
            this.signalKontakt = true;
            return true;
        }

        return false;
    }

    async sendMessage(messageOverride?: string): Promise<void> {
        const currentMessage = (messageOverride ?? this.userInput).trim();

        if (!currentMessage || this.loading || this.isProcessingMessage) {
            return;
        }

        this.isProcessingMessage = true;

        if (this.handlePresetPrompt(currentMessage)) {
            this.userInput = '';
            this.isProcessingMessage = false;
            return;
        }

        this.resetChat();
        this.appendMessage('user', currentMessage);
        this.userInput = '';

        this.loading = true;
        this.sendLoading.emit(true);

        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: currentMessage }]
                }
            ]
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const startedAt = performance.now();

        this.http.post<any>(this.BACKEND_PROXY_URL, payload, { headers })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessageText = 'Something went wrong. Please try again.';

                    if (error.error instanceof ErrorEvent) {
                        errorMessageText = `Network error: ${error.error.message}. Please check your connection.`;
                    } else if (error.status === 0) {
                        errorMessageText = 'Could not connect to the backend service. Is the server running?';
                    } else if (error.status >= 400 && error.status < 500) {
                        errorMessageText = `Backend error (${error.status}): ${error.error?.error || error.statusText}.`;
                    } else {
                        errorMessageText = `An unexpected server error occurred (${error.status}). Please try again later.`;
                    }

                    this.appendMessage('model', errorMessageText);
                    return throwError(() => new Error(errorMessageText));
                }),
                finalize(() => {
                    console.log(
                        '[Frontend] Total wait:',
                        Math.round(performance.now() - startedAt),
                        'ms'
                    );

                    this.loading = false;
                    this.sendLoading.emit(false);
                    this.isProcessingMessage = false;
                })
            )
            .subscribe({
                next: (result: any) => {
                    const rawText =
                        result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

                    if (!rawText) {
                        this.appendMessage(
                            'model',
                            'Sorry, I received an empty or malformed response from the AI. Please try again.'
                        );
                        return;
                    }

                    let aiResponseText = rawText;

                    if (aiResponseText.includes('getPersonal')) {
                        this.signalPersona = true;
                        aiResponseText = aiResponseText.replace('getPersonal', '').trim();
                    } else if (aiResponseText.includes('getProject')) {
                        this.signalProjekt = true;
                        aiResponseText = aiResponseText.replace('getProject', '').trim();

                        if (aiResponseText.length > 0) {
                            aiResponseText += ' ';
                        }

                        aiResponseText += 'Which project would you like to explore first?';
                    } else if (aiResponseText.includes('getSkills')) {
                        this.signalCompetenze = true;
                        aiResponseText = aiResponseText.replace('getSkills', '').trim();
                    } else if (aiResponseText.includes('getContact')) {
                        this.signalKontakt = true;
                        aiResponseText = aiResponseText.replace('getContact', '').trim();

                        if (aiResponseText.length > 0) {
                            aiResponseText += ' ';
                        }

                        aiResponseText += 'You can find all my contact info and socials here.';
                    }

                    this.appendMessage('model', aiResponseText || 'Done.');
                },
                error: (err) => {
                    console.error('Chat sending failed:', err.message);
                }
            });
    }
}