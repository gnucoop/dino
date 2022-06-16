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

/**
 * Nhost Storage Upload api response
 */
export interface StorageUploadResponse {
  /**
   * UUID v4 identifier for the file.
   */
  id: string;

  /**
   * upload response
   */
  isUploaded: boolean;

  /**
   * Mimetype of the file
   */
  mimeType: string;

  /**
   * The name of the file
   */
  name: string;

  /**
   * The size of the file
   */
  size: number;

  /**
   * The public url for the file in the storage
   */
  filePublicUrl?: string;

  /**
   * The nhost bucket id
   */
  bucketId?: string;

  /**
   * Creation timestamp.
   */
  createdAt: string;

  /**
   * Creation timestamp.
   */
  updatedAt: string;

  /**
   * UUID v4 identifier for the user.
   */
  uploadedByUserId?: string;

  /**
   * The etag
   */
  etag?: string;

  /**
   * Error message
   */
  error?: any;
}
