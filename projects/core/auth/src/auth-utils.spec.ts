import {
  decodeJwt,
  hasJwtAuthError,
  isTokenExpired,
  TOKEN_EXPIRY_SKEW_SECONDS,
  tokenExpiresAt,
  tokenIssuedAt,
} from './public_api';

/**
 * Builds a JWT-shaped string carrying the given payload.
 */
function buildToken(payload: {[key: string]: any}): string {
  const base64 = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_');
  return `header.${base64}.signature`;
}

const nowSeconds = () => Math.floor(new Date().getTime() / 1000);

describe('auth-utils', () => {
  describe('decodeJwt', () => {
    it('should decode a well formed token', () => {
      const token = buildToken({exp: 1700000000, sub: 'user-id'});
      expect(decodeJwt(token)?.sub).toBe('user-id');
    });

    it('should return null instead of throwing on malformed tokens', () => {
      expect(decodeJwt(null)).toBeNull();
      expect(decodeJwt('')).toBeNull();
      expect(decodeJwt('not-a-jwt')).toBeNull();
      expect(decodeJwt('header.')).toBeNull();
      expect(decodeJwt('header.!!!not-base64!!!.signature')).toBeNull();
      expect(decodeJwt(`header.${btoa('not json')}.signature`)).toBeNull();
    });
  });

  describe('tokenExpiresAt / tokenIssuedAt', () => {
    it('should convert the claims to epoch milliseconds', () => {
      const token = buildToken({exp: 1700000000, iat: 1699999000});
      expect(tokenExpiresAt(token)).toBe(1700000000000);
      expect(tokenIssuedAt(token)).toBe(1699999000000);
    });

    it('should return null when the claims are missing or invalid', () => {
      expect(tokenExpiresAt(buildToken({sub: 'x'}))).toBeNull();
      expect(tokenExpiresAt(buildToken({exp: 'soon'}))).toBeNull();
      expect(tokenIssuedAt(buildToken({exp: 1700000000}))).toBeNull();
      expect(tokenExpiresAt('garbage')).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should accept a token valid well beyond the skew window', () => {
      expect(isTokenExpired(buildToken({exp: nowSeconds() + 600}))).toBe(false);
    });

    it('should reject an expired token', () => {
      expect(isTokenExpired(buildToken({exp: nowSeconds() - 1}))).toBe(true);
    });

    it('should reject a token expiring within the skew window', () => {
      const token = buildToken({exp: nowSeconds() + TOKEN_EXPIRY_SKEW_SECONDS - 2});
      expect(isTokenExpired(token)).toBe(true);
      // The very same token is still usable with no tolerance applied.
      expect(isTokenExpired(token, 0)).toBe(false);
    });

    it('should treat a missing or undecodable token as expired', () => {
      expect(isTokenExpired(null)).toBe(true);
      expect(isTokenExpired('garbage')).toBe(true);
      expect(isTokenExpired(buildToken({sub: 'no-exp'}))).toBe(true);
    });
  });

  describe('hasJwtAuthError', () => {
    it('should detect a Hasura JWTExpired error message', () => {
      expect(
        hasJwtAuthError({errors: [{message: 'Could not verify JWT: JWTExpired'}]}),
      ).toBe(true);
    });

    it('should detect an invalid-jwt extension code', () => {
      expect(hasJwtAuthError({errors: [{extensions: {code: 'invalid-jwt'}}]})).toBe(true);
    });

    it('should ignore unrelated bodies and errors', () => {
      expect(hasJwtAuthError(null)).toBe(false);
      expect(hasJwtAuthError('a string')).toBe(false);
      expect(hasJwtAuthError({data: {form_data: []}})).toBe(false);
      expect(hasJwtAuthError({errors: 'boom'})).toBe(false);
      expect(
        hasJwtAuthError({errors: [{message: 'constraint violation', extensions: {code: 'x'}}]}),
      ).toBe(false);
    });
  });
});
