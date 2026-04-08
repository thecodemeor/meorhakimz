import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-toggle',
    standalone: true,
    template: `
        <div class="toggle">
            <input
                id="toggle-daynight"
                type="checkbox"
                class="toggle__checkbox"
                [checked]="checked"
                (change)="onToggle($event)"
            >

            <label class="toggle__button" for="toggle-daynight">
                <span class="toggle__feature"></span>
            </label>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
        }

        .toggle {
            display: block;
            text-align: center;
            user-select: none;
        }

        .toggle__checkbox {
            display: none;
        }

        .toggle__button {
            --toggle-height: 70px;
            --toggle-width: 125px;
            --border-width: 5px;
            --toggle-knob-size: calc(var(--toggle-height) - 14px);

            --bg-night: #3c4145;
            --border-night: #1c1c1c;
            --knob-night: #fff;
            --knob-border-night: #e3e3c7;

            --bg-day: #9ee3fb;
            --border-day: #86c3d7;
            --knob-day: #ffdf6d;
            --knob-border-day: #e1c348;

            --cloud-border: #d3d3d3;
            --cloud-bg: #fff;

            position: relative;
            display: block;
            width: var(--toggle-width);
            height: var(--toggle-height);
            margin: 0 auto;
            border: var(--border-width) solid var(--border-night);
            border-radius: var(--toggle-height);
            background-color: var(--bg-night);
            transition: all 250ms ease-in;
            
            scale: 0.5;
            cursor: pointer;
        }

        .toggle__button::before,
        .toggle__button::after,
        .toggle__feature,
        .toggle__feature::before {
            content: '';
            display: block;
            transition: all 250ms ease-in;
        }

        .toggle__button::before {
            position: absolute;
            top: 2px;
            left: 4px;
            width: var(--toggle-knob-size);
            height: var(--toggle-knob-size);
            border: var(--border-width) solid var(--knob-border-night);
            border-radius: 50%;
            background-color: var(--knob-night);
        }

        .toggle__button::after {
            position: absolute;
            top: 62%;
            left: calc(var(--toggle-width) - var(--toggle-knob-size) - (var(--border-width) * 2) - 20px);
            z-index: 10;
            width: calc(var(--toggle-knob-size) / 5);
            height: calc(var(--toggle-knob-size) / 5);
            opacity: 0;
            border-radius: 50%;
            background-color: var(--cloud-bg);
            box-shadow:
                var(--cloud-bg) 0 0,
                var(--cloud-bg) 3px 0,
                var(--cloud-bg) 6px 0,
                var(--cloud-bg) 9px 0,
                var(--cloud-bg) 11px 0,
                var(--cloud-bg) 14px 0,
                var(--cloud-bg) 16px 0,
                var(--cloud-bg) 21px -1px 0 1px,
                var(--cloud-bg) 16px -7px 0 -2px,
                var(--cloud-bg) 7px -7px 0 1px,
                var(--cloud-border) 0 0 0 4px,
                var(--cloud-border) 6px 0 0 4px,
                var(--cloud-border) 11px 0 0 4px,
                var(--cloud-border) 16px 0 0 4px,
                var(--cloud-border) 21px -1px 0 5px,
                var(--cloud-border) 16px -7px 0 1px,
                var(--cloud-border) 7px -7px 0 5px;
            transition: opacity 100ms ease-in;
        }

        .toggle__feature {
            position: absolute;
            top: 9px;
            left: 52.5%;
            z-index: 20;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow:
                rgba(255, 255, 255, 0.1) 30px -3px 0 0,
                rgba(255, 255, 255, 0.1) 12px 10px 0 -1px,
                #fff 38px 18px 0 1px,
                rgba(255, 255, 255, 0.1) 32px 34px 0 0,
                #fff 20px 24px 0 -1.5px,
                rgba(255, 255, 255, 0.1) 5px 38px 0 1px;
            animation: starry-star 5s ease-in-out infinite;
        }

        .toggle__feature::before {
            position: absolute;
            top: -2px;
            left: -25px;
            width: 18px;
            height: 18px;
            border: 5px solid var(--knob-border-night);
            border-radius: 50%;
            background-color: var(--knob-night);
            box-shadow:
                var(--knob-border-night) -28px 0 0 -3px,
                var(--knob-border-night) -8px 24px 0 -2px;
            transform-origin: -6px 130%;
        }

        .toggle__checkbox:checked + .toggle__button {
            border-color: var(--border-day);
            background-color: var(--bg-day);
        }

        .toggle__checkbox:checked + .toggle__button::before {
            left: calc(var(--toggle-width) - var(--toggle-knob-size) - (var(--border-width) * 2) - 4px);
            border-color: var(--knob-border-day);
            background-color: var(--knob-day);
        }

        .toggle__checkbox:checked + .toggle__button::after {
            opacity: 1;
            animation: bounce-in 0.6s 0.1s backwards ease-in-out;
        }

        .toggle__checkbox:checked + .toggle__button > .toggle__feature {
            opacity: 0;
            animation: none;
        }

        .toggle__checkbox:checked + .toggle__button > .toggle__feature::before {
            left: 25px;
            transform: rotate(70deg);
        }

        @keyframes starry-star {
            50% {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.1); }
            75% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
    `]
})
export class ToggleComponent {
    @Input() checked = true;

    @Output() toggled = new EventEmitter<{ checked: boolean; event: Event }>();

    onToggle(event: Event): void {
        event.stopPropagation();

        const input = event.target as HTMLInputElement;
        this.checked = input.checked;

        this.toggled.emit({
            checked: this.checked,
            event
        });
    }
}