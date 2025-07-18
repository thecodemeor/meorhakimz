import { Component, } from '@angular/core';

@Component({
    selector: 'app-graviti-star',
    standalone: false,
    template: `
    <div class="glow"></div>
        <div class="animation-wrapper">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>
    `,
   styles: `
        $color-bg: #0F1A2A;
        $color-particle-0: var( --primary );
        $color-particle-1: var( --primary );
        $color-particle-2: var( --primary );
        $color-particle-3: var( --primary );
        $color-particle-4: var( --primary );
        $spacing: 2560px;
        $time-1: 10s;
        $time-2: 12s;
        $time-3: 15s;
        $time-4: 20s;

        :host {
            position: absolute;
            bottom: 0; left: 0;
            display: block;
            width: 100%; height: 5rem;
        }

        /* Pauls awesome mixin */
        @function particles($max) {
            $val: 0px 0px $color-particle-0;
            @for $i from 1 through $max {
                $colcol: random(5)-1;
                @if $colcol == 0 { 
                    $val: #{$val},
                    random($spacing)+px random($spacing)+px $color-particle-0;
                } 
                @else if $colcol == 1 { 
                    $val: #{$val},
                    random($spacing)+px random($spacing)+px $color-particle-1;
                } 
                @else if $colcol == 2 { 
                    $val: #{$val},
                    random($spacing)+px random($spacing)+px $color-particle-2;
                } 
                @else if $colcol == 3 { 
                    $val: #{$val},
                    random($spacing)+px random($spacing)+px $color-particle-3;
                } @else if $colcol == 4 { 
                    $val: #{$val},
                    random($spacing)+px random($spacing)+px $color-particle-4;
                } 
            }
            @return $val;
        }

        @mixin particles($max) {
            box-shadow: particles($max);
        }
        
        .glow {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%; height: 100%;
            background: var( --primary );
            mask-image: radial-gradient( 60% 70% at 50% 130%, rgba( 0, 0, 0, 1 ), transparent);
            -webkit-mask-image: radial-gradient( 60% 70% at 50% 130%, rgba( 0, 0, 0, 1 ), transparent);
            z-index: -2;
        }
        .animation-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%; height: 100%;
            overflow: hidden;
            background: transparent;
            mask-image: radial-gradient( 60% 70% at 50% 130%, rgba( 0, 0, 0, 1 ), transparent);
            -webkit-mask-image: radial-gradient( 60% 70% at 50% 80%, rgba( 0, 0, 0, 1 ), transparent);
            z-index: -1;
        }

        .particle,
        .particle:after {
            background: transparent;
            border-radius: 100px;
        }

        .particle:after {
            position: absolute;
            content: "";
            top: $spacing;
        }

            .particle-1 {
            animation: animParticle $time-1 linear infinite;
            @include particles( 1000 );
            height: 2px;
            width: 2px;
        }

        .particle-1:after {
            @include particles( 1000 );
            height: 4px;
            width: 4px;
        }

        .particle-2 {
            animation: animParticle $time-2 linear infinite;
            @include particles( 600 );
            height: 3px;
            width: 3px;
        }

        .particle-2:after {
            @include particles( 600 );
            height: 6px;
            width: 6px;
        }

        .particle-3 {
            animation: animParticle $time-3 linear infinite;
            @include particles( 200 );
            height: 4px;
            width: 4px;
        }

        .particle-3:after {
            @include particles( 200 );
            height: 8px;
            width: 8px;
        }

        .particle-4 {
            animation: animParticle $time-4 linear infinite;
            @include particles( 800 );
            height: 5px;
            width: 5px;
        }

        .particle-4:after {
            @include particles( 800 );
            height: 10px;
            width: 10px;
        }

        @keyframes animParticle {
            from { transform: translateY( 0px ); }
            to   { transform: translateY( $spacing * -1 ); }
        }

        .page-wrapper {
            text-align: center;
            color: #fff;
            z-index: 2;
        }
   `
})
export class GravitiComponent {}