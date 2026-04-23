/**
 * Type of methods used to build email templates
 */
export type EmailTemplateBuilder = (context: EmailContext) => string;

/**
 * Represents an Email template context
 */
export interface EmailContext {
  title?: string;
  preheader?: string;
  body_main?: string;
  button_link?: string;
  button_text?: string;
  body_footer?: string;
  footer?: string;
  logostring?: string;
}
