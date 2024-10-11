/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

export interface DataChatQA {
  question?: string;
  response?: string; // answer
  componentData?: ComponentData;
  imageData?: string;
  error?: string;
  explanation?: string;
  noPrompt?: boolean;
  namespace?: string;
  paragraphs?: string[];
  similarities?: number[];
  userIsHappy?: boolean;
}

export interface ComponentData {
  component: any;
  inputs?: {[key: string]: any};
}

export interface CompletionRequest {
  dinoGraphql: string;
  authToken: string;
  username: string;
  namespace: string;
  info: string[];
  chat: string[];
}

export interface CompletionResponse {
  error?: string;
  paragraphs?: string[];
  similarities?: number[];
  answer?: string;
}

export interface QA extends CompletionResponse {
  question: string;
  namespace: string;
  userIsHappy?: boolean;
}
