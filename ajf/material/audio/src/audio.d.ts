/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { AjfAudio } from '@ajf/core/audio';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class AjfAudioComponent extends AjfAudio implements OnDestroy {
    private _sanitizer;
    readonly: boolean;
    isRecording: boolean;
    private mediaRecorder;
    private audioChunks;
    constructor(cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnDestroy(): void;
    /**
     * Sanitizes the audio source for playback, either from the base64 content
     * or, as a fallback, from the stored url.
     */
    get safeAudioSrc(): SafeUrl | string | null;
    startRecording(): Promise<void>;
    stopRecording(): void;
    /**
     * Clears the recording value and preview (keeps the old url to delete old audio from storage)
     */
    clearRecording(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfAudioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfAudioComponent, "ajf-audio", never, { "readonly": { "alias": "readonly"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=audio.d.ts.map