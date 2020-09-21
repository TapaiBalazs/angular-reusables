import { stopLoadingIndicator } from '@nx-reusables/loading-indicator';

export class ErrorLogger {
  @stopLoadingIndicator
  public static logErrorMessage({ message }): void {
    console.error(`An error with the following message has occured: ${message}`);
  }
}
