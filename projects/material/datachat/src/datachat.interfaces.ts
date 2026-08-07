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
  vectors?: CompletionVector[];
  userIsHappy?: boolean;
  followUpQuestions?: string[];
  log_id?: string | number;
  /**
   * True when the User can rate the entry even if the backend returned no
   * log id for it, as it happens for the datachat answers.
   */
  feedbackEnabled?: boolean;
  /**
   * Number of rows of the complete result. The displayed table may hold fewer.
   */
  totalRows?: number;
  /**
   * Number of columns of the complete result. The displayed table may hold fewer.
   */
  totalColumns?: number;
  /**
   * Number of rows actually displayed
   */
  previewRows?: number;
  /**
   * Number of columns actually displayed
   */
  previewColumns?: number;
  /**
   * True when the displayed table is only a subset of the complete result
   */
  truncated?: boolean;
  /**
   * Server relative path of the complete result, downloadable as a csv file.
   * An export lives as long as the chat session, so it is never stored with
   * the conversation.
   */
  downloadUrl?: string;
  /**
   * Suggested file name for the downloaded complete result
   */
  downloadFilename?: string;
  /**
   * A caveat about the result itself, to be displayed verbatim
   */
  note?: string;
  /**
   * The charts to be displayed alongside the answer
   */
  charts?: DataChatChartSpec[];
  /**
   * The rows of a tabular answer. They are stored with the conversation, so
   * that its table can be built again when the conversation is displayed
   * again: a component instance cannot be stored.
   */
  tableData?: unknown;
}

/**
 * The state of a chart specification, as resolved by DataChatChart
 */
export type DataChatChartStatus = 'ok' | 'invalid' | 'empty';

/**
 * The response types returned by the DataChat API
 */
export type DataChatResponseType =
  | 'str'
  | 'dataframe'
  | 'image'
  | 'dict'
  | 'text_and_image'
  | 'chart';

/**
 * A chart specification, in the Chart.js 'data' shape plus some semantic hints.
 * The API never sends colors nor a Chart.js 'options' object: palette, fonts, legend
 * and theming are up to the client.
 */
export interface DataChatChartSpec {
  /**
   * The chart type, i.e. bar | line | pie | doughnut | scatter
   */
  type: string;
  /**
   * The category labels, one per point. Null for scatter charts.
   */
  labels?: string[] | null;
  datasets: DataChatChartDataset[];
  title?: string | null;
  /**
   * The x axis label. It may be a whole survey question, so expect very long strings.
   */
  x_label?: string | null;
  /**
   * The y axis label, i.e. 'numero di risposte'
   */
  y_label?: string | null;
  /**
   * True when a multi series bar chart reads better stacked
   */
  stacked?: boolean;
  /**
   * True when the bars of a bar chart run left to right, which the API chooses for
   * many categories or long labels. The categories keep the order they arrive in.
   */
  horizontal?: boolean;
  [key: string]: any;
}

/**
 * A single series of a chart specification
 */
export interface DataChatChartDataset {
  label?: string | null;
  /**
   * The series values, parallel to the chart labels, or the {x, y} points of a
   * scatter chart. A null value is a missing value, and must be displayed as a gap,
   * never as a zero.
   */
  data: (number | null)[] | {x: number; y: number}[];
  /**
   * True for area charts
   */
  fill?: boolean;
  [key: string]: any;
}

/**
 * The 'response' object of a DataChat API reply.
 * Additive fields may appear at any time, so unknown fields must be tolerated and
 * a missing key and a null value always mean the same thing.
 */
export interface DataChatResponsePayload {
  type: DataChatResponseType | string;
  value: any;
  /**
   * Rows of the complete result
   */
  total_rows?: number | null;
  /**
   * Columns of the complete result
   */
  total_columns?: number | null;
  /**
   * Rows present in 'value'
   */
  preview_rows?: number | null;
  /**
   * True when 'value' is a subset of the complete result. Absent means false.
   */
  truncated?: boolean;
  /**
   * Server relative path of the complete result csv, i.e. /datachat/export/<token>
   */
  download_url?: string | null;
  /**
   * Suggested file name of the complete result csv
   */
  download_filename?: string | null;
  /**
   * A caveat about the result. Absent when there is none, never null.
   */
  note?: string;
  /**
   * Zero or more charts to be displayed alongside the value.
   * Absent when there are none, never null and never empty.
   */
  charts?: DataChatChartSpec[];
}

/**
 * A DataChat API reply
 */
export interface DataChatApiResponse {
  response: DataChatResponsePayload;
  explanation?: string | null;
  log_id?: string | number | null;
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
  answer?: string;
  vectors?: CompletionVector[];
  follow_ups?: string[];
  log_id?: string | number;
}

export interface QA extends CompletionResponse {
  question: string;
  namespace: string;
  userIsHappy?: boolean;
}

export interface CompletionVector {
  similarity: number;
  metadata: VectorMetadata;
}

export interface VectorMetadata {
  text: string;
  mimetype?: Mimetype[] | Mimetype;
  page?: number;
  source?: string; // name of the file
  url?: string;
  image_url?: string; // a pdf (with a given url) might also contain an image
  start_time?: number;
  token_count?: number;
}

export type Mimetype =
  'image/jpeg' | 'image/png' | 'video/mp4' | 'audio/mp3' | 'application/pdf' | 'text' | 'table' | 'null';
